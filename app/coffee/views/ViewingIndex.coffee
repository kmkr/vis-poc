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