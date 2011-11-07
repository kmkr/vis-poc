app.models.Viewing = Backbone.Model.extend({

	urlRoot: "/viewings",
  clear: function() {
    this.destroy();
    this.trigger("clear");
  }
  
});