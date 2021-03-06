'use strict';

/**
 * @ngdoc overview
 * @name sueldometroApp
 * @description
 * # sueldometroApp
 *
 * Main module of the application.
 */
angular
  .module('sueldometroApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngTable'
  ])
  .config(function () {
    //config
  })
  .directive('integer', function(){
    return {
        require: 'ngModel',
        link: function(scope, ele, attr, ctrl){
            ctrl.$parsers.unshift(function(viewValue){
                return parseInt(viewValue, 10);
            });
        }
    };
  })
  //URL service
  .service('TabletopService', function ($q) {

    this.data = false;

    this.getData = function(){
      var that = this;
      return $q(function(resolve, reject) {
        if(!that.data){
          Tabletop.init( { key: '1XDxFbkRB3uoLvig7n-Iq7YXE9AvuY4UR8d4VGigCHds',
                  callback: function(data, tabletop) { 
                    that.data = data;
                    resolve(angular.copy(that.data));
                  },
                  simpleSheet: true,
                  parseNumbers: true
                });
        } else {
          resolve(angular.copy(that.data));
        }
      });
    };

  });

