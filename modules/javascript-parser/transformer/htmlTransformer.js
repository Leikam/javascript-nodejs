var NO_WRAP_TAGS_SET = require('../consts').NO_WRAP_TAGS_SET;
var sanitize = require('../util/sanitize');
var charTypography = require('../typography/charTypography');
var contextTypography = require('../typography/contextTypography');
var escapeHtmlText = require('../util/escapeHtmlText');
var escapeHtmlAttr = require('../util/escapeHtmlAttr');
var stripIndents = require('../util/source/stripIndents');
var extractHighlight = require('../util/source/extractHighlight');

function HtmlTransformer(options) {
  this.options = options;
}

HtmlTransformer.prototype.transform = function(node, isFinal) {
  var method = 'transform' + node.getType();

  if (!this[method]) {
    throw new Error("Unsupported node type: " + node.getType());
  }

  var html = this[method](node);

  if (isFinal) {
    html = this.finalize(html);
  }
  return html;
};

HtmlTransformer.prototype.finalize = function(html) {
  return contextTypography(html);
};

HtmlTransformer.prototype.formatHtml = function(html, trusted) {
  html = charTypography(html);

  if (!trusted) {
    html = sanitize(html);
  }

  return html;
};

HtmlTransformer.prototype.wrapTagAround = function(tag, attrs, html) {
  var result = "<" + tag;

//  console.log(tag, attrs, html);
  for (var name in attrs) {
    name = escapeHtmlAttr(name);
    var value = escapeHtmlAttr(attrs[name]);
    result += ' ' + name + '="' + value + '"';
  }

  result += '>';

  if (tag != 'img') {
    result += html + '</' + tag + '>';
  }
  return result;
};


HtmlTransformer.prototype.transformCommentNode = function(node) {
  return  "<!--" + node.text + "-->";
};

HtmlTransformer.prototype.replaceHtmlWithLabel = function(tag, html, labels) {
  var label = this.makeLabel();
  labels[label] = html;
  if (NO_WRAP_TAGS_SET[tag]) {
    return "<div>LABEL:" + label + "</div>";
  } else {
    return "<span>LABEL:" + label + "</span>";
  }
};

HtmlTransformer.prototype.transformCompositeTag = function(node) {
  var labels = {};
  var html = '';

  var children = node.getChildren();

  for (var i = 0; i < children.length; i++) {
    var child = children[i];

    var childHtml = this.transform(child);

    if (child.getType() != 'TextNode') {
      childHtml = this.replaceHtmlWithLabel(child.tag, childHtml, labels);
    }

    html += childHtml;
  }

  node.ensureKnowTrusted();

  html = this.formatHtml(html, node.isTrusted());

  html = this.replaceLabels(html, labels);

  if (node.tag) {
    html = this.wrapTagAround(node.tag, node.attrs, html);
  }

  return html;
};


HtmlTransformer.prototype.transformCommentNode = function(node) {
  return  "<!--" + node.text + "-->";
};


HtmlTransformer.prototype.transformCutNode = function(node) {
  return  "";
};

HtmlTransformer.prototype.transformErrorTag = function(node) {
  return this.transformTagNode(node);
};

HtmlTransformer.prototype.transformEscapedTag = function(node) {
  var html = escapeHtmlText(node.text);
  html = this.wrapTagAround(node.tag, node.attrs, html);
  return html;
};

HtmlTransformer.prototype.transformHeaderTag = function(node) {
  var headerContent = this.transformVerbatimText(node);
  return '<h' + node.level + '>' + headerContent + '</h' + node.level + '>';
};

HtmlTransformer.prototype.transformImgTag = function(node) {
  var html;

  if (node.isFigure) {

    if (node.attrs.width && node.attrs.height) {
      html = '<figure><div class="image" style="width: '+node.attrs.width+'px;">' +
        '<div class="image__ratio" style="padding-top: ' + (node.attrs.height/node.attrs.width*100) + '%"></div>' +
        '<img class="image__image" src="' + node.attrs.src + '" alt="">' +
        '</div></figure>';
    } else {
      html = '<figure>' + this.transformTagNode(node) + '</figure>';
    }

  } else {
    html = this.transformTagNode(node);
  }

  return html;
};

HtmlTransformer.prototype.transformKeyTag = function(node) {

  var results = [];
  var keys = node.text;

  if (keys == "+") {
    return this.wrapTagAround(node.tag, node.attrs, '+');
  }

  var plusLabel = Math.random();
  keys = keys.replace(/\+\+/g, '+' + plusLabel);
  keys = keys.split('+');

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    results.push((key == plusLabel) ? '+' : key);
    if (i < keys.length - 1) {
      results.push('<span class="shortcut__plus">+</span>');
    }
  }

  return this.wrapTagAround(node.tag, node.attrs, results.join(''));
};

HtmlTransformer.prototype.transformNode = function(node) {
  throw new Error("Basic node should not be instantiated and used");
};

HtmlTransformer.prototype.transformReferenceNode = function(node) {
  return  this.transformCompositeTag(node);
};

// on this stage the tag either contains this.src OR the resolved text
HtmlTransformer.prototype.transformSourceTag = function(node) {

  node.ensureKnowTrusted();

  var text = node.isExternal() ? ('Содержимое файла ' + node.src) : node.text;

  var prismLanguageMap = {
    html:   'markup',
    js:     'javascript',
    coffee: 'coffeescript'
  };

  var prismLanguage = prismLanguageMap[node.name] || node.name;

  var attrs = {
    'class':        "language-" + prismLanguage + " line-numbers",
    "data-trusted": (node.isTrusted() && !node.params.untrusted) ? '1' : '0'
  };

  if (node.params.height) {
    attrs['data-demo-height'] = node.params.height;
  }

  if (node.params.autorun) {
    attrs['data-autorun'] = '1';
  }
  if (node.params.refresh) {
    attrs['data-refresh'] = '1';
  }
  if (node.params.run) {
    attrs['data-run'] = '1';
  }
  if (node.params.demo) {
    attrs['data-demo'] = '1';
  }

  if (node.params.hide) {
    attrs['data-hide'] = (node.params.hide === true) ? "" : node.params.hide;
    attrs['class'] += ' hide';
  }

  // strip first empty lines
  text = stripIndents(text);

  var highlight = extractHighlight(text);

  if (highlight.block) {
    attrs['data-highlight-block'] = highlight.block;
  }
  if (highlight.inline) {
    attrs['data-highlight-inline'] = highlight.inline;
  }
  text = highlight.text;

  var html = escapeHtmlText(text);
  html = this.wrapTagAround(node.tag, attrs, html);

  return html;
};

HtmlTransformer.prototype.transformTagNode = function(node) {
  var html = this.formatHtml(node.text);
  html = this.wrapTagAround(node.tag, node.attrs, html);
  return html;
};

HtmlTransformer.prototype.transformTextNode = function(node) {
  return node.text;
};

HtmlTransformer.prototype.transformVerbatimText = function(node) {
  node.ensureKnowTrusted();

  var html = node.text;
  if (!node.isTrusted()) {
    html = sanitize(html);
  }
  return html;
};


HtmlTransformer.prototype.makeLabel = function() {
  return Math.random().toString(36).slice(2);
};

HtmlTransformer.prototype.replaceLabels = function(html, labels) {
  var pattern = /<span>LABEL:(\w+)<\/span>|<div>LABEL:(\w+)<\/div>/g;

  return html.replace(pattern, function(match, p1, p2) {
    var label = p1 || p2;
    var content = labels[label];
    delete labels[label];
    return content;
  });
};

module.exports = HtmlTransformer;
