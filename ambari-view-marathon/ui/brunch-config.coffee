exports.config =
  # See http://brunch.io/#documentation for docs.
  modules:
    definition: false
    wrapper: false
  files:
    javascripts:
      joinTo: 
      	'js/app.js': /^app/
      	'js/vendor.js': /^vendor/
      order:
        before: [
          'vendor/angular.min.js',
          'vendor/angular-material.min.js',
          'vendor/angular-resource.min.js',
          'vendor/ui-bootstrap-tpls-1.0.0.min.js'
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
