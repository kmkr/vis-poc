(function() {
  var AppRouter, IndexView, Viewing, ViewingCollection, ViewingFormView, ViewingIndexView, ViewingListView, ViewingView;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  }, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
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
  ViewingIndexView = (function() {
    __extends(ViewingIndexView, Backbone.View);
    function ViewingIndexView() {
      ViewingIndexView.__super__.constructor.apply(this, arguments);
    }
    ViewingIndexView.prototype.setCollection = function(items) {
      this.items = items;
    };
    ViewingIndexView.prototype.render = function() {
      var form, list;
      form = new ViewingFormView();
      list = new ViewingListView();
      this.renderPage(form, list);
      return this;
    };
    ViewingIndexView.prototype.renderPage = function(form, list) {
      $(this.el).append(form.render().el);
      return $(this.el).append(list.renderList(this.items).el);
    };
    return ViewingIndexView;
  })();
  ViewingView = (function() {
    __extends(ViewingView, Backbone.View);
    function ViewingView() {
      ViewingView.__super__.constructor.apply(this, arguments);
    }
    ViewingView.prototype.el = "<li data-name='address'>";
    ViewingView.prototype.template = app.templates.ViewingTemplate;
    ViewingView.prototype.initialize = function() {
      _.bindAll(this, 'render');
      return this.model.bind('change', this.render);
    };
    ViewingView.prototype.events = {
      "dblclick span[data-name=content]": "edit",
      "keypress li input": "updateOnEnter"
    };
    ViewingView.prototype.edit = function(evt) {
      $(evt.target).hide();
      return $(evt.target).next("input").show();
    };
    ViewingView.prototype.updateOnEnter = function(evt) {
      var attr, send;
      if (evt.keyCode === 13) {
        attr = $(evt.target).closest("li").attr("data-name");
        send = {};
        send[attr] = $(evt.target).val();
        this.model.save(send);
        $(evt.target).hide();
        return $(evt.target).prev("[data-name=content]").show();
      }
    };
    ViewingView.prototype.render = function() {
      $(this.el).html(this.template(this.model.toJSON()));
      return this;
    };
    return ViewingView;
  })();
  IndexView = (function() {
    __extends(IndexView, Backbone.View);
    function IndexView() {
      IndexView.__super__.constructor.apply(this, arguments);
    }
    IndexView.prototype.template = app.templates.IndexTemplate;
    IndexView.prototype.render = function() {
      $(this.el).append(this.template);
      return this;
    };
    return IndexView;
  })();
  ViewingFormView = (function() {
    __extends(ViewingFormView, Backbone.View);
    function ViewingFormView() {
      ViewingFormView.__super__.constructor.apply(this, arguments);
    }
    ViewingFormView.prototype.template = app.templates.ViewingFormTemplate;
    ViewingFormView.prototype.events = {
      "keypress input": "saveOnEnter"
    };
    ViewingFormView.prototype.saveOnEnter = function(evt) {
      var v, val;
      if (evt.keyCode === 13) {
        val = $("input").val();
        v = new Viewing({
          "address": val
        });
        return viewingCollection.create(v);
      }
    };
    ViewingFormView.prototype.render = function() {
      $(this.el).html(this.template);
      return this;
    };
    return ViewingFormView;
  })();
  ViewingListView = (function() {
    __extends(ViewingListView, Backbone.View);
    function ViewingListView() {
      this.renderList = __bind(this.renderList, this);
      this.addViewingView = __bind(this.addViewingView, this);
      ViewingListView.__super__.constructor.apply(this, arguments);
    }
    ViewingListView.prototype.el = "<ul>";
    ViewingListView.prototype.initialize = function() {
      return viewingCollection.bind('add', this.addViewingView);
    };
    ViewingListView.prototype.addViewingView = function(item) {
      var view;
      view = new ViewingView({
        model: item
      });
      return $(this.el).append(view.render().el);
    };
    ViewingListView.prototype.renderList = function(items) {
      items.each(this.addViewingView);
      return this;
    };
    return ViewingListView;
  })();
  AppRouter = (function() {
    __extends(AppRouter, Backbone.Router);
    function AppRouter() {
      this.list = __bind(this.list, this);
      AppRouter.__super__.constructor.apply(this, arguments);
    }
    AppRouter.prototype.routes = {
      "": "index",
      "list": "list"
    };
    AppRouter.prototype.swap = function(newView) {
      if (this.view) {
        $(this.view.el).bind("webkitTransitionEnd", __bind(function() {
          this.view.destroy();
          this.view = newView;
          return $("body").html(this.view.render().el);
        }, this));
        return $(this.view.el).addClass("swipe-right");
      } else {
        this.view = newView;
        return $("body").html(this.view.render().el);
      }
    };
    AppRouter.prototype.index = function() {
      var indexview;
      indexview = new IndexView();
      return this.swap(indexview);
    };
    AppRouter.prototype.list = function() {
      var mainview;
      mainview = new ViewingIndexView();
      return viewingCollection.fetch({
        success: __bind(function(param) {
          mainview.setCollection(param);
          return this.swap(mainview);
        }, this)
      });
    };
    return AppRouter;
  })();
  Backbone.View.prototype.destroy = function() {
    this.unbind();
    return this.remove();
  };
  $(function() {
    window.viewingCollection = new ViewingCollection();
    new AppRouter();
    return Backbone.history.start();
  });
}).call(this);
