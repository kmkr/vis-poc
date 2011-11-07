var app = {
  models:{},
  collections:{},
  views:{}
};

Backbone.emulateHttp = true;

$(function(){
  
  window.library = new app.collections.Viewing();

  
  library.fetch({success: library.renderLibrary});

  $("#create_viewing").append(new app.views.CreateViewing().render().el);

});