class Viewing extends Backbone.Model
  
class ViewingList extends Backbone.Collection
  model: Viewing
  url: "/viewings"
  renderList: (items) ->
    items.each (item) ->
      view = new ViewingView({model: item})
      $('#insert').append(view.render().el)

class ViewingView extends Backbone.View
  template: _.template('[id: <%= id %>] Address: <span data-name="content"> <%= address %></span>')
  render: ->
    $(@el).html(@template(@model.toJSON()))
    @
    
class AppView extends Backbone.View
  initialize: ->
    @list = new ViewingList()
    @list.fetch({success: @list.renderList})
    
app = new AppView()
