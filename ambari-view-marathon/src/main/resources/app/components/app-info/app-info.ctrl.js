(function () {
  	'use strict';

    angular
    	.module('MarathonApp')
    	.controller('AppInfoCtrl', AppInfoCtrl); 
	        
    	AppInfoCtrl.$inject = [ 
    		'$location', 
    		'$routeParams',
    		'$mdDialog',
    		'$timeout',
    		'$scope',
    		'DataForAppInfoFactory', 
    		'HostNameFactory',
    		'KillTasksFactory'
    	];
	    
    	function AppInfoCtrl ($location, $routeParams, $mdDialog, $timeout, $scope, DataForAppInfoFactory, HostNameFactory, KillTasksFactory) {
    		$scope.$on('$locationChangeStart', function(){
			    $timeout.cancel(promise);
			});

	        var vm = this;

	        var promise;
	        
	        vm.appID = decodeURIComponent($routeParams.id);

	        vm.hostName = '';
	        vm.appData = {};

			vm.tasksToKill = {
			    ids: []
			};
			vm.checkedTasks = {};

			vm.checkTask = checkTask;
			vm.checkAllTasks = checkAllTasks;
			vm.checkAllTaskBool = false;

	        vm.suspendApp = suspendApp;
	        vm.scaleApp = scaleApp;
	        vm.restartApp = restartApp;
	        vm.destroyApp = destroyApp;
	        vm.killTasks = killTasks;
	        vm.refreshAppInfo = getAppInfo;

	        HostNameFactory.get()
        		.then( function(response) {
        			vm.hostName = response;
        			getAppInfo();
        		});
			// getAppInfo();
			// for Brunch server

			vm.showTaskInfo = showTaskInfo;
			vm.goToAllApps = goToAllApps;
	        
		    ///////////////////

		    function showTaskInfo (taskId) {
		    	$location.path($location.path() + '/' + taskId);
		    }

		    function goToAllApps () {
		    	$location.path('#/apps/');
		    }

	        function getAppInfo () {
	            DataForAppInfoFactory.get(vm.hostName, vm.appID)
	            	.then( function(response) {
		                vm.appData = response.app;
		                promise = $timeout(getAppInfo, 10*1000);
		            });	
	        }

	        function suspendApp (ev) {
		        $mdDialog.show({
		            templateUrl: 'app/components/suspend-app-modal/suspend-app-modal.tpl.html',
		            controller: 'SuspendAppCtrl',
		            controllerAs: 'suspendApp',
		            parent: angular.element(document.querySelector('#content')),
		            targetEvent: ev,
		            clickOutsideToClose:true
		        });
	    	}

	    	function scaleApp (ev) {
		        $mdDialog.show({
		            templateUrl: 'app/components/scale-app-modal/scale-app-modal.tpl.html',
		            controller: 'ScaleAppCtrl',
		            controllerAs: 'scaleApp',
		            parent: angular.element(document.querySelector('#content')),
		            targetEvent: ev,
		            clickOutsideToClose:true
		        });
	    	}

	    	function restartApp (ev) {
		        $mdDialog.show({
		            templateUrl: 'app/components/restart-app-modal/restart-app-modal.tpl.html',
		            controller: 'RestartAppCtrl',
		            controllerAs: 'restartApp',
		            parent: angular.element(document.querySelector('#content')),
		            targetEvent: ev,
		            clickOutsideToClose:true
		        });
	    	}

	    	function destroyApp (ev) {
		        $mdDialog.show({
		            templateUrl: 'app/components/destroy-app-modal/destroy-app-modal.tpl.html',
		            controller: 'DestroyAppCtrl',
		            controllerAs: 'destroyApp',
		            parent: angular.element(document.querySelector('#content')),
		            targetEvent: ev,
		            clickOutsideToClose:true
		        });
	    	}

	    	function killTasks (shouldScale) {
	    		HostNameFactory.get()
                    .then( function(response) {
                        vm.hostName = response;
                        KillTasksFactory.post(vm.hostName, vm.tasksToKill, shouldScale)
                            .then( function(response) {
                            	getAppInfo();
                            	vm.checkAllTaskBool = false;
                            	vm.checkedTasks = {};
                            	vm.tasksToKill.ids = [];
                            });
                    });  
	    	}

	    	function checkTask (taskId) {
	    		var indexOfTask = vm.tasksToKill.ids.indexOf(taskId);

	    		if ( indexOfTask === -1 ) {
	    			vm.tasksToKill.ids.push(taskId);
	    		} else {
	    			vm.tasksToKill.ids.splice(indexOfTask, 1);
	    		}
	    	}

	    	function checkAllTasks () {
				vm.tasksToKill.ids = [];

				if (vm.allCheckedState === true) {
					vm.allCheckedState = false;
					for (var i = 0; i < vm.appData.tasks.length; i++) {
						var task1 = vm.appData.tasks[i];
						vm.checkedTasks[task1.id] = false;
					}
				} else {
					vm.allCheckedState = true;
					for (var k = 0; k < vm.appData.tasks.length; k++) {
						var task2 = vm.appData.tasks[k];
						vm.checkedTasks[task2.id] = true;
						vm.checkTask(task2.id);
					}
				}
			}
	    }
}());