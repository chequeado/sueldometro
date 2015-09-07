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
    'times.tabletop',
    'ngTable'
  ])
  .config(function ($routeProvider, TabletopProvider) {

    TabletopProvider.setTabletopOptions({
      key: '1pwPoKkIzwox4LBgpnCr2tIsaNLeqFFA1U5VsuWwLJqg',
      simpleSheet: true,
      parseNumbers: true
    });

    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main',
        resolve: {
          tabletopData: 'Tabletop'
        }
      })
      .when('/interactivo', {
        templateUrl: 'views/interactivo.html',
        controller: 'InteractivoCtrl',
        controllerAs: 'interactivo',
        resolve: {
          tabletopData: 'Tabletop'
        },
      })
      .otherwise({
        redirectTo: '/'
      });
  });
