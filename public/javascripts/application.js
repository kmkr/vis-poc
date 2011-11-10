Backbone.View.prototype.destroy = function() {
		this.unbind();
		this.remove();
	}