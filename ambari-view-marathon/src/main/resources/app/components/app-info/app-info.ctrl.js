(function () {
  	'use strict';

    angular
    	.module('MarathonApp')
    	.controller('AppInfoCtrl', AppInfoCtrl); 
	        
    	AppInfoCtrl.$inject = [
    		'$timeout', 
    		'$location', 
    		'$routeParams',
    		'$mdDialog',
    		'DataForAppInfoFactory', 
    		'HostNameFactory'
    	];
	    
    	function AppInfoCtrl ($timeout, $location, $routeParams, $mdDialog, DataForAppInfoFactory, HostNameFactory) {
	        var vm = this;
	        
	        vm.appID = decodeURIComponent($routeParams.id);
	        vm.hostName = '';
	        vm.appData = {};

	        vm.suspendApp = suspendApp;
	        vm.scaleApp = scaleApp;
	        vm.restartApp = restartApp;
	        vm.destroyApp = destroyApp;

	        HostNameFactory.get()
        		.then( function(response) {
        			vm.hostName = response;
        			getAppInfo();
        		});
	        
	        ///////////////////

	        function getAppInfo () {
	            DataForAppInfoFactory.get(vm.hostName, vm.appID)
	            	.then( function(response) {
		                vm.appData = response.app;
		                $timeout(getAppInfo, 10*1000);
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
	    }
}());