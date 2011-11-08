class Viewing extends Backbone.Model
  
class ViewingList extends Backbone.Collection
  model: Viewing
  url: "/viewings"
  renderList: (items) ->
    items.each (item) ->
      view = new ViewingView({model: item})
      #$('div.insert').append(view.render().el)
      
  
class ViewingView extends Backbone.View
  template: _.template('<input type="text" value="<%= address %>" />')
  render: ->
    $(@el).html(@template(@model.toJSON()));
    @
    
class AppView extends Backbone.View
  id: "insert"
  initialize: ->
    @list = new ViewingList()
    @list.fetch({success: @list.renderList})
    
app = new AppView()
