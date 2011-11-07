app.models.Viewing = Backbone.Model.extend({

  clear: function() {
    this.destroy();
    this.trigger("clear");
  }
  
});