(function() {
  var AppRouter, Viewing, ViewingCollection, ViewingListView, ViewingView, app;
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
  ViewingCollection = (function() {
    __extends(ViewingCollection, Backbone.Collection);
    function ViewingCollection() {
      ViewingCollection.__super__.constructor.apply(this, arguments);
    }
    ViewingCollection.prototype.model = Viewing;
    ViewingCollection.prototype.url = "/viewings";
    return ViewingCollection;
  })();
  ViewingListView = (function() {
    __extends(ViewingListView, Backbone.View);
    function ViewingListView() {
      ViewingListView.__super__.constructor.apply(this, arguments);
    }
    ViewingListView.prototype.el = "<ul>";
    ViewingListView.prototype.render = function() {};
    ViewingListView.prototype.renderList = function(items) {
      return items.each(function(item) {
        var view;
        view = new ViewingView({
          model: item
        });
        return $('#insert').append(view.render().el);
      });
    };
    return ViewingListView;
  })();
  ViewingView = (function() {
    __extends(ViewingView, Backbone.View);
    function ViewingView() {
      ViewingView.__super__.constructor.apply(this, arguments);
    }
    ViewingView.prototype.el = "<li>";
    ViewingView.prototype.template = _.template('[id: <%= id %>] Address: <span data-name="content"> <%= address %></span>');
    ViewingView.prototype.render = function() {
      $(this.el).html(this.template(this.model.toJSON()));
      return this;
    };
    return ViewingView;
  })();
  AppRouter = (function() {
    __extends(AppRouter, Backbone.Router);
    function AppRouter() {
      AppRouter.__super__.constructor.apply(this, arguments);
    }
    AppRouter.prototype.routes = {
      "": "index"
    };
    AppRouter.prototype.index = function() {
      var collection, list;
      list = new ViewingListView();
      collection = new ViewingCollection();
      return collection.fetch({
        success: list.renderList
      });
    };
    return AppRouter;
  })();
  app = new AppRouter();
  Backbone.history.start();
}).call(this);
