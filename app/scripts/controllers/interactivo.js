'use strict';

/**
 * @ngdoc function
 * @name sueldometroApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the sueldometroApp
 */
angular.module('sueldometroApp')
  .controller('InteractivoCtrl', function ($scope,$filter,TabletopService,ngTableParams) {


  	TabletopService.getData().then(function(info){

	  	var data = info;

	  	$scope.myData = {
			titulo: "MI SALARIO", 
			ano_2011: null,
			ano_2012: null,
			ano_2013: null,
			ano_2014: null,
			ano_2015: null,
			indice: 261,
			indice_anual: 52,
			userData: true,
			icon: 'glyphicon glyphicon-user'
	  	};

	  	data.push($scope.myData);

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

		var series = [];
		var chartData = [];

		angular.forEach(data,function(e){
			series.push(e.titulo);
			chartData.push([e.ano_2011,e.ano_2012,e.ano_2013,e.ano_2014,e.ano_2015]);
		});

		$scope.labels = ["2011","2012","2013","2014","2015"];
		$scope.series = series;
		$scope.chartData = chartData;

  	});


	$scope.valueChanged = function(){
		$scope.tableParams.reload();
		$scope.refreshChart();
	};


	$scope.options = {
		scaleBeginAtZero: true,
		datasetFill : false,
		pointDotRadius: 8,
		pointDotStrokeWidth: 4
	};

	$scope.refreshChart = function refreshData(){
		var index = $scope.chartData.length-1;
		$scope.chartData[index] = [$scope.myData.ano_2011,$scope.myData.ano_2012,$scope.myData.ano_2013,$scope.myData.ano_2014,$scope.myData.ano_2015]
	};

	$scope.colors = ['#EF4F2F','#ffc468','#988b7b','#25bdbe','#c2beab','#9f0026','#88d9f6','86c6b5','#fa9d3e']

  });
