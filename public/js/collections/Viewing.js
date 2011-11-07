app.collections.Viewing = Backbone.Collection.extend({
  
  model: app.models.Viewing,
  
  url: "/viewings",
  
  renderLibrary: function(lib){
    console.log("Rendering library with lib: %o", lib);
    lib.each(function(viewing){
      var view = new app.views.Viewing({model: viewing});
      $("#viewings").append(view.render().el);
    });
  }
  
  
});