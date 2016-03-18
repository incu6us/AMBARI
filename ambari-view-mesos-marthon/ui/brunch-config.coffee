exports.config =
  # See http://brunch.io/#documentation for docs.
  modules:
    definition: false
    wrapper: false
  paths:
    watched: [
      'app',
      'vendor'
    ]
  files:
    javascripts:
      joinTo:
      	'js/app.js': /^app/
      	'js/vendor.js': /^vendor/
      order:
        before: [
          'vendor/angular.min.js',
          'vendor/angular-material.min.js'
        ]
    stylesheets:
      joinTo:
        'css/app.css': /^app/
        'css/vendor.css': /^vendor/
      order:
        after: [
          'app/custom.css'
        ]
    templates:
      joinTo: 'js/templates.js': /^app/
