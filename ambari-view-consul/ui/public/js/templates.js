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
        $templateCache.put('app/components/nodes/nodes.tpl.html', '<div layout=\"row\">\r\n  n\r\n  <div>\r\n    <div class=\"nodes-tools-container\" layout=\"row\">\r\n      <md-input-container md-no-float class=\"md-block\">\r\n        <input placeholder=\"Filter by name\">\r\n      </md-input-container>\r\n\r\n      <md-input-container>\r\n        <md-select placeholder=\"State\" ng-model=\"statusesFilter\">\r\n          <md-option ng-repeat=\"status in statusesFilterList\">\r\n            {{status}}\r\n          </md-option>\r\n        </md-select>\r\n      </md-input-container>\r\n\r\n      <div layout=\"row\" layout-align=\"center center\">\r\n        <md-button class=\"md-accent md-hue-1 md-raised\">\r\n          Restart App\r\n        </md-button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n\r\n  <div>\r\n  </div>\r\n</div>\r\n');
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
        $templateCache.put('app/components/services/services.tpl.html', '<md-whiteframe class=\"md-whiteframe-6dp white-card\" layout=\"column\" layout-padding flex=\"40\">\r\n  <div>\r\n    <div class=\"services-tools-container\" layout=\"row\">\r\n      <md-input-container md-no-float class=\"md-block\">\r\n        <input placeholder=\"Filter by name\" ng-model=\"search.Name\">\r\n      </md-input-container>\r\n      <span flex></span>\r\n\r\n      <!-- <md-input-container>\r\n        <md-select placeholder=\"State\" ng-model=\"search.status\">\r\n          <md-option ng-repeat=\"status in statusesFilterList\">\r\n            {{status}}\r\n          </md-option>\r\n        </md-select>\r\n      </md-input-container> -->\r\n\r\n      <!-- <span flex></span>\r\n      <div layout=\"row\" layout-align=\"center center\">\r\n        <md-button class=\"md-accent md-hue-1 md-raised\">\r\n          Expand\r\n        </md-button>\r\n      </div> -->\r\n    </div>\r\n  </div>\r\n\r\n  <md-virtual-repeat-container id=\"services-container\" ng-style=\"listStyle\">\r\n    <div class=\"repeated-item md-body-2\" md-virtual-repeat=\"service in servicesArr | filter: search\" md-item-size=\"60\" layout=\"row\" ng-click=\"setServiceChoosen(service)\">\r\n      <div class=\"status-rectangle-warning\" ng-show=\"service.ChecksWarning > 0\"></div>\r\n      <div class=\"status-rectangle-critical\" ng-show=\"service.ChecksCritical > 0\"></div>\r\n      <div class=\"status-rectangle-passing\" ng-show=\"service.ChecksPassing > 0\"></div>\r\n      <div layout=\"column\">\r\n        <div layout=\"row\">\r\n          <span class=\"md-subhead\">\r\n            <b>{{service.Name}}</b>\r\n          </span>\r\n        </div>\r\n        <div class=\"md-caption\" layout=\"row\">\r\n          <span ng-show=\"service.ChecksWarning > 0\">\r\n            {{service.ChecksWarning}} warning\r\n          </span>\r\n          <span ng-show=\"service.ChecksCritical > 0\">\r\n            {{service.ChecksCritical}} critical\r\n          </span>\r\n          <span ng-show=\"service.ChecksPassing > 0\">\r\n            {{service.ChecksPassing}} passing\r\n          </span>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </md-virtual-repeat-container>\r\n\r\n  <!-- <md-list>\r\n    <md-list-item ng-repeat=\"service in servicesArr\">\r\n      {{service.Name}} - {{service.ChecksWarning}} - {{service.ChecksCritical}} - {{service.ChecksPassing}}\r\n      <md-divider ng-if=\"!$last\"></md-divider>\r\n    </md-list-item>\r\n  </md-list> -->\r\n</md-whiteframe>\r\n\r\n<div flex=\"5\"></div>\r\n\r\n<md-whiteframe class=\"md-whiteframe-6dp white-card\" layout=\"column\" flex=\"65\">\r\n  <md-toolbar layout-padding>\r\n    <span>{{serviceSelected.Name}}</span>\r\n  </md-toolbar>\r\n  <md-content class=\"white-card\" layout-padding>\r\n    <div ng-show=\"!serviceSelected\" class=\"md-subhead\" layout=\"row\" layout-align=\"center center\">\r\n      <span>Select service to see additional info.</span>\r\n    </div>\r\n\r\n    <md-virtual-repeat-container id=\"service-details-container\" ng-show=\"serviceSelected\" ng-style=\"listStyle\">\r\n      <span class=\"md-title\">Tags<span>\r\n      <div class=\"md-body-2\">\r\n        <span ng-repeat=\"tag in serviceSelectedTags\">\r\n          {{tag}}<span ng-show=\"!($last)\">,</span>\r\n        </span>\r\n      </div>\r\n      <br>\r\n      <span class=\"md-title\">Nodes<span>\r\n      <div class=\"repeated-item md-body-2\" md-virtual-repeat=\"details in serviceSelected.ServiceDetails\" md-item-size=\"170\" layout=\"column\">\r\n        <div layout=\"row\">\r\n          <div class=\"status-rectangle-warning\" ng-show=\"(details.Checks | filter: \'warning\').length > 0\"></div>\r\n          <div class=\"status-rectangle-critical\" ng-show=\"(details.Checks | filter: \'critical\').length > 0\"></div>\r\n          <div class=\"status-rectangle-passing\" ng-show=\"(details.Checks | filter: \'passing\').length > 0\"></div>\r\n\r\n          <div layout=\"column\">\r\n            <span class=\"md-subhead\"><b> {{details.Node.Node}} </b></span>\r\n            <span class=\"md-caption\"> {{details.Node.Address}} </span>\r\n          </div>\r\n\r\n          <div layout=\"row\" layout-align=\"end start\" flex>\r\n            <span class=\"md-caption\" ng-show=\"(details.Checks | filter: \'warning\').length > 0\">{{(details.Checks | filter: \'warning\').length}} warning</span>\r\n            <span class=\"md-caption\" ng-show=\"(details.Checks | filter: \'critical\').length > 0\">{{(details.Checks | filter: \'critical\').length}} critical</span>\r\n            <span class=\"md-caption\" ng-show=\"(details.Checks | filter: \'passing\').length > 0\">{{(details.Checks | filter: \'passing\').length}} passing</span>\r\n          </div>\r\n          <div></div>\r\n        </div>\r\n\r\n        <md-virtual-repeat-container id=\"service-node-container\" ng-style=\"listStyle\">\r\n          <div class=\"repeated-item md-body-2\" md-virtual-repeat=\"node in details.Checks\" md-item-size=\"50\" layout=\"row\" flex>\r\n            <div class=\"status-rectangle-warning\" ng-show=\"node.Status === \'warning\'\"></div>\r\n            <div class=\"status-rectangle-critical\" ng-show=\"node.Status === \'critical\'\"></div>\r\n            <div class=\"status-rectangle-passing\" ng-show=\"node.Status === \'passing\'\"></div>\r\n\r\n            <div layout=\"row\" flex>\r\n              <div layout=\"column\">\r\n                <span class=\"md-caption\"><b> {{node.Name}} </b></span>\r\n                <span class=\"md-caption\"> {{node.CheckID}} </span>\r\n              </div>\r\n              <div layout=\"row\" layout-align=\"end start\" flex>\r\n                <span class=\"md-caption\"> {{node.Status}}</span>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </md-virtual-repeat-container>\r\n\r\n      </div>\r\n    </md-virtual-repeat-container>\r\n  </md-content>\r\n</md-whiteframe>\r\n');
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