class IndexView extends Backbone.View
  template: app.templates.IndexTemplate
  render: ->
    $(@el).append(@template)
    @