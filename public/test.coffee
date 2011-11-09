class Viewing extends Backbone.Model
  
class ViewingCollection extends Backbone.Collection
  model: Viewing
  url: "/viewings"
  
class ViewingListView extends Backbone.View
  el: "<ul>"
  render: ->
      
  renderList: (items) ->
    items.each (item) ->
      view = new ViewingView({model: item})
      $('#insert').append(view.render().el)
    

class ViewingView extends Backbone.View
  el: "<li>"
  
  template: _.template('[id: <%= id %>] Address: <span data-name="content"> <%= address %></span>')
  
  render: ->
    $(@el).html(@template(@model.toJSON()))
    @
  

class AppRouter extends Backbone.Router
  routes: {
    "": "index"
  }
  
  index: ->
    list = new ViewingListView()
    collection = new ViewingCollection();
    collection.fetch({success: list.renderList})


app = new AppRouter()
Backbone.history.start()
