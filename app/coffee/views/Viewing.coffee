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