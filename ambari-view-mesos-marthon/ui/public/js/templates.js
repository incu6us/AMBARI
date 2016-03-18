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
        $templateCache.put('app/components/app-info/app-info.tpl.html', '<md-whiteframe class=\"md-whiteframe-6dp white-card\" layout-padding>\r\n	<div layout-padding>\r\n		<span class=\"link\" ng-click=\"goToAllApps()\"> Apps </span>\r\n		<span class=\"arrow\"> > </span>\r\n		<span class=\"current\"> {{appID}} </span>\r\n	</div>\r\n\r\n	<div>\r\n		<div layout=\"row\">\r\n			<md-button class=\"md-accent md-hue-1 md-raised\" ng-click=\"suspendApp()\">\r\n				Suspend\r\n			</md-button>\r\n			<md-button class=\"md-accent md-hue-1 md-raised\" ng-click=\"scaleApp()\">\r\n				Scale\r\n			</md-button>\r\n\r\n			<!-- fill up the space between left and right area -->\r\n			<span flex></span>\r\n\r\n			<md-button class=\"md-accent md-hue-1 md-raised\" ng-show=\"!!tasksToKill.ids.length\" ng-click=\"killTasks(false)\">\r\n				Kill\r\n			</md-button>\r\n			<md-button class=\"md-accent md-hue-1 md-raised\" ng-show=\"!!tasksToKill.ids.length\" ng-click=\"killTasks(true)\">\r\n				Kill & Scale\r\n			</md-button>\r\n			<md-button class=\"md-accent md-hue-1 md-raised\" ng-click=\"restartApp()\">\r\n				Restart App\r\n			</md-button>\r\n			<md-button class=\"md-warn md-hue-1 md-raised\" ng-click=\"destroyApp()\">\r\n				Destroy App\r\n			</md-button>\r\n		</div>\r\n\r\n		<md-tabs md-dynamic-height=\"true\" class=\"app-tabs\">\r\n			<md-tab label=\"Tasks\">\r\n				<div layout-padding>\r\n					<table-tasks></table-tasks>\r\n				</div>\r\n			</md-tab>\r\n			<md-tab label=\"Configuration\">\r\n				<div layout-padding>\r\n					<table-config></table-config>\r\n				</div>\r\n			</md-tab>\r\n			<md-tab label=\"Debug\">\r\n				<div layout-padding>\r\n					<table-debug></table-debug>\r\n				</div>\r\n			</md-tab>\r\n		</md-tabs>\r\n	</div>\r\n<md-whiteframe>\r\n');
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
        $templateCache.put('app/components/app-info/table-config.tpl.html', '<div class=\"table-config\">\r\n  <fieldset class=\"standard\">\r\n    <legend> Current Version - {{appData.version | date:\'yyyy-MM-dd HH:mm:ss\'}} </legend>\r\n    <table>\r\n      <tr>\r\n        <td> Command </td>\r\n        <td> {{appData.cmd || \"Unspecified\"}} </td>\r\n      </tr>\r\n      <tr>\r\n        <td> Constraints </td>\r\n        <td>\r\n          <span ng-show=\"!!appData.constraints.length\">\r\n            			<span ng-repeat=\"constraint in appData.constraints\">\r\n            				{{constraint}} <br>\r\n            			</span>\r\n          </span>\r\n          <span ng-show=\"!!!appData.constraints.length\">\r\n            			Unspecified\r\n            		</span>\r\n        </td>\r\n      </tr>\r\n      <tr>\r\n        <td> Container </td>\r\n        <td>\r\n          <pre ng-show=\"appData.container\">\r\n                		{{appData.container | json:4 || \"Unspecified\"}}\r\n                	</pre>\r\n          <span ng-show=\"!appData.container\">\r\n                		Unspecified\r\n                	</span>\r\n        </td>\r\n      </tr>\r\n      <tr>\r\n        <td> CPUs </td>\r\n        <td> {{appData.cpus || \"Unspecified\"}} </td>\r\n      </tr>\r\n      <tr>\r\n        <td> Environment </td>\r\n        <td>\r\n          <span ng-show=\"appData.env\">\r\n    					<span ng-repeat=\"(envOption, value) in appData.env\">\r\n                    		{{envOption}}={{value}} <br>\r\n                    	</span>\r\n          </span>\r\n          <span ng-show=\"!!appData.env\">\r\n                		Unspecified\r\n                	</span>\r\n        </td>\r\n      </tr>\r\n      <tr>\r\n        <td> Executor </td>\r\n        <td> {{appData.executor || \"Unspecified\"}} </td>\r\n      </tr>\r\n      <tr>\r\n        <td> Health Checks </td>\r\n        <td>\r\n          <pre ng-show=\"appData.healthChecks[0]\">\r\n                		{{appData.healthChecks[0] | json:4 || \"Unspecified\"}}\r\n                	</pre>\r\n          <span ng-show=\"!appData.healthChecks[0]\">\r\n                		Unspecified\r\n                	</span>\r\n        </td>\r\n      </tr>\r\n      <tr>\r\n        <td> Instances </td>\r\n        <td> {{appData.instances || \"Unspecified\"}} </td>\r\n      </tr>\r\n      <tr>\r\n        <td> Memory </td>\r\n        <td> {{appData.mem || \"Unspecified\"}} </td>\r\n      </tr>\r\n      <tr>\r\n        <td> Disk Space </td>\r\n        <td> {{appData.disk || \"Unspecified\"}} </td>\r\n      </tr>\r\n      <tr>\r\n        <td> Ports </td>\r\n        <td>\r\n          <span ng-show=\"!!appData.ports.length\">\r\n    					<span ng-repeat=\"port in appData.ports\">\r\n    						{{port}} <br>\r\n    					</span>\r\n          </span>\r\n          <span ng-show=\"!!!appData.ports.length\">\r\n            			Unspecified\r\n            		</span>\r\n        </td>\r\n      </tr>\r\n      <tr>\r\n        <td> Backoff Factor </td>\r\n        <td> {{appData.backoffFactor || \"Unspecified\"}} </td>\r\n      </tr>\r\n      <tr>\r\n        <td> Backoff </td>\r\n        <td> {{appData.backoffSeconds || \"Unspecified\"}} </td>\r\n      </tr>\r\n\r\n      <tr>\r\n        <td> Max Launch Delay </td>\r\n        <td> {{appData.maxLaunchDelaySeconds || \"Unspecified\"}} </td>\r\n      </tr>\r\n      <tr>\r\n        <td> URIs </td>\r\n        <td>\r\n          <span ng-show=\"!!appData.uris.length\">\r\n                    	<span ng-repeat=\"uri in appData.uris\">\r\n                    		{{uri}} <br>\r\n                    	</span>\r\n          </span>\r\n          <span ng-show=\"!!!appData.uris.length\">\r\n                		Unspecified\r\n                	</span>\r\n        </td>\r\n      </tr>\r\n      <tr>\r\n        <td> Version </td>\r\n        <td> {{appData.version || \"Unspecified\"}} </td>\r\n      </tr>\r\n    </table>\r\n  </fieldset>\r\n</div>\r\n');
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
        $templateCache.put('app/components/app-info/table-debug.tpl.html', '<div class=\"table-debug\">\r\n	<fieldset class=\"standard\">\r\n		<legend> Last Changes </legend>\r\n		<table>\r\n			<tr>\r\n				<td> Last Scaling </td>\r\n				<td> {{appData.versionInfo.lastScalingAt}} </td>\r\n			</tr>\r\n			<tr>\r\n				<td> Last Configuration </td>\r\n				<td> {{appData.versionInfo.lastConfigChangeAt}} </td>\r\n			</tr>\r\n		</table>\r\n	</fieldset>\r\n\r\n	<fieldset class=\"standard\">\r\n		<legend> Last Task Failure </legend>\r\n		<table>\r\n			<tr>\r\n				<td> Task id </td>\r\n				<td> {{appData.lastTaskFailure.taskId}} </td>\r\n			</tr>\r\n			<tr>\r\n				<td> State </td>\r\n				<td> {{appData.lastTaskFailure.state}} </td>\r\n			</tr>\r\n			<tr>\r\n				<td> Message </td>\r\n				<td> {{appData.lastTaskFailure.message}} </td>\r\n			</tr>\r\n			<tr>\r\n				<td> Host </td>\r\n				<td> {{appData.lastTaskFailure.host}} </td>\r\n			</tr>\r\n			<tr>\r\n				<td> Timestamp </td>\r\n				<td> {{appData.lastTaskFailure.timestamp}} </td>\r\n			</tr>\r\n			<tr>\r\n				<td> Version </td>\r\n				<td> {{appData.lastTaskFailure.version}} </td>\r\n			</tr>\r\n			<!-- 		<tr>\r\n				<td> Mesos Details </td>\r\n				<td> ??? </td>\r\n			</tr> -->\r\n		</table>\r\n	</fieldset>\r\n\r\n	<fieldset class=\"standard\">\r\n		<legend> Tasks Total Summery </legend>\r\n		<span> Tasks Status </span>\r\n		<table>\r\n			<tr>\r\n				<td> Running </td>\r\n				<td> {{appData.taskStats.totalSummary.stats.counts.running}}</td>\r\n			</tr>\r\n			<tr>\r\n				<td> Healthy </td>\r\n				<td> {{appData.taskStats.totalSummary.stats.counts.healthy}} </td>\r\n			</tr>\r\n			<tr>\r\n				<td> Unhealthy </td>\r\n				<td> {{appData.taskStats.totalSummary.stats.counts.unhealthy}} </td>\r\n			</tr>\r\n			<tr>\r\n				<td> Staged </td>\r\n				<td> {{appData.taskStats.totalSummary.stats.counts.staged}} </td>\r\n			</tr>\r\n		</table>\r\n\r\n		<span> Tasks Lifetime </span>\r\n		<table>\r\n			<tr>\r\n				<td> Average </td>\r\n				<td> {{appData.taskStats.totalSummary.stats.lifeTime.averageSeconds}} s</td>\r\n			</tr>\r\n\r\n			<tr>\r\n				<td> Median </td>\r\n				<td> {{appData.taskStats.totalSummary.stats.lifeTime.medianSeconds}} s</td>\r\n			</tr>\r\n		</table>\r\n	</fieldset>\r\n</div>\r\n');
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
        $templateCache.put('app/components/app-info/table-tasks.tpl.html', '<div class=\"table-tasks\">\r\n	<table>\r\n		<tr>\r\n			<th>\r\n				<md-checkbox aria-label=\"Checkbox 1\" ng-model=\"checkAllTaskBool\" ng-click=\"checkAllTasks()\">\r\n\r\n				</md-checkbox>\r\n			</th>\r\n			<th> ID </th>\r\n			<th> Status </th>\r\n			<th> Version </th>\r\n			<th> Updated </th>\r\n			<!-- 	    <th> Health (Alive) </th> -->\r\n		</tr>\r\n		<tr ng-repeat=\"task in appData.tasks\">\r\n			<td>\r\n				<md-checkbox aria-label=\"Checkbox n\" ng-model=\"checkedTasks[task.id]\" ng-click=\"checkTask(task.id)\">\r\n\r\n				</md-checkbox>\r\n			</td>\r\n			<td>\r\n				<span class=\"link\" ng-click=\"showTaskInfo(task.id)\"> {{task.id}} </span>\r\n				<br> {{task.host}}:{{task.ports[0]}}\r\n			</td>\r\n			<td>\r\n				<span ng-show=\"task.startedAt\">Started</span>\r\n			</td>\r\n			<td> {{task.version | date}} </td>\r\n			<td> {{task.stagedAt | date:\'yyyy-MM-dd HH:mm:ss\'}} </td>\r\n			<!-- 	    <td> ??? </td> -->\r\n		</tr>\r\n	</table>\r\n</div>\r\n');
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
        $templateCache.put('app/components/apps-table/apps-table.tpl.html', '<md-whiteframe class=\"md-whiteframe-6dp white-card\" layout-padding>\r\n  <div class=\"apps-table\" layout=\"column\">\r\n    <table>\r\n      <tr>\r\n        <th> ID </th>\r\n        <th> Memory (MB) </th>\r\n        <th> CPUs </th>\r\n        <th> Tasks / Instances </th>\r\n        <th> Disk </th>\r\n      </tr>\r\n      <tr ng-repeat=\"app in appsList\" ng-click=\"showAppInfo(app)\">\r\n        <td class=\"border-left\"> {{app.id}} </td>\r\n        <td> {{app.mem}} </td>\r\n        <td> {{app.cpus}} </td>\r\n        <td> {{app.tasksRunning}} / {{app.instances}} </td>\r\n        <td class=\"border-right\"> {{app.disk}} </td>\r\n      </tr>\r\n    </table>\r\n  </div>\r\n</md-whiteframe>\r\n');
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
        $templateCache.put('app/components/toolbar/toolbar.tpl.html', '<div class=\"md-toolbar-tools container\" layout=\"raw\">\n  <div layout=\"raw\" flex=\"10\">\n    <div class=\"logo-mantl\" layout=\"raw\" layout-align=\"center center\">\n      <a ng-href=\"/\">\n        <img src=\"img/logo_mantl.png\">\n      </a>\n    </div>\n    <div class=\"logo-name\" layout=\"raw\" layout-align=\"center center\">\n      <a ng-href=\"/\" class=\"a-clear\">\n        <span>Pangea</span>\n      </a>\n    </div>\n  </div>\n  <div class=\"toolbar-tabs-container\" flex=\"90\">\n    <md-tabs md-dynamic-height md-border-bottom>\n      <md-tab><a ng-href=\"#/mesos/metrics\">Metrics</a></md-tab>\n      <md-tab><a ng-href=\"#/mesos/frameworks\">Frameworks</a></md-tab>\n      <md-tab><a ng-href=\"#/mesos/lattency\">Lattency</a></md-tab>\n      <md-tab><a ng-href=\"#/marathon/apps\">Apps</a></md-tab>\n      <md-tab><a ng-href=\"#/marathon/deployments\">Deployments</a></md-tab>\n    </md-tabs>\n  </div>\n</div>\n');
    }]);
})();

//# sourceMappingURL=templates.js.map