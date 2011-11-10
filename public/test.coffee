class Viewing extends Backbone.Model

class ViewingCollection extends Backbone.Collection
  model: Viewing
  url: "/viewings"

class ViewingIndexView extends Backbone.View
  setCollection: (@items) ->
  
  render: ->
    form = new ViewingFormView()
    list = new ViewingListView()
    @renderPage(form, list)  
    @
    
  renderPage: (form, list) ->
    $(@el).append(form.render().el)
    $(@el).append(list.renderList(@items).el)
    
class ViewingFormView extends Backbone.View
  template: app.templates.ViewingFormTemplate
  events: {
    "keypress input" : "saveOnEnter"
  }
  
  saveOnEnter: (evt) -> 
    if (evt.keyCode == 13)
      val = $("input").val()
      v = new Viewing({"address" : val})
      viewingCollection.create(v)
  
  render: ->
    $(@el).html(@template)
    @
  
class ViewingListView extends Backbone.View
  el: "<ul>"
  
  initialize: ->
    viewingCollection.bind('add', @addViewingView)
    
  addViewingView: (item) =>     
    view = new ViewingView({model: item})
    $(@el).append(view.render().el)
      
  renderList: (items) =>
    items.each(@addViewingView)
    @
    

class ViewingView extends Backbone.View
  el: "<li data-name='address'>"
  template: app.templates.ViewingTemplate
  initialize: ->
    _.bindAll(@, 'render')
    @model.bind('change', @render)
    
  events: {
    "dblclick span[data-name=content]" : "edit",
    "keypress li input"                : "updateOnEnter"
  }
  
  edit: (evt) ->
    $(evt.target).hide()
    $(evt.target).next("input").show()
  
  updateOnEnter: (evt) ->
    if (evt.keyCode == 13)
      attr = $(evt.target).closest("li").attr("data-name");
      send = {};
      send[attr] = $(evt.target).val();
      @model.save(send);
      $(evt.target).hide();
      $(evt.target).prev("[data-name=content]").show();
    
  render: ->
    $(@el).html(@template(@model.toJSON()))
    @
  

class IndexView extends Backbone.View
  template: app.templates.IndexTemplate
  render: ->
    $(@el).append(@template)
    @

class AppRouter extends Backbone.Router
  routes: {
    ""      : "index",
    "list"  : "list"
  }

  swap: (view) ->
    @view.destroy() if @view
    @view = view
    $("body").html(@view.render().el)

  index: ->
    indexview = new IndexView()
    @swap(indexview)
  
  list: =>
    mainview = new ViewingIndexView()
    viewingCollection.fetch({success: (param) =>
      mainview.setCollection(param)
      @swap(mainview)
      })
  
  

$ ->
  window.viewingCollection =  new ViewingCollection()
  new AppRouter()
  Backbone.history.start()
