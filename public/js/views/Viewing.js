app.views.CreateViewing = Backbone.View.extend({
	template: _.template($('#create-viewing-template').html()),
	initialize: function () {
		console.log(this);
		_.bindAll(this, 'createOnEnter');
	},
	events: {
		"keypress input": "createOnEnter"
	},
	render: function() {
		$(this.el).html(this.template());
		return this;
	},
	createOnEnter: function(e) {
		if (e.charCode != 13) return;
		var model = new app.models.Viewing({address: $(e.target).closest("input").val() });
		model.save();
	}
});

app.views.Viewing = Backbone.View.extend({
  
  tagName: "ul",
  
  template: _.template($('#viewing-template').html()),
  
  initialize: function () {
    _.bindAll(this, 'render', 'clear', 'destroy', 'updateOnEnter');
    this.model.bind('change', this.render);
    this.model.bind('clear', this.destroy);
  },
  
  events: {
    "dblclick span[data-name=content]"       : "edit",
    "click a.destroy"             			: "clear",
    "keypress li input"          			 : "updateOnEnter"
  },
      
  render: function () {
    $(this.el).html(this.template(this.model.toJSON()));
    return this;
  },
  
  edit: function(e) {
    $(e.target).hide();
    $(e.target).next("input").show();	
  },
  
  updateOnEnter: function(e) {
    if (e.keyCode == 13) {
      var attr = $(e.target).closest("li").attr("data-name");
      var send = {};
      send[attr] = $(e.target).val();
      this.model.save(send);
      $(e.target).hide();
      $(e.target).prev("[data-name=content]").show();
    }
  },


  clear: function() {
    this.model.clear();
    this.destroy();
  },
  
  destroy: function(e) {
     $(this.el).remove();
     e.preventDefault();
  }
  
});