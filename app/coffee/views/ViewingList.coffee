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