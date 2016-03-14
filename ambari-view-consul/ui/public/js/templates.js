(function() {
    var module;

    try {
        // Get current templates module
        module = angular.module('templates');
    } catch (error) {
        // Or create a new one
        module = angular.module('templates', []);
    }

    module.run(["$templateCache", function($templateCache) {
        $templateCache.put('app/components/services/services.tpl.html', '<div layout=\"row\">\r\n  <div>\r\n    <div class=\"services-tools-container\" layout=\"row\">\r\n      <md-input-container md-no-float class=\"md-block\">\r\n        <input placeholder=\"Filter by name\">\r\n      </md-input-container>\r\n\r\n      <md-input-container>\r\n        <md-select placeholder=\"State\" ng-model=\"statusesFilter\">\r\n          <md-option ng-repeat=\"status in statusesFilterList\">\r\n            {{status}}\r\n          </md-option>\r\n        </md-select>\r\n      </md-input-container>\r\n\r\n      <div layout=\"row\" layout-align=\"center center\">\r\n        <md-button class=\"md-accent md-hue-1 md-raised\">\r\n          Restart App\r\n        </md-button>\r\n      </div>\r\n    </div>\r\n    {{datacentersList}}\r\n  </div>\r\n\r\n  <div>\r\n  </div>\r\n</div>\r\n');
    }]);
})();
(function() {
    var module;

    try {
        // Get current templates module
        module = angular.module('templates');
    } catch (error) {
        // Or create a new one
        module = angular.module('templates', []);
    }

    module.run(["$templateCache", function($templateCache) {
        $templateCache.put('app/components/toolbar/toolbar.tpl.html', '<div class=\"md-toolbar-tools container\" layout=\"raw\">\n  <div layout=\"raw\" flex=\"10\">\n    <div class=\"logo-mantl\" layout=\"raw\" layout-align=\"center center\">\n      <a ng-href=\"/\">\n        <img src=\"img/logo_mantl.png\">\n      </a>\n    </div>\n    <div class=\"logo-name\" layout=\"raw\" layout-align=\"center center\">\n      <a ng-href=\"/\" class=\"a-clear\">\n        <span>Pangea</span>\n      </a>\n    </div>\n  </div>\n  <div class=\"toolbar-tabs-container\" flex=\"90\">\n    <md-tabs md-dynamic-height md-border-bottom>\n      <md-tab><a ng-href=\"#/services\">Services</a></md-tab>\n      <md-tab><a ng-href=\"#/nodes\">Nodes</a></md-tab>\n      <md-tab><a ng-href=\"#/keyvalue\">Key / Value</a></md-tab>\n      <md-tab><a ng-href=\"#/acl\">ACL</a></md-tab>\n      <md-tab><a ng-href=\"#/dc\">DC#</a></md-tab>\n      <md-tab><a ng-href=\"#/settings\">Settings</a></md-tab>\n    </md-tabs>\n  </div>\n</div>\n');
    }]);
})();

//# sourceMappingURL=templates.js.map