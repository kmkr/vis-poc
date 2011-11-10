// This file was automatically generated from ViewingTemplate.soy.
// Please don't edit this file by hand.

if (typeof app == 'undefined') { var app = {}; }
if (typeof app.templates == 'undefined') { app.templates = {}; }


app.templates.ViewingTemplate = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('[id: ', soy.$$escapeHtml(opt_data.id), '] Address: <span data-name="content">', soy.$$escapeHtml(opt_data.address), '</span><input type="text" class="edit_element" value="', soy.$$escapeHtml(opt_data.address), '" />');
  if (!opt_sb) return output.toString();
};


app.templates.ViewingFormTemplate = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<input type="text" /><a href="#">back</a>');
  if (!opt_sb) return output.toString();
};


app.templates.IndexTemplate = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<a href="#list">list</a>');
  if (!opt_sb) return output.toString();
};
