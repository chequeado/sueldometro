'use strict';

/**
 * @ngdoc function
 * @name sueldometroApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sueldometroApp
 */
angular.module('sueldometroApp')
  .controller('MainCtrl', function ($scope,$filter,tabletopData, ngTableParams) {

  		var data = angular.copy(tabletopData[0]);

		$scope.tableParams = new ngTableParams({
	        page: 1,            // show first page
	        count: data.length,          // count per page
	        sorting: {
	            titulo: 'asc'     // initial sorting
	        }
	    }, {
	        total: data.length, // length of data
	        counts:[],
	        getData: function($defer, params) {
	            var orderedData = params.sorting() ? $filter('orderBy')(data, params.orderBy()):data;
	            $defer.resolve(orderedData);
	        }
	    });


  });
