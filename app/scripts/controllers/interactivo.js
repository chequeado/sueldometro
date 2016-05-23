'use strict';

/**
 * @ngdoc function
 * @name sueldometroApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the sueldometroApp
 */
angular.module('sueldometroApp')
	.directive('numbersOnly', function(){
	   	return {
	     require: 'ngModel',
	     link: function(scope, element, attrs, modelCtrl) {
	       modelCtrl.$parsers.push(function (inputValue) {

	           if ( inputValue == undefined || inputValue == '' ) return '';
	           	           
	           inputValue = ''+inputValue;
	           var transformedInput = inputValue.replace(/[^0-9]/g, '');

	           if (transformedInput!=inputValue) {
	              modelCtrl.$setViewValue(transformedInput);
	              modelCtrl.$render();
	           }         

	           return transformedInput;         
	       });
	     }
   		}
   	})
   	.filter('escape', function() {
    	return window.encodeURIComponent;
  	})
  .controller('InteractivoCtrl', function ($scope,$filter,TabletopService,ngTableParams,$timeout,$location) {

  	$scope.pymChild = new pym.Child();

	$scope.loading = true;

  	TabletopService.getData().then(function(info){

	  	var data = info;

	  	$scope.variation = false;

	  	$scope.myData = {
			titulo: "MI SALARIO", 
			ano_2006: null,
			ano_2007: null,
			ano_2008: null,
			ano_2009: null,
			ano_2010: null,
			ano_2011: null,
			ano_2012: null,
			ano_2013: null,
			ano_2014: null,
			ano_2015: null,
			indice: 0,
			indice_anual: 0,
			userData: true,
			icon: 'glyphicon glyphicon-user'
	  	};

	  	$scope.loading = false;

	  	$scope.conclusion = function(){
	  		return "Mi sueldo varió un "+ $filter('number')($scope.myData.indice,0)+"% en la última década, mientras que el del gremio de camioneros lo hizo en 900%";
	 	}
	  	$scope.conclusionShare = function(){
	  		return $filter('escape')($scope.conclusion()+' vía @chequeado - '+'http://chequeado.com');
		}

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
	            $defer.resolve(orderedData.filter(function(f){
	            	return (f.graficar=='si')
	            }));
	        }
	    });


		var chartData = {
			'x': ["2006","2007","2008","2009","2010","2011","2012","2013","2014","2015"]
		};

		var types = {
			'Mi SALARIO':'spline'
		};

		var colors = {
			'Mi SALARIO':'#000'
		};

		angular.forEach(data,function(e,i){
			if(e.ano_2011 && e.graficar=='si'){
				chartData[e.titulo] = [
						parseInt(e.ano_2006),
						parseInt(e.ano_2007),
						parseInt(e.ano_2008),
						parseInt(e.ano_2009),
						parseInt(e.ano_2010),
						parseInt(e.ano_2011),
						parseInt(e.ano_2012),
						parseInt(e.ano_2013),
						parseInt(e.ano_2014),
						parseInt(e.ano_2015)
					];
				types[e.titulo] = 'spline';
				colors[e.titulo] = $scope.colors[i];
			}
		});

		$scope.chart = c3.generate({
			bindto: '#chart-container',
			data: {
				x: 'x',
	            json: chartData,
	            types: types,
	            //colors: colors
	        },
	        size: {
			  height: 500
			},
			axis: {
			  x: {
			    padding: {
			      left: 0.2,
			      right: 0.2,
			    }
			  }
			},
			line: {
			  connectNull: false
			},
			tooltip: {
		        grouped: false,
		        format: {
		            value: function (value, ratio, id) {
		                var format = d3.format('$');
		                return format(value);
		            }
		        }
		    }
		});

		$scope.labels = ["2006","2007","2008","2009","2010","2011","2012","2013","2014","2015"];
		$timeout(function(){
	    	$scope.pymChild.sendHeight();
      	},500);

  	});

	$scope.valueChanged = function(){
		$scope.tableParams.reload();
		$scope.refreshChart();
		$scope.changeVariation();
	};

	$scope.refreshChart = function(){
		$scope.chart.load({
	        columns: [
		        [
		        'Mi SALARIO', 
		        ($scope.myData.ano_2006 && ($scope.myData.ano_2006 != '') )?parseInt($scope.myData.ano_2006):null,
		        ($scope.myData.ano_2007 && ($scope.myData.ano_2007 != '') )?parseInt($scope.myData.ano_2007):null,
		        ($scope.myData.ano_2008 && ($scope.myData.ano_2008 != '') )?parseInt($scope.myData.ano_2008):null,
		        ($scope.myData.ano_2009 && ($scope.myData.ano_2009 != '') )?parseInt($scope.myData.ano_2009):null,
		        ($scope.myData.ano_2010 && ($scope.myData.ano_2010 != '') )?parseInt($scope.myData.ano_2010):null,
		        ($scope.myData.ano_2011 && ($scope.myData.ano_2011 != '') )?parseInt($scope.myData.ano_2011):null,
		        ($scope.myData.ano_2012 && ($scope.myData.ano_2012 != '') )?parseInt($scope.myData.ano_2012):null,
		        ($scope.myData.ano_2013 && ($scope.myData.ano_2013 != '') )?parseInt($scope.myData.ano_2013):null,
		        ($scope.myData.ano_2014 && ($scope.myData.ano_2014 != '') )?parseInt($scope.myData.ano_2014):null,
		        ($scope.myData.ano_2015 && ($scope.myData.ano_2015 != '') )?parseInt($scope.myData.ano_2015):null
		        ]
	        ]
	    });
		$scope.pymChild.sendHeight();
	};

	$scope.changeVariation = function(){
		if($scope.myData.ano_2006 && $scope.myData.ano_2015 && $scope.myData.ano_2006!='' && $scope.myData.ano_2015!=''){
			$scope.variation = true;
			$scope.myData.indice = (( $scope.myData.ano_2015 * 100 ) / $scope.myData.ano_2006 )-100;
		} else {
			$scope.variation = false;
		}
	};

	$scope.colors = ['#EF4F2F','#ffc468','#988b7b','#25bdbe','#c2beab','#9f0026','#88d9f6','86c6b5','#fa9d3e']

  });
