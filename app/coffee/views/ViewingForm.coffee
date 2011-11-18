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