"use strict";angular.module("sueldometroApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","times.tabletop","ngTable"]).config(["$routeProvider","TabletopProvider",function(a,b){b.setTabletopOptions({key:"1pwPoKkIzwox4LBgpnCr2tIsaNLeqFFA1U5VsuWwLJqg",simpleSheet:!0,parseNumbers:!0}),a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main",resolve:{tabletopData:"Tabletop"}}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl",controllerAs:"about",resolve:{tabletopData:"Tabletop"}}).otherwise({redirectTo:"/"})}]),angular.module("sueldometroApp").controller("MainCtrl",["$scope","$filter","tabletopData","ngTableParams",function(a,b,c,d){var e=c[0];a.tableParams=new d({page:1,count:e.length,sorting:{profesion:"asc"}},{total:e.length,counts:[],getData:function(a,c){var d=c.sorting()?b("orderBy")(e,c.orderBy()):e;a.resolve(d)}})}]),angular.module("sueldometroApp").controller("AboutCtrl",function(){}),angular.module("sueldometroApp").run(["$templateCache",function(a){a.put("views/about.html","<p>This is the about view.</p>"),a.put("views/main.html",'<div class="row"> <div class="col-sm-12"> <h1>El sueldo del Gobernador y el de los legisladores aumentó 500% en 5 años</h1> <p class="lead">Es lo que surge del Salariómetro, una herramienta interactiva que permite comparar la evolución de los salarios en Mendoza en los últimos 5 años.</p> </div> </div> <div class="row"> <div class="col-sm-12"> <table class="table table-striped" ng-table="tableParams" class="table"> <tr ng-repeat="d in $data"> <td data-title="\'Profesion\'" sortable> {{d.profesion}} </td> <td class="text-right" data-title="\'2011\'" sortable> {{d.ano_2011}} </td> <td class="text-right" data-title="\'2012\'" sortable> {{d.ano_2012}} </td> <td class="text-right" data-title="\'2013\'" sortable> {{d.ano_2013}} </td> <td class="text-right" data-title="\'2014\'" sortable> {{d.ano_2014}} </td> <td class="text-right" data-title="\'2015\'" sortable> {{d.ano_2015}} </td> </tr> </table> </div> </div>')}]);