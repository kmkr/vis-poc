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
    $("body").append(form.render().el)
    $("body").append(list.renderList(@items).el)
    
  
class ViewingFormView extends Backbone.View
  template: _.template('<input id="createField" type="text" />')
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
  template: _.template('[id: <%= id %>] Address: <span data-name="content"> <%= address %></span> <input type="text" class="edit_element" value="<%= address %>" />')
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
  

class AppRouter extends Backbone.Router
  routes: {
    "": "index"
  }
  
  index: ->
    mainview = new ViewingIndexView()
    viewingCollection.fetch({success: (param) ->
      mainview.setCollection(param)
      mainview.render()
      })
  
  
console.log(TrimPath.parseDOMTemplate(""))
viewingCollection = new ViewingCollection()
app = new AppRouter()
Backbone.history.start()
