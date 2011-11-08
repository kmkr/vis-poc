(function() {
  var AppView, Viewing, ViewingList, ViewingView, app;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  Viewing = (function() {
    __extends(Viewing, Backbone.Model);
    function Viewing() {
      Viewing.__super__.constructor.apply(this, arguments);
    }
    return Viewing;
  })();
  ViewingList = (function() {
    __extends(ViewingList, Backbone.Collection);
    function ViewingList() {
      ViewingList.__super__.constructor.apply(this, arguments);
    }
    ViewingList.prototype.model = Viewing;
    ViewingList.prototype.url = "/viewings";
    ViewingList.prototype.renderList = function(items) {
      return items.each(function(item) {
        var view;
        view = new ViewingView({
          model: item
        });
        return $('#insert').append(view.render().el);
      });
    };
    return ViewingList;
  })();
  ViewingView = (function() {
    __extends(ViewingView, Backbone.View);
    function ViewingView() {
      ViewingView.__super__.constructor.apply(this, arguments);
    }
    ViewingView.prototype.template = _.template('[id: <%= id %>] Address: <span data-name="content"> <%= address %></span>');
    ViewingView.prototype.render = function() {
      $(this.el).html(this.template(this.model.toJSON()));
      return this;
    };
    return ViewingView;
  })();
  AppView = (function() {
    __extends(AppView, Backbone.View);
    function AppView() {
      AppView.__super__.constructor.apply(this, arguments);
    }
    AppView.prototype.initialize = function() {
      this.list = new ViewingList();
      return this.list.fetch({
        success: this.list.renderList
      });
    };
    return AppView;
  })();
  app = new AppView();
}).call(this);
