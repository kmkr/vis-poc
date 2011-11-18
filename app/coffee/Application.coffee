class AppRouter extends Backbone.Router
  routes: {
    ""      : "index",
    "list"  : "list"
  }

  swap: (newView) ->
    if @view
      $(@view.el).bind("webkitTransitionEnd", =>
        @view.destroy()
        @view = newView 
        $("body").html(@view.render().el) 
      )
      $(@view.el).addClass("swipe-right")
    else
      @view = newView
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

Backbone.View::destroy = ->
  @unbind()
  @remove()

$ ->
  window.viewingCollection =  new ViewingCollection()
  new AppRouter()
  Backbone.history.start()