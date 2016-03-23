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
        $templateCache.put('app/components/apps/app-info/app-info.tpl.html', '<div class=\"container\" layout=\"column\" flex>\r\n	<md-whiteframe class=\"md-whiteframe-6dp white-card\" layout-padding>\r\n		<div layout-padding>\r\n			<span class=\"breadcrumb-link\" ng-click=\"goToAllApps()\"> Apps </span>\r\n			<span class=\"breadcrumb-arrow\"> > </span>\r\n			<span class=\"breadcrumb-current\"> {{appID}} </span>\r\n		</div>\r\n\r\n		<div>\r\n			<div layout=\"row\">\r\n				<md-button class=\"md-accent md-hue-1 md-raised\" ng-click=\"suspendApp()\">\r\n					Suspend\r\n				</md-button>\r\n				<md-button class=\"md-accent md-hue-1 md-raised\" ng-click=\"scaleApp()\">\r\n					Scale\r\n				</md-button>\r\n\r\n				<!-- fill up the space between left and right area -->\r\n				<span flex></span>\r\n\r\n				<md-button class=\"md-accent md-hue-1 md-raised\" ng-show=\"!!tasksToKill.ids.length\" ng-click=\"killTask(false)\">\r\n					Kill\r\n				</md-button>\r\n				<md-button class=\"md-accent md-hue-1 md-raised\" ng-show=\"!!tasksToKill.ids.length\" ng-click=\"killTask(true)\">\r\n					Kill & Scale\r\n				</md-button>\r\n				<md-button class=\"md-accent md-hue-1 md-raised\" ng-click=\"restartApp()\">\r\n					Restart App\r\n				</md-button>\r\n				<md-button class=\"md-warn md-hue-1 md-raised\" ng-click=\"destroyApp()\">\r\n					Destroy App\r\n				</md-button>\r\n			</div>\r\n\r\n			<md-tabs md-dynamic-height=\"true\" class=\"app-tabs\">\r\n				<md-tab label=\"Tasks\">\r\n					<div layout-padding>\r\n						<table-tasks></table-tasks>\r\n					</div>\r\n				</md-tab>\r\n				<md-tab label=\"Configuration\">\r\n					<div layout-padding>\r\n						<table-config></table-config>\r\n					</div>\r\n				</md-tab>\r\n				<md-tab label=\"Debug\">\r\n					<div layout-padding>\r\n						<table-debug></table-debug>\r\n					</div>\r\n				</md-tab>\r\n			</md-tabs>\r\n		</div>\r\n	<md-whiteframe>\r\n</div>\r\n');
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
        $templateCache.put('app/components/apps/app-info/table-config.tpl.html', '<div class=\"table-config\">\r\n  <fieldset class=\"standard\">\r\n    <legend> Current Version - {{appData.version | date:\'yyyy-MM-dd HH:mm:ss\'}} </legend>\r\n    <table>\r\n      <tr>\r\n        <td> Command </td>\r\n        <td> {{appData.cmd || \"Unspecified\"}} </td>\r\n      </tr>\r\n      <tr>\r\n        <td> Constraints </td>\r\n        <td>\r\n          <span ng-show=\"!!appData.constraints.length\">\r\n            			<span ng-repeat=\"constraint in appData.constraints\">\r\n            				{{constraint}} <br>\r\n            			</span>\r\n          </span>\r\n          <span ng-show=\"!!!appData.constraints.length\">\r\n            			Unspecified\r\n            		</span>\r\n        </td>\r\n      </tr>\r\n      <tr>\r\n        <td> Container </td>\r\n        <td>\r\n          <pre ng-show=\"appData.container\">\r\n                		{{appData.container | json:4 || \"Unspecified\"}}\r\n                	</pre>\r\n          <span ng-show=\"!appData.container\">\r\n                		Unspecified\r\n                	</span>\r\n        </td>\r\n      </tr>\r\n      <tr>\r\n        <td> CPUs </td>\r\n        <td> {{appData.cpus || \"Unspecified\"}} </td>\r\n      </tr>\r\n      <tr>\r\n        <td> Environment </td>\r\n        <td>\r\n          <span ng-show=\"appData.env\">\r\n    					<span ng-repeat=\"(envOption, value) in appData.env\">\r\n                    		{{envOption}}={{value}} <br>\r\n                    	</span>\r\n          </span>\r\n          <span ng-show=\"!!appData.env\">\r\n                		Unspecified\r\n                	</span>\r\n        </td>\r\n      </tr>\r\n      <tr>\r\n        <td> Executor </td>\r\n        <td> {{appData.executor || \"Unspecified\"}} </td>\r\n      </tr>\r\n      <tr>\r\n        <td> Health Checks </td>\r\n        <td>\r\n          <pre ng-show=\"appData.healthChecks[0]\">\r\n                		{{appData.healthChecks[0] | json:4 || \"Unspecified\"}}\r\n                	</pre>\r\n          <span ng-show=\"!appData.healthChecks[0]\">\r\n                		Unspecified\r\n                	</span>\r\n        </td>\r\n      </tr>\r\n      <tr>\r\n        <td> Instances </td>\r\n        <td> {{appData.instances || \"Unspecified\"}} </td>\r\n      </tr>\r\n      <tr>\r\n        <td> Memory </td>\r\n        <td> {{appData.mem || \"Unspecified\"}} </td>\r\n      </tr>\r\n      <tr>\r\n        <td> Disk Space </td>\r\n        <td> {{appData.disk || \"Unspecified\"}} </td>\r\n      </tr>\r\n      <tr>\r\n        <td> Ports </td>\r\n        <td>\r\n          <span ng-show=\"!!appData.ports.length\">\r\n    					<span ng-repeat=\"port in appData.ports\">\r\n    						{{port}} <br>\r\n    					</span>\r\n          </span>\r\n          <span ng-show=\"!!!appData.ports.length\">\r\n            			Unspecified\r\n            		</span>\r\n        </td>\r\n      </tr>\r\n      <tr>\r\n        <td> Backoff Factor </td>\r\n        <td> {{appData.backoffFactor || \"Unspecified\"}} </td>\r\n      </tr>\r\n      <tr>\r\n        <td> Backoff </td>\r\n        <td> {{appData.backoffSeconds || \"Unspecified\"}} </td>\r\n      </tr>\r\n\r\n      <tr>\r\n        <td> Max Launch Delay </td>\r\n        <td> {{appData.maxLaunchDelaySeconds || \"Unspecified\"}} </td>\r\n      </tr>\r\n      <tr>\r\n        <td> URIs </td>\r\n        <td>\r\n          <span ng-show=\"!!appData.uris.length\">\r\n                    	<span ng-repeat=\"uri in appData.uris\">\r\n                    		{{uri}} <br>\r\n                    	</span>\r\n          </span>\r\n          <span ng-show=\"!!!appData.uris.length\">\r\n                		Unspecified\r\n                	</span>\r\n        </td>\r\n      </tr>\r\n      <tr>\r\n        <td> Version </td>\r\n        <td> {{appData.version || \"Unspecified\"}} </td>\r\n      </tr>\r\n    </table>\r\n  </fieldset>\r\n</div>\r\n');
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
        $templateCache.put('app/components/apps/app-info/table-debug.tpl.html', '<div class=\"table-debug\">\r\n	<fieldset class=\"standard\">\r\n		<legend> Last Changes </legend>\r\n		<table>\r\n			<tr>\r\n				<td> Last Scaling </td>\r\n				<td> {{appData.versionInfo.lastScalingAt}} </td>\r\n			</tr>\r\n			<tr>\r\n				<td> Last Configuration </td>\r\n				<td> {{appData.versionInfo.lastConfigChangeAt}} </td>\r\n			</tr>\r\n		</table>\r\n	</fieldset>\r\n\r\n	<fieldset class=\"standard\">\r\n		<legend> Last Task Failure </legend>\r\n		<table>\r\n			<tr>\r\n				<td> Task id </td>\r\n				<td> {{appData.lastTaskFailure.taskId}} </td>\r\n			</tr>\r\n			<tr>\r\n				<td> State </td>\r\n				<td> {{appData.lastTaskFailure.state}} </td>\r\n			</tr>\r\n			<tr>\r\n				<td> Message </td>\r\n				<td> {{appData.lastTaskFailure.message}} </td>\r\n			</tr>\r\n			<tr>\r\n				<td> Host </td>\r\n				<td> {{appData.lastTaskFailure.host}} </td>\r\n			</tr>\r\n			<tr>\r\n				<td> Timestamp </td>\r\n				<td> {{appData.lastTaskFailure.timestamp}} </td>\r\n			</tr>\r\n			<tr>\r\n				<td> Version </td>\r\n				<td> {{appData.lastTaskFailure.version}} </td>\r\n			</tr>\r\n			<!-- 		<tr>\r\n				<td> Mesos Details </td>\r\n				<td> ??? </td>\r\n			</tr> -->\r\n		</table>\r\n	</fieldset>\r\n\r\n	<fieldset class=\"standard\">\r\n		<legend> Tasks Total Summery </legend>\r\n		<span> Tasks Status </span>\r\n		<table>\r\n			<tr>\r\n				<td> Running </td>\r\n				<td> {{appData.taskStats.totalSummary.stats.counts.running}}</td>\r\n			</tr>\r\n			<tr>\r\n				<td> Healthy </td>\r\n				<td> {{appData.taskStats.totalSummary.stats.counts.healthy}} </td>\r\n			</tr>\r\n			<tr>\r\n				<td> Unhealthy </td>\r\n				<td> {{appData.taskStats.totalSummary.stats.counts.unhealthy}} </td>\r\n			</tr>\r\n			<tr>\r\n				<td> Staged </td>\r\n				<td> {{appData.taskStats.totalSummary.stats.counts.staged}} </td>\r\n			</tr>\r\n		</table>\r\n\r\n		<span> Tasks Lifetime </span>\r\n		<table>\r\n			<tr>\r\n				<td> Average </td>\r\n				<td> {{appData.taskStats.totalSummary.stats.lifeTime.averageSeconds}} s</td>\r\n			</tr>\r\n\r\n			<tr>\r\n				<td> Median </td>\r\n				<td> {{appData.taskStats.totalSummary.stats.lifeTime.medianSeconds}} s</td>\r\n			</tr>\r\n		</table>\r\n	</fieldset>\r\n</div>\r\n');
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
        $templateCache.put('app/components/apps/app-info/table-tasks.tpl.html', '<div class=\"table table-checkbox\">\n	<table>\n		<tr>\n			<th>\n				<md-checkbox aria-label=\"Checkbox 1\" ng-model=\"checkAllTaskBool\" ng-click=\"checkAllTasks()\">\n\n				</md-checkbox>\n			</th>\n			<th> ID </th>\n			<th> Status </th>\n			<th> Version </th>\n			<th> Updated </th>\n			<!-- 	    <th> Health (Alive) </th> -->\n		</tr>\n		<tr ng-repeat=\"task in appData.tasks\">\n			<td>\n				<md-checkbox aria-label=\"Checkbox n\" ng-model=\"checkedTasks[task.id]\" ng-click=\"checkTask(task.id)\"></md-checkbox>\n			</td>\n			<td>\n				<span class=\"breadcrumb-link\" ng-click=\"showTaskInfo(task.id)\"> {{task.id}} </span>\n				<br> {{task.host}}:{{task.ports[0]}}\n			</td>\n			<td>\n				<span ng-show=\"task.startedAt\">Started</span>\n			</td>\n			<td> {{task.version | date}} </td>\n			<td> {{task.stagedAt | date:\'yyyy-MM-dd HH:mm:ss\'}} </td>\n			<!-- 	    <td> ??? </td> -->\n		</tr>\n	</table>\n</div>\n');
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
        $templateCache.put('app/components/apps/apps-table/apps-table.tpl.html', '<div class=\"container\" layout=\"column\" flex>\r\n  <md-whiteframe class=\"md-whiteframe-6dp white-card\" layout-padding>\r\n    <div layout=\"row\" flex>\r\n      <md-input-container class=\"md-block\" md-no-float layout-padding>\r\n        <input placeholder=\"Filter by App ID\" ng-model=\"search.id\">\r\n      </md-input-container>\r\n      <span flex></span>\r\n      <div>\r\n        <md-button class=\"md-accent md-hue-1 md-raised\" ng-click=\"newAppModal($event)\">\r\n          + New App\r\n        </md-button>\r\n      </div>\r\n    </div>\r\n\r\n    <div class=\"table\" layout=\"column\">\r\n      <table>\r\n        <tr>\r\n          <th> ID </th>\r\n          <th> Memory (MB) </th>\r\n          <th> CPUs </th>\r\n          <th> Tasks / Instances </th>\r\n          <th> Disk </th>\r\n        </tr>\r\n        <tr ng-repeat=\"app in appsList | filter: search\" ng-click=\"showAppInfo(app)\">\r\n          <td class=\"border-left\"> {{app.id}} </td>\r\n          <td> {{app.mem}} </td>\r\n          <td> {{app.cpus}} </td>\r\n          <td> {{app.tasksRunning}} / {{app.instances}} </td>\r\n          <td class=\"border-right\"> {{app.disk}} </td>\r\n        </tr>\r\n      </table>\r\n    </div>\r\n  </md-whiteframe>\r\n</div>\r\n');
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
        $templateCache.put('app/components/apps/task-info/task-info.tpl.html', '<div class=\"container\" layout=\"column\" flex>\r\n	<md-whiteframe class=\"md-whiteframe-6dp white-card\" layout-padding>\r\n		<div layout-padding>\r\n			<span class=\"breadcrumb-link\" ng-click=\"goToAllApps()\"> Apps </span>\r\n			<span class=\"breadcrumb-arrow\"> > </span>\r\n			<span class=\"breadcrumb-link\" ng-click=\"goToApp()\"> {{appID}} </span>\r\n			<span class=\"breadcrumb-arrow\"> > </span>\r\n			<span class=\"breadcrumb-current\"> {{taskID}} </span>\r\n		</div>\r\n\r\n		<div class=\"task-info\" layout=\"row\" layout-align=\"start start\">\r\n			<fieldset class=\"standard\">\r\n				<legend> Task Details </legend>\r\n				<table>\r\n					<tr>\r\n						<td> Host </td>\r\n						<td> {{taskData.host}}</td>\r\n					</tr>\r\n					<tr>\r\n						<td> Ports </td>\r\n						<td>\r\n							<span ng-repeat=\"port in taskData.ports\">\r\n								{{port}}\r\n							</span>\r\n						</td>\r\n					</tr>\r\n					<tr>\r\n						<td> Status </td>\r\n						<td>\r\n							<span ng-show=\"taskData.startedAt\">Started</span>\r\n						</td>\r\n					</tr>\r\n					<tr>\r\n						<td> Staged at </td>\r\n						<td> {{taskData.stagedAt | date:\'yyyy-MM-dd HH:mm:ss\'}}</td>\r\n					</tr>\r\n					<tr>\r\n						<td> Started at </td>\r\n						<td> {{taskData.startedAt | date:\'yyyy-MM-dd HH:mm:ss\'}}</td>\r\n					</tr>\r\n					<tr>\r\n						<td> Version </td>\r\n						<td> {{taskData.version | date:\'yyyy-MM-dd HH:mm:ss\'}}</td>\r\n					</tr>\r\n					<!-- 		<tr>\r\n						<td> Health </td>\r\n						<td> ??? </td>\r\n					</tr>\r\n					<tr>\r\n						<td> Mesos details </td>\r\n						<td> link??? </td>\r\n					</tr> -->\r\n				</table>\r\n			</fieldset>\r\n		</div>\r\n	</md-whiteframe>\r\n</div>\r\n');
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
        $templateCache.put('app/components/deployments/deployments.tpl.html', '<div class=\"container\" layout=\"column\" flex>\r\n  <md-whiteframe class=\"md-whiteframe-6dp white-card\" layout-padding>\r\n    <div class=\"apps-deployments\" flex layout=\"row\">\r\n      <table>\r\n        <tr>\r\n          <th> ID </th>\r\n          <th> Affected Apps </th>\r\n          <th> Action </th>\r\n          <th> Progress </th>\r\n          <th></th>\r\n        </tr>\r\n        <tr ng-repeat=\"deploy in deployList\" ng-hide=\"!deployList.length\">\r\n          <td class=\"border-left\"> {{deploy.id}} </td>\r\n          <td>\r\n            <span class=\"link\" ng-repeat=\"affApp in deploy.affectedApps\" ng-click=\"showAppInfo(affApp)\">\r\n              {{affApp}} <br>\r\n            </span>\r\n          </td>\r\n          <td>\r\n            <span ng-repeat=\"currAction in deploy.currentActions\">\r\n              {{currAction.action}} <br>\r\n            </span>\r\n          </td>\r\n          <td> {{deploy.currentStep}}/{{deploy.totalSteps}} </td>\r\n          <td class=\"border-right\">\r\n            <md-button ng-click=\"stopDeploy($event, deploy.id)\" class=\"md-raised\">Stop</md-button>\r\n            <md-button ng-click=\"rollbackDeploy($event, deploy.id)\" style=\"margin-right:0;\" class=\"md-raised md-warn\">RollBack</md-button>\r\n          </td>\r\n        </tr>\r\n        <tr flex ng-hide=\"deployList.length\">\r\n          <td colspan=\"5\" style=\"text-align: center;\">No deployments in progress.</td>\r\n        </tr>\r\n      </table>\r\n    </div>\r\n  <md-whiteframe>\r\n</div>\r\n');
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
        $templateCache.put('app/components/frameworks/framework-executor-tasks/framework-executor-tasks.tpl.html', '  <div class=\"container\" layout=\"column\" flex>\r\n  <md-whiteframe class=\"breadcrumb md-whiteframe-6dp white-card whiteframe-margin-bottom\">\r\n    <div layout-padding>\r\n      <span class=\"breadcrumb-link\" ng-click=\"goToFrameworksTable()\"> Frameworks </span>\r\n      <span class=\"breadcrumb-arrow\"> > </span>\r\n      <span class=\"breadcrumb-link\" ng-click=\"goToFrameworkExecutors()\"> {{frameworkId}} </span>\r\n      <span class=\"breadcrumb-arrow\"> > </span>\r\n      <span class=\"breadcrumb-current\"> {{executorId}} </span>\r\n    </div>\r\n  </md-whiteframe>\r\n\r\n  <md-whiteframe class=\"md-whiteframe-6dp whiteframe-margin-bottom\">\r\n    <div class=\"toolbar-card\" layout=\"row\" flex>\r\n      <h4 class=\"md-subhead\"> Queued Tasks </h4>\r\n      <span flex></span>\r\n      <md-input-container class=\"md-block\" md-no-float layout-padding>\r\n        <input placeholder=\"Filter\" ng-model=\"searchFrameworkExecutorTasksQueued\">\r\n      </md-input-container>\r\n    </div>\r\n    <md-content class=\"white-card\" layout-padding>\r\n      <div class=\"table table-inactive\" layout=\"column\">\r\n        <table>\r\n          <tr>\r\n            <th> ID </th>\r\n            <th> Name </th>\r\n            <th> CPUs </th>\r\n            <th> Memory </th>\r\n          </tr>\r\n          <tr ng-repeat=\"task in frameworkExecutorTasksQueued | filter: searchFrameworkExecutorTasksQueued\">\r\n            <td class=\"border-left\"> {{task.id}} </td>\r\n            <td> {{task.name}} </td>\r\n            <td> {{task.resources.cpus}} </td>\r\n            <td class=\"border-right\"> {{task.resources.mem}} </td>\r\n          </tr>\r\n        </table>\r\n      </div>\r\n    </md-content>\r\n  </md-whiteframe>\r\n\r\n  <md-whiteframe class=\"md-whiteframe-6dp whiteframe-margin-bottom\">\r\n    <div class=\"toolbar-card\" layout=\"row\" flex>\r\n      <h4 class=\"md-subhead\"> Tasks </h4>\r\n      <span flex></span>\r\n      <md-input-container class=\"md-block\" md-no-float layout-padding>\r\n        <input placeholder=\"Filter\" ng-model=\"searchFrameworkExecutorTasks\">\r\n      </md-input-container>\r\n    </div>\r\n    <md-content class=\"white-card\" layout-padding>\r\n      <div class=\"table table-endroad\" layout=\"column\">\r\n        <table>\r\n          <tr>\r\n            <th> ID </th>\r\n            <th> Name </th>\r\n            <th> State </th>\r\n            <th> CPUs (allocated) </th>\r\n            <th> Memory (allocated) </th>\r\n            <th> </th>\r\n          </tr>\r\n          <tr ng-repeat=\"task in frameworkExecutorTasks | filter: searchFrameworkExecutorTasks\">\r\n            <td class=\"border-left\"> {{task.id}} </td>\r\n            <td> {{task.name}} </td>\r\n            <td> {{task.state}} </td>\r\n            <td> {{task.resources.cpus}} </td>\r\n            <td> {{task.resources.mem}} </td>\r\n            <td class=\"border-right\">\r\n              <md-button class=\"md-raised\" ng-click=\"goToFrameworkTaskSandbox(task.id)\">\r\n                Sandbox\r\n              </md-button>\r\n            </td>\r\n          </tr>\r\n        </table>\r\n      </div>\r\n    </md-content>\r\n  </md-whiteframe>\r\n\r\n  <md-whiteframe class=\"md-whiteframe-6dp whiteframe-margin-bottom\">\r\n    <div class=\"toolbar-card\" layout=\"row\" flex>\r\n      <h4 class=\"md-subhead\"> Completed Tasks </h4>\r\n      <span flex></span>\r\n      <md-input-container class=\"md-block\" md-no-float layout-padding>\r\n        <input placeholder=\"Filter\" ng-model=\"searchFrameworkExecutorTasksCompleted\">\r\n      </md-input-container>\r\n    </div>\r\n    <md-content class=\"white-card\" layout-padding>\r\n      <div class=\"table table-inactive\" layout=\"column\">\r\n        <table>\r\n          <tr>\r\n            <th> ID </th>\r\n            <th> Name </th>\r\n            <th> State </th>\r\n            <th> CPUs (allocated) </th>\r\n            <th> Memory (allocated) </th>\r\n          </tr>\r\n          <tr ng-repeat=\"task in frameworkExecutorTasksCompleted | filter: searchFrameworkExecutorTasksCompleted\">\r\n            <td class=\"border-left\"> {{task.id}} </td>\r\n            <td> {{task.name}} </td>\r\n            <td> {{task.state}} </td>\r\n            <td> {{task.resources.cpus}} </td>\r\n            <td class=\"border-right\"> {{task.resources.mem}} </td>\r\n          </tr>\r\n        </table>\r\n      </div>\r\n    </md-content>\r\n  </md-whiteframe>\r\n</div>\r\n');
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
        $templateCache.put('app/components/frameworks/framework-task-sandbox/framework-task-sandbox.tpl.html', '<!-- <md-whiteframe class=\"breadcrumb md-whiteframe-6dp white-card whiteframe-margin-bottom\">\r\n  <div layout-padding>\r\n    <span class=\"breadcrumb-link\" ng-click=\"goToFrameworksTable()\"> Frameworks </span>\r\n    <span class=\"breadcrumb-arrow\"> > </span>\r\n    <span class=\"breadcrumb-link\" ng-click=\"goToFrameworkExecutors()\"> {{frameworkId}} </span>\r\n    <span class=\"breadcrumb-arrow\"> > </span>\r\n    <span class=\"breadcrumb-current\"> {{executorId}} </span>\r\n  </div>\r\n</md-whiteframe> -->\r\n<div class=\"container\" layout=\"column\" flex>\r\n<md-whiteframe class=\"md-whiteframe-6dp whiteframe-margin-bottom\">\r\n  <div class=\"toolbar-card\" layout=\"row\" flex>\r\n    <h4 class=\"md-subhead\"> Browse </h4>\r\n  <md-content class=\"white-card\" layout-padding>\r\n    <div class=\"table table-endroad\" layout=\"column\">\r\n      <table>\r\n        <tr>\r\n          <th> Mode </th>\r\n          <th> UID </th>\r\n          <th> GID </th>\r\n          <th> Size </th>\r\n          <th> Date </th>\r\n          <th></th>\r\n        </tr>\r\n        <tr ng-repeat=\"dir in directories\">\r\n          <td> {{dir.mode}} </td>\r\n          <td> {{dir.uid}} </td>\r\n          <td> {{dir.gid}} </td>\r\n          <td> {{dir.size}} </td>\r\n          <td><span ng-if=\"dir.path != \'..\'\">{{dir.mtime+\'000\' | date:\'medium\'}}</span></td>\r\n          <td>\r\n            <i ng-if=\"dir.mode[0] == \'d\'\" class=\"glyphicon glyphicon-folder-open\"><md-tooltip>Directory</md-tooltip></i>\r\n            <i ng-if=\"dir.mode[0] == \'-\'\" class=\"glyphicon glyphicon-file\"><md-tooltip>File</md-tooltip></i>\r\n            <span class=\"link\" ng-click=\"getSandboxByPath(dir.mode[0],dir.path)\">{{dir.path | toHPath}}</span>\r\n          </td>\r\n        </tr>\r\n      </table>\r\n    </div>\r\n  </md-content>\r\n</md-whiteframe>\r\n</div>\r\n');
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
        $templateCache.put('app/components/frameworks/framework-tasks/framework-tasks.tpl.html', '  <div class=\"container\" layout=\"column\" flex>\r\n  <md-whiteframe class=\"breadcrumb md-whiteframe-6dp white-card whiteframe-margin-bottom\">\r\n    <div layout-padding>\r\n      <span class=\"breadcrumb-link\" ng-click=\"goToFrameworksTable()\"> Frameworks </span>\r\n      <span class=\"breadcrumb-arrow\"> > </span>\r\n      <span class=\"breadcrumb-current\"> {{frameworkId}} </span>\r\n    </div>\r\n  </md-whiteframe>\r\n\r\n  <md-whiteframe class=\"md-whiteframe-6dp whiteframe-margin-bottom\">\r\n    <div class=\"toolbar-card\" layout=\"row\" flex>\r\n      <h4 class=\"md-subhead\"> Framework Active Tasks </h4>\r\n      <span flex></span>\r\n      <md-input-container class=\"md-block\" md-no-float layout-padding>\r\n        <input placeholder=\"Filter\" ng-model=\"searchFrameworkTasks\">\r\n      </md-input-container>\r\n    </div>\r\n    <md-content class=\"white-card\" layout-padding>\r\n      <div class=\"table\" layout=\"column\">\r\n        <table>\r\n          <tr>\r\n            <th> ID </th>\r\n            <th> Name </th>\r\n            <th> State </th>\r\n            <th> Started </th>\r\n          </tr>\r\n          <tr ng-repeat=\"task in frameworkTasks | filter: searchFrameworkTasks\" ng-click=\"goToExecutorTasks(task.slave_id, task.executor_id)\">\r\n            <td class=\"border-left\"> {{task.id}} </td>\r\n            <td> {{task.name}} </td>\r\n            <td> {{task.statuses[0].state}} </td>\r\n            <td class=\"border-right\"> {{currentDate - task.statuses[0].timestamp | date}} </td>\r\n          </tr>\r\n        </table>\r\n      </div>\r\n    </md-content>\r\n  </md-whiteframe>\r\n\r\n  <md-whiteframe class=\"md-whiteframe-6dp whiteframe-margin-bottom\">\r\n    <div class=\"toolbar-card\" layout=\"row\" flex>\r\n      <h4 class=\"md-subhead\"> Framework Completed Tasks </h4>\r\n      <span flex></span>\r\n      <md-input-container class=\"md-block\" md-no-float layout-padding>\r\n        <input placeholder=\"Filter\" ng-model=\"searchFrameworkTasksCompleted\">\r\n      </md-input-container>\r\n    </div>\r\n    <md-content class=\"white-card\" layout-padding>\r\n      <div class=\"table table-inactive\" layout=\"column\">\r\n        <table>\r\n          <tr>\r\n            <th> ID </th>\r\n            <th> Name </th>\r\n            <th> State </th>\r\n          </tr>\r\n          <tr ng-repeat=\"task in frameworkTasksCompleted | filter: searchFrameworkTasksCompleted\">\r\n            <td class=\"border-left\"> {{task.id}} </td>\r\n            <td> {{task.name}} </td>\r\n            <td class=\"border-right\"> {{task.state}} </td>\r\n          </tr>\r\n        </table>\r\n      </div>\r\n    </md-content>\r\n  </md-whiteframe>\r\n</div>\r\n');
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
        $templateCache.put('app/components/frameworks/frameworks-table/frameworks-table.tpl.html', '<div class=\"container\" layout=\"column\" flex>\r\n  <md-whiteframe class=\"breadcrumb md-whiteframe-6dp white-card whiteframe-margin-bottom\">\r\n    <div layout-padding>\r\n      <span class=\"breadcrumb-current\"> Frameworks </span>\r\n    </div>\r\n  </md-whiteframe>\r\n\r\n  <md-whiteframe class=\"md-whiteframe-6dp whiteframe-margin-bottom\">\r\n    <div class=\"toolbar-card\" layout=\"row\" flex>\r\n      <h4 class=\"md-subhead\"> Active Frameworks </h4>\r\n      <span flex></span>\r\n      <md-input-container class=\"md-block\" md-no-float layout-padding>\r\n        <input placeholder=\"Filter\" ng-model=\"searchframeworksActive\">\r\n      </md-input-container>\r\n    </div>\r\n    <md-content class=\"white-card\" layout-padding>\r\n      <div class=\"table\" layout=\"column\">\r\n        <table>\r\n          <tr>\r\n            <th> ID </th>\r\n            <th> Name </th>\r\n            <th> Hostname </th>\r\n            <th> User </th>\r\n            <th> Active Tasks </th>\r\n            <th> CPUs </th>\r\n            <th> Memory </th>\r\n            <th> Registered </th>\r\n            <th> Re-Registered </th>\r\n          </tr>\r\n          <tr ng-repeat=\"framework in frameworksActive | filter: searchframeworksActive\" ng-click=\"goToFrameworkTasks(framework.id)\">\r\n            <td class=\"border-left\"> {{framework.id}} </td>\r\n            <td> {{framework.name}} </td>\r\n            <td> {{framework.hostname}} </td>\r\n            <td> {{framework.user}} </td>\r\n            <td> {{framework.tasks.length}} </td>\r\n            <td> {{framework.resources.cpus | toFixed}} </td>\r\n            <td> {{framework.resources.mem | toGb}} Gb </td>\r\n            <td> {{currentDate - framework.registered_time | date}} </td>\r\n            <td class=\"border-right\">\r\n              <span ng-show=\"framework.failover_timeout !== 0\">{{currentDate - framework.reregistered_time | date}}</span>\r\n              <span ng-show=\"framework.failover_timeout === 0\"> - </span>\r\n            </td>\r\n          </tr>\r\n        </table>\r\n      </div>\r\n    </md-content>\r\n  </md-whiteframe>\r\n\r\n  <md-whiteframe class=\"md-whiteframe-6dp whiteframe-margin-bottom\">\r\n    <div class=\"toolbar-card\" layout=\"row\" flex>\r\n      <h4 class=\"md-subhead\"> Terminated Frameworks </h4>\r\n      <span flex></span>\r\n      <md-input-container class=\"md-block\" md-no-float layout-padding>\r\n        <input placeholder=\"Filter\" ng-model=\"searchframeworksTerminated\">\r\n      </md-input-container>\r\n    </div>\r\n    <md-content class=\"white-card\" layout-padding>\r\n      <div class=\"table table-inactive\" layout=\"column\">\r\n        <table>\r\n          <tr>\r\n            <th> ID </th>\r\n            <th> Name </th>\r\n            <th> Hostname </th>\r\n            <th> User </th>\r\n            <th> Registered </th>\r\n            <th> Unregistered </th>\r\n          </tr>\r\n          <tr ng-repeat=\"framework in frameworksTerminated | filter: searchframeworksTerminated\">\r\n            <td class=\"border-left\"> {{framework.id}} </td>\r\n            <td> {{framework.name}} </td>\r\n            <td> {{framework.hostname}} </td>\r\n            <td> {{framework.user}} </td>\r\n            <td> {{currentDate - framework.registered_time | date}} </td>\r\n            <td class=\"border-right\"> {{currentDate - framework.unregistered_time | date}} </td>\r\n          </tr>\r\n        </table>\r\n      </div>\r\n    </md-content>\r\n  </md-whiteframe>\r\n</div>\r\n');
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
        $templateCache.put('app/components/metrics/active-master-sidebar/active-master-sidebar.tpl.html', '<div layout=\"column\" flex>\n  <div class=\"data-container\" flex>\n    <span>\n      <label class=\"label label-primary\">\n        CPU: {{activeMasterData.cpu[0].size}} / {{parseFloat(activeMasterData.cpu[0].size) + parseFloat(activeMasterData.cpu[1].size) | number:2}}\n      </label>\n      <nvd3 options=\"optionsActiveMasterCpu\" data=\"activeMasterData.cpu\" class=\"with-3d-shadow with-transitions\" config=\"d3Config\"></nvd3>\n    </span>\n  </div>\n  <div class=\"data-container\" flex>\n    <span>\n      <label class=\"label label-primary\">\n        Memory: {{activeMasterData.mem[0].size}} / {{parseFloat(activeMasterData.mem[0].size) + parseFloat(activeMasterData.mem[1].size) | number:2}} GB\n      </label>\n      <nvd3 options=\"optionsActiveMasterMem\" data=\"activeMasterData.mem\" class=\"with-3d-shadow with-transitions\" config=\"d3Config\"></nvd3>\n    </span>\n  </div>\n  <div class=\"data-container\" flex>\n    <span>\n      <label class=\"label label-primary\">\n        Disk: {{activeMasterData.disk[0].size}} / {{parseFloat(activeMasterData.disk[0].size) + parseFloat(activeMasterData.disk[1].size) | number:2}} Gb\n      </label>\n      <nvd3 options=\"optionsActiveMasterDisk\" data=\"activeMasterData.disk\" class=\"with-3d-shadow with-transitions\" config=\"d3Config\"></nvd3>\n    </span>\n  </div>\n\n  <div class=\"data-container\" layout=\"column\" flex>\n    <div layout-align=\"start center\" flex>\n      <label class=\"label label-default\">\n        Master hosts:\n      </label>\n    </div>\n    <div layout=\"column\" layout-align=\"center center\" flex>\n      <div ng-repeat=\"master in mastersList\">\n        <span ng-class=\"master === activeMaster ? \'label label-success\' : \'label label-primary\'\">\n          {{master}}\n        </span>\n      </div>\n    </div>\n    <div layout=\"column\" layout-align=\"end start\" flex>\n      <div>\n        <span class=\"square-blue\"></span>\n        <span>\n          - standby master\n        </span>\n      </div>\n      <div>\n        <span class=\"square-green\"></span>\n        <span>\n          - leading master</span>\n      </div>\n    </div>\n  </div>\n\n  <div flex class=\"data-container\">\n    <label class=\"label label-default\">\n      Summary:\n    </label>\n    <br>\n    <div style=\"text-align: center\">\n      <div>\n        <label class=\"label label-default\">\n          CPUs:\n        </label>\n        <br>\n        <span ng-repeat=\"cpu in activeMasterData.cpu\">\n          <b>{{cpu.name}}:</b>{{cpu.size | number:2}}&nbsp;\n        </span>\n      </div>\n      <hr>\n      <div>\n        <label class=\"label label-default\">\n          Memory(Gb):\n        </label>\n        <br>\n        <span ng-repeat=\"mem in activeMasterData.mem\">\n          <b>{{mem.name}}:</b>{{mem.size | number:2}}&nbsp;\n        </span>\n      </div>\n      <hr>\n      <div>\n        <label class=\"label label-default\">\n          Disk(Gb):\n        </label>\n        <br>\n        <span ng-repeat=\"disk in activeMasterData.disk\">\n          <b>{{disk.name}}:</b>{{disk.size | number:2}}&nbsp;\n        </span>\n      </div>\n    </div>\n  </div>\n\n</div>\n');
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
        $templateCache.put('app/components/metrics/metrics.tpl.html', '<md-content layout=\"column\" style=\"height:100%;width:100%;\">\n  <div class=\"show-master-btn\">\n    <md-button class=\"md-accent md-hue-2 md-raised\" ng-click=\"showRightToolbar()\">\n      Show Active Master Info\n    </md-button>\n  </div>\n\n  <md-sidenav class=\"md-sidenav-right\" md-component-id=\"right\">\n    <md-content>\n      <master-info></master-info>\n    </md-content>\n  </md-sidenav>\n\n  <div ng-show=\"activeMaster === null\" layout=\"row\" layout-align=\"center center\" flex>\n    <h2>Loading data...</h2>\n  </div>\n\n  <div ng-show=\"activeMaster !== null && nodes.length === 0\" layout=\"row\" layout-align=\"center center\" flex>\n    <h2>Drawing...</h2>\n  </div>\n\n  <div ng-show=\"activeMaster !== null && nodes.length > 0\" style=\"height:100%;\">\n    <vis-network data=\"network_data\" options=\"options\" events=\"events\"></vis-network>\n  </div>\n\n  <md-whiteframe class=\"md-whiteframe-5dp slave-data-container\" layout=\"row\" md-whiteframe=\"3\" ng-if=\"infoPanel\">\n    <div layout=\"column\" flex=\"20\" layout-align=\"center center\">\n      <div class=\"label label-primary label-load\">\n        CPU: {{hostData.cpu[0].size}} / {{parseFloat(hostData.cpu[0].size) + parseFloat(hostData.cpu[1].size) | number:2}}\n      </div>\n      <nvd3 options=\"optionsHostCpu\" data=\"hostData.cpu\"></nvd3>\n    </div>\n    <div layout=\"column\" flex=\"20\" layout-align=\"center center\">\n      <div class=\"label label-primary label-load\">\n        Memory: {{hostData.mem[0].size}} / {{parseFloat(hostData.mem[0].size) + parseFloat(hostData.mem[1].size) | number:2}} Gb\n      </div>\n      <nvd3 options=\"optionsHostMem\" data=\"hostData.mem\"></nvd3>\n    </div>\n    <div layout=\"column\" flex=\"20\" layout-align=\"center center\">\n      <div class=\"label label-primary label-load\">\n        Disk: {{hostData.disk[0].size}} / {{parseFloat(hostData.disk[0].size) + parseFloat(hostData.disk[1].size) | number:2}} Gb\n      </div>\n      <nvd3 options=\"optionsHostDisk\" data=\"hostData.disk\"></nvd3>\n    </div>\n    <div layout=\"column\" flex=\"40\" layout-align=\"center start\">\n      <ul class=\"list-unstyled\">\n        <li>\n          Executors registering:\n          {{ hostData.general[\'slave/executors_registering\']}}\n        </li>\n        <li>\n          Executors running:\n          <span class=\"link\" ng-click=\"showExecutorsRunning(hostData.id)\">\n            {{ hostData.general[\'slave/executors_running\']}}\n            <md-tooltip md-direction=\"right\" md-autohide=\"true\">\n              Show details about executors\n            </md-tooltip>\n          </span>\n        </li>\n        <li style=\"cursor: pointer;\" class=\"agentExecutors\" ng-show=\"executorsRunning\">\n          <div style=\"border: solid 1px #ccc; padding: 5px;\">\n            <div style=\"text-align: right;\">\n              <i style=\"cursor: pointer;\" class=\"glyphicon glyphicon-eye-close\" ng-click=\"executorsRunning = null\"></i>\n            </div>\n            <div ng-repeat=\"executor in executorsRunning\">\n              <span>Name: {{executor.name}}</span><br>\n              <span>CPU: {{executor.cpu}}</span><br>\n              <span>Memory: {{executor.mem}}</span><br>\n              <span>Disk: {{executor.disk}}</span><br>\n            </div>\n          </div>\n        </li>\n        <li>Executors terminated:\n          {{ hostData.general[\'slave/executors_terminated\']}}</li>\n        <li>Executors terminating:\n          {{ hostData.general[\'slave/executors_terminating\']}}</li>\n        <li>\n          Frameworks active:\n          <span class=\"link\" ng-click=\"showFrameworksActive(hostData.id)\">\n            {{ hostData.general[\'slave/frameworks_active\']}}\n            <md-tooltip md-direction=\"right\" md-autohide=\"true\">\n              Show details about frameworks\n            </md-tooltip>\n          </span>\n        </li>\n        <li style=\"cursor: pointer;\" class=\"agentFrameworks\" ng-show=\"frameworksActive\">\n          <div style=\"border: solid 1px #ccc; padding: 5px;\">\n            <div style=\"text-align: right;\">\n              <i style=\"cursor: pointer;\" class=\"glyphicon glyphicon-eye-close\" ng-click=\"frameworksActive = null\"></i>\n            </div>\n            <div ng-repeat=\"framework in frameworksActive\">\n              <span>Name: {{framework.name}}</span><br>\n            </div>\n          </div>\n        </li>\n      </ul>\n    </div>\n  </md-whiteframe>\n  <canvas id=\"canPrep\" width=\"280\" height=\"280\" style=\"display: none;\"></canvas>\n  <div id=\"chartNodeUsage\" style=\"display: none;\"></div>\n\n</md-content>\n');
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
        $templateCache.put('app/components/modals/deployments-rollback-modal/deployments-rollback-modal.tpl.html', '<md-dialog>\r\n  <md-content layout=\"column\" layout-padding layout-align=\"center center\">\r\n    <p> Destroy deployment?\r\n    <br> Destroying this deployment will create and start a new deployment to revert the affected app to its previous version. </p>\r\n    <div>\r\n      <md-button class=\"md-primary md-raised\" ng-click=\"cancelDestory()\">\r\n        Cancel\r\n      </md-button>\r\n      <md-button class=\"md-primary md-raised\" ng-click=\"submitDestory()\">\r\n        Ok\r\n      </md-button>\r\n    </div>\r\n  </md-content>\r\n</md-dialog>\r\n');
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
        $templateCache.put('app/components/modals/deployments-stop-modal/deployments-stop-modal.tpl.html', '<md-dialog>\r\n  <md-content layout=\"column\" layout-padding layout-align=\"center center\">\r\n    <p> Stop deployment?\r\n    <br> This will stop the deployment immediately and leave it in the current state. </p>\r\n    <div>\r\n      <md-button class=\"md-primary md-raised\" ng-click=\"cancelStop()\">\r\n        Cancel\r\n      </md-button>\r\n      <md-button class=\"md-primary md-raised\" ng-click=\"submitStop()\">\r\n        Ok\r\n      </md-button>\r\n    </div>\r\n  </md-content>\r\n</md-dialog>\r\n');
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
        $templateCache.put('app/components/modals/destroy-app-modal/destroy-app-modal.tpl.html', '<md-dialog>\r\n  <md-content layout=\"column\" layout-padding layout-align=\"center center\">\r\n    <p>Destroy app {{appID}}? This is irreversible.</p>\r\n    <div>\r\n      <md-button class=\"md-primary md-raised\" ng-click=\"cancel()\">\r\n        Cancel\r\n      </md-button>\r\n      <md-button class=\"md-primary md-raised\" ng-click=\"submit()\">\r\n        Ok\r\n      </md-button>\r\n    </div>\r\n  </md-content>\r\n</md-dialog>\r\n');
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
        $templateCache.put('app/components/modals/new-app-modal/new-app-modal.tpl.html', '<md-dialog aria-label=\"New Application\" style=\"height: 500px;\">\r\n  <form name=\"createNewApp\" flex>\r\n    <md-toolbar layout-padding>\r\n      <div class=\"md-toolbar-tools\">\r\n        <h2>New Application</h2>\r\n        <span flex></span>\r\n        <md-button class=\"md-icon-button\" ng-click=\"cancel()\">\r\n          <md-icon md-svg-src=\"icons/ic_close_24px.svg\" aria-label=\"Close dialog\"></md-icon>\r\n        </md-button>\r\n      </div>\r\n    </md-toolbar>\r\n    <md-dialog-content layout=\"row\" style=\"max-width:800px;max-height:810px;width: 650px;\" flex>\r\n      <md-tabs md-border-bottom flex>\r\n        <md-tab label=\"Application Info\">\r\n          <md-content class=\"md-padding\" layout-padding>\r\n            <div>\r\n              <div layout-gt-xs=\"row\">\r\n                <md-input-container md-no-float class=\"md-block\" style=\"width:100%\">\r\n                  <label md-autofocus>ID</label>\r\n                  <input ng-model=\"newapp.id\" ng-required=\"true\">\r\n                </md-input-container>\r\n              </div>\r\n              <div layout-gt-xs=\"row\">\r\n                <md-input-container md-no-float class=\"md-block\" style=\"width:23%;padding-right: 15px;margin-top: 0;\">\r\n                  <label>CPUs</label>\r\n                  <input ng-init=\"newapp.cpus = 0.1\" type=\"number\" step=\"any\" min=\"0\" ng-model=\"newapp.cpus\">\r\n                </md-input-container>\r\n                <md-input-container md-no-float class=\"md-block\" style=\"width:23%;padding-right: 15px;margin-top: 0;\">\r\n                  <label>Memory (MB)</label>\r\n                  <input ng-init=\"newapp.mem = 16\" type=\"number\" step=\"any\" min=\"0\" ng-model=\"newapp.mem\">\r\n                </md-input-container>\r\n                <md-input-container md-no-float class=\"md-block\" style=\"width:23%;padding-right: 15px;margin-top: 0;\">\r\n                  <label>Disk Space (MB)</label>\r\n                  <input ng-init=\"newapp.disk = 0\" type=\"number\" step=\"any\" min=\"0\" ng-model=\"newapp.disk\">\r\n                </md-input-container>\r\n                <md-input-container md-no-float class=\"md-block\" style=\"width:25%;padding-right: 15px;margin-top: 0;\">\r\n                  <label>Instances</label>\r\n                  <input ng-init=\"newapp.instances = 1\" type=\"number\" step=\"1\" min=\"1\" ng-model=\"newapp.instances\">\r\n                </md-input-container>\r\n              </div>\r\n              <div layout-gt-xs=\"row\">\r\n                <md-input-container flex-gt-sm class=\"md-block\" style=\"width:100%;margin-top: 0;\">\r\n                  <label>Command</label>\r\n                  <textarea columns=\"1\" rows=\"2\" ng-model=\"newapp.cmd\"></textarea>\r\n                  <div class=\"hint\" style=\"color: #8e929b;font-size: 14px;\">May be left blank if a container image is supplied</div>\r\n                </md-input-container>\r\n              </div>\r\n            </div>\r\n          </md-content>\r\n        </md-tab>\r\n        <md-tab label=\"Docker settings\">\r\n          <md-content class=\"md-padding\">\r\n            <div layout-gt-sm=\"row\">\r\n              <md-input-container flex-gt-sm class=\"md-block\" style=\"width:48%;padding-right: 15px\">\r\n                <label>Image</label>\r\n                <input ng-model=\"newapp.container.docker.image\">\r\n              </md-input-container>\r\n              <input type=\"hidden\" ng-model=\"newapp.container.type\" ng-init=\"newapp.container.type = \'DOCKER\'\" ng-if=\"newapp.container.docker.image\">\r\n              <md-input-container flex-gt-sm class=\"md-block\" style=\"width:48%;padding-right: 15px\">\r\n                <label>Network</label>\r\n                <md-select ng-model=\"newapp.container.docker.network\">\r\n                  <md-option ng-repeat=\"network in newapp.docker_networks\" value=\"{{network.netid}}\">\r\n                    {{network.value}}\r\n                  </md-option>\r\n                </md-select>\r\n              </md-input-container>\r\n            </div>\r\n            <div layout-gt-sm=\"row\">\r\n              <fieldset class=\"standard\" style=\"width: 100%;\">\r\n                <legend>Privileges</legend>\r\n                <div layout=\"column\" layout-wrap layout-gt-sm=\"row\">\r\n                  <div flex-xs flex=\"100\">\r\n                    <md-checkbox ng-model=\"newapp.container.docker.privileged\">\r\n                      <code>Extend runtime privileges to this container</code>\r\n                    </md-checkbox>\r\n                    <div class=\"hint\" style=\"color: #8e929b;font-size: 14px;\">Select to give this container access to all devices on the host</div>\r\n                  </div>\r\n                </div>\r\n              </fieldset>\r\n            </div>\r\n            <div layout-gt-sm=\"row\" style=\"margin-top: 15px;\">\r\n              <fieldset class=\"standard\" style=\"width: 100%;\">\r\n                <legend>Port Mappings</legend>\r\n                <div layout=\"column\" layout-wrap layout-gt-sm=\"row\" data-ng-repeat=\"portmap in newapp.portMappings\">\r\n                  <div flex-xs flex=\"10\">\r\n                    <md-input-container md-no-float class=\"md-block\">\r\n                      <label>Container Port</label>\r\n                      <input type=\"number\" step=\"1\" min=\"0\" max=\"65535\" ng-model=\"newapp.container.docker.portMappings[$index].containerPort\">\r\n                    </md-input-container>\r\n                  </div>\r\n                  <div flex-xs flex=\"10\">\r\n                    <md-input-container md-no-float class=\"md-block\">\r\n                      <label>Host Port</label>\r\n                      <input type=\"number\" step=\"1\" min=\"0\" max=\"65535\" ng-model=\"newapp.container.docker.portMappings[$index].hostPort\">\r\n                    </md-input-container>\r\n                  </div>\r\n                  <div flex-xs flex=\"5\">\r\n                    <md-input-container md-no-float class=\"md-block\">\r\n                      <label>Service Port</label>\r\n                      <input type=\"number\" step=\"1\" min=\"0\" max=\"65535\" ng-model=\"newapp.container.docker.portMappings[$index].servicePort\">\r\n                    </md-input-container>\r\n                  </div>\r\n                  <div flex-xs flex=\"5\">\r\n                    <md-input-container md-no-float class=\"md-block\">\r\n                      <label>Protocol</label>\r\n                      <md-select ng-model=\"newapp.container.docker.portMappings[$index].protocol\">\r\n                        <md-option ng-repeat=\"protocol in newapp.docker_protocols\" value=\"{{protocol.netid}}\">\r\n                          {{protocol.value}}\r\n                        </md-option>\r\n                      </md-select>\r\n                    </md-input-container>\r\n                  </div>\r\n                  <div flex-xs flex=\"1\" style=\"margin-top: 15px;\">\r\n                    <md-button class=\"md-icon-button md-accent\" aria-label=\"Add\" style=\"margin: 0 0 0 0;padding-right: 0;\" ng-click=\"addPortMappings()\">\r\n                      <md-icon md-svg-src=\"icons/ic_add_circle_outline_black_24px.svg\"></md-icon>\r\n                    </md-button>\r\n                  </div>\r\n                  <div flex-xs flex=\"1\" style=\"margin-top: 15px;\">\r\n                    <md-button class=\"md-icon-button md-accent\" aria-label=\"Remove\" style=\"margin: 0 0 0 0;padding-left: 0;\" ng-click=\"removePortMappings($index)\">\r\n                      <md-icon md-svg-src=\"icons/ic_remove_circle_outline_black_24px.svg\"></md-icon>\r\n                    </md-button>\r\n                  </div>\r\n                </div>\r\n              </fieldset>\r\n            </div>\r\n            <div layout-gt-sm=\"row\" style=\"margin-top: 15px;\">\r\n              <fieldset class=\"standard\" style=\"width: 100%;\">\r\n                <legend>Parameters</legend>\r\n                <div layout=\"column\" layout-wrap layout-gt-sm=\"row\" data-ng-repeat=\"param in newapp.dockerParameters\">\r\n                  <div flex-xs flex=\"15\">\r\n                    <md-input-container md-no-float class=\"md-block\">\r\n                      <label>Key</label>\r\n                      <input ng-model=\"newapp.container.docker.parameters[$index].key\">\r\n                    </md-input-container>\r\n                  </div>\r\n                  <div style=\"margin-top: 30px;margin-left: 5px;margin-right: 5px;\">:</div>\r\n                  <div flex-xs flex=\"15\">\r\n                    <md-input-container md-no-float class=\"md-block\">\r\n                      <label>Value</label>\r\n                      <input ng-model=\"newapp.container.docker.parameters[$index].value\">\r\n                    </md-input-container>\r\n                  </div>\r\n                  <div flex-xs flex=\"1\" style=\"margin-top: 15px;\">\r\n                    <md-button class=\"md-icon-button md-accent\" aria-label=\"Add\" style=\"margin: 0 0 0 0;padding-right: 0;\" ng-click=\"addDockerParameter()\">\r\n                      <md-icon md-svg-src=\"icons/ic_add_circle_outline_black_24px.svg\"></md-icon>\r\n                    </md-button>\r\n                  </div>\r\n                  <div flex-xs flex=\"1\" style=\"margin-top: 15px;\">\r\n                    <md-button class=\"md-icon-button md-accent\" aria-label=\"Remove\" style=\"margin: 0 0 0 0;padding-left: 0;\" ng-click=\"removeDockerParameter($index)\">\r\n                      <md-icon md-svg-src=\"icons/ic_remove_circle_outline_black_24px.svg\"></md-icon>\r\n                    </md-button>\r\n                  </div>\r\n                </div>\r\n              </fieldset>\r\n            </div>\r\n            <div layout-gt-sm=\"row\" style=\"margin-top: 15px;\">\r\n              <fieldset class=\"standard\" style=\"width: 100%;\">\r\n                <legend>Volumes</legend>\r\n                <div layout=\"column\" layout-wrap layout-gt-sm=\"row\" data-ng-repeat=\"param in newapp.dockerVolumes\">\r\n                  <div flex-xs flex=\"10\">\r\n                    <md-input-container md-no-float class=\"md-block\">\r\n                      <label>Container Path</label>\r\n                      <input ng-model=\"newapp.container.volumes[$index].containerPath\">\r\n                    </md-input-container>\r\n                  </div>\r\n                  <div flex-xs flex=\"10\">\r\n                    <md-input-container md-no-float class=\"md-block\">\r\n                      <label>Host Path</label>\r\n                      <input ng-model=\"newapp.container.volumes[$index].hostPath\">\r\n                    </md-input-container>\r\n                  </div>\r\n                  <div flex-xs flex=\"5\">\r\n                    <md-input-container md-no-float class=\"md-block\">\r\n                      <label>Mode</label>\r\n                      <md-select ng-model=\"newapp.container.volumes[$index].mode\">\r\n                        <md-option ng-repeat=\"mode in newapp.docker_volume_modes\" value=\"{{mode.netid}}\">\r\n                          {{mode.value}}\r\n                        </md-option>\r\n                      </md-select>\r\n                    </md-input-container>\r\n                  </div>\r\n                  <div flex-xs flex=\"1\" style=\"margin-top: 15px;\">\r\n                    <md-button class=\"md-icon-button md-accent\" aria-label=\"Add\" style=\"margin: 0 0 0 0;padding-right: 0;\" ng-click=\"addDockerVolume()\">\r\n                      <md-icon md-svg-src=\"icons/ic_add_circle_outline_black_24px.svg\"></md-icon>\r\n                    </md-button>\r\n                  </div>\r\n                  <div flex-xs flex=\"1\" style=\"margin-top: 15px;\">\r\n                    <md-button class=\"md-icon-button md-accent\" aria-label=\"Remove\" style=\"margin: 0 0 0 0;padding-left: 0;\" ng-click=\"removeDockerVolume($index)\">\r\n                      <md-icon md-svg-src=\"icons/ic_remove_circle_outline_black_24px.svg\"></md-icon>\r\n                    </md-button>\r\n                  </div>\r\n                </div>\r\n              </fieldset>\r\n            </div>\r\n          </md-content>\r\n        </md-tab>\r\n        <md-tab label=\"Environment\">\r\n          <md-content class=\"md-padding\">\r\n            <div layout-gt-xs=\"row\" data-ng-repeat=\"param in newappEnv\">\r\n              <md-input-container md-no-float class=\"md-block\" style=\"width:48%;padding-right: 15px;margin-top: 0;\">\r\n                <label>Key</label>\r\n                <input ng-model=\"newapp.env[$index].key\">\r\n              </md-input-container>\r\n              <div style=\"margin-top: 10px;margin-right: 15px;\">:</div>\r\n              <md-input-container md-no-float class=\"md-block\" style=\"width:48%;padding-right: 15px;margin-top: 0;\">\r\n                <label>Value</label>\r\n                <input ng-model=\"newapp.env[$index].value\">\r\n              </md-input-container>\r\n              <md-button class=\"md-icon-button md-accent\" aria-label=\"Add\" style=\"margin: 0 0 0 0;padding-right: 0;\" ng-click=\"addNewAppEnv()\">\r\n                <md-icon md-svg-src=\"icons/ic_add_circle_outline_black_24px.svg\"></md-icon>\r\n              </md-button>\r\n              <md-button class=\"md-icon-button md-accent\" aria-label=\"Remove\" style=\"margin: 0 0 0 0;padding-left: 0;\" ng-click=\"removeNewAppEnv($index)\">\r\n                <md-icon md-svg-src=\"icons/ic_remove_circle_outline_black_24px.svg\"></md-icon>\r\n              </md-button>\r\n            </div>\r\n          </md-content>\r\n        </md-tab>\r\n        <md-tab label=\"Optional\">\r\n          <md-content class=\"md-padding\">\r\n            <div layout-gt-xs=\"row\">\r\n              <md-input-container md-no-float class=\"md-block\" style=\"width:100%;margin-bottom: 0;\">\r\n                <label>Executor</label>\r\n                <input ng-model=\"newapp.executor\">\r\n              </md-input-container>\r\n            </div>\r\n            <div layout-gt-xs=\"row\">\r\n              <md-input-container md-no-float class=\"md-block\" style=\"width:100%;margin-top: 5px;margin-bottom: 0;\">\r\n                <label>Ports</label>\r\n                <input ng-init=\"newapp.ports = [0]\" ng-list ng-model=\"newapp.ports\">\r\n                <div class=\"hint\" style=\"color: #8e929b;font-size: 14px;\">Comma-separated list of numbers. 0s (zeros) assign random ports. (Default: one random port)</div>\r\n              </md-input-container>\r\n            </div>\r\n            <div layout-gt-xs=\"row\">\r\n              <md-input-container md-no-float class=\"md-block\" style=\"width:100%;margin-bottom: 0;\">\r\n                <label>URIs</label>\r\n                <input ng-init=\"newapp.uris = []\" ng-list ng-model=\"newapp.uris\">\r\n                <div class=\"hint\" style=\"color: #8e929b;font-size: 14px;\">Comma-separated list of valid URIs.</div>\r\n              </md-input-container>\r\n            </div>\r\n            <div layout-gt-xs=\"row\">\r\n              <md-input-container md-no-float class=\"md-block\" style=\"width:100%;\">\r\n                <label>Constraints</label>\r\n                <input ng-init=\"newapp.constraints = []\" ng-list ng-model=\"newapp.constraints\">\r\n                <div class=\"hint\" style=\"color: #8e929b;font-size: 14px;\">Comma-separated list of valid constraints. Valid constraint format is \"field:operator[:value]\".</div>\r\n              </md-input-container>\r\n            </div>\r\n          </md-content>\r\n        </md-tab>\r\n      </md-tabs>\r\n    </md-dialog-content>\r\n    <md-dialog-actions layout=\"row\">\r\n      <span style=\"color: #ff0000;font-size: 14px;\"><md-tooltip md-direction=\"top\">{{newapp.responseMessage}}</md-tooltip>{{newapp.responseMessage | limitTo: 60}}{{newapp.responseMessage.length > 60 ? \'...\' : \'\'}}</span>\r\n      <span flex></span>\r\n      <md-button class=\"md-raised md-primary\" ng-click=\"submit()\" ng-disabled=\"createNewApp.$invalid\">\r\n        + Create\r\n      </md-button>\r\n      <md-button class=\"md-raised\" ng-click=\"cancel()\" style=\"margin-right:20px;\">\r\n        Cancel\r\n      </md-button>\r\n    </md-dialog-actions>\r\n  </form>\r\n</md-dialog>\r\n');
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
        $templateCache.put('app/components/modals/restart-app-modal/restart-app-modal.tpl.html', '<md-dialog>\r\n  <md-content layout=\"column\" layout-padding layout-align=\"center center\">\r\n    <p>Restart app {{appID}}?</p>\r\n    <div>\r\n      <md-button class=\"md-primary md-raised\" ng-click=\"cancel()\">\r\n        Cancel\r\n      </md-button>\r\n      <md-button class=\"md-primary md-raised\" ng-click=\"submit()\">\r\n        Ok\r\n      </md-button>\r\n    </div>\r\n  </md-content>\r\n</md-dialog>\r\n');
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
        $templateCache.put('app/components/modals/scale-app-modal/scale-app-modal.tpl.html', '<md-dialog>\r\n  <md-content layout=\"column\" layout-padding layout-align=\"center center\">\r\n    <md-input-container md-no-float class=\"md-block\">\r\n      <input placeholder=\"0 instances\" ng-model=\"parametrs.instances\" ng-required=\"true\">\r\n    </md-input-container>\r\n    <div>\r\n      <md-button class=\"md-primary md-raised\" ng-click=\"cancel()\">\r\n        Cancel\r\n      </md-button>\r\n      <md-button class=\"md-primary md-raised\" ng-click=\"submit()\">\r\n        Ok\r\n      </md-button>\r\n    </div>\r\n  </md-content>\r\n</md-dialog>\r\n');
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
        $templateCache.put('app/components/modals/suspend-app-modal/suspend-app-modal.tpl.html', '<md-dialog>\r\n  <md-content layout=\"column\" layout-padding layout-align=\"center center\">\r\n    <p>Suspend app by scaling to 0 instances?</p>\r\n    <div>\r\n      <md-button class=\"md-primary md-raised\" ng-click=\"cancel()\">\r\n        Cancel\r\n      </md-button>\r\n      <md-button class=\"md-primary md-raised\" ng-click=\"submit()\">\r\n        Ok\r\n      </md-button>\r\n    </div>\r\n  </md-content>\r\n</md-dialog>\r\n');
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