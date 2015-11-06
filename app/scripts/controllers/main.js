'use strict';

/**
 * @ngdoc function
 * @name sueldometroApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sueldometroApp
 */
angular.module('sueldometroApp')
  .controller('MainCtrl', function ($scope,$filter,TabletopService, ngTableParams, $timeout) {

  		$scope.pymChild = new pym.Child();

		TabletopService.getData().then(function(info){
         	$scope.data = info;
          	$scope.tableParams = new ngTableParams({
		        page: 1,            // show first page
		        count: $scope.data.length,          // count per page
		        sorting: {
		            titulo: 'asc'     // initial sorting
		        }
		    }, {
		        total: $scope.data.length, // length of data
		        counts:[],
		        getData: function($defer, params) {
		            var orderedData = params.sorting() ? $filter('orderBy')($scope.data, params.orderBy()):$scope.data;
		            $defer.resolve(orderedData);
		        }
		    });
          	$timeout(function(){
		    	$scope.pymChild.sendHeight();
          	},500);
        });

  });
