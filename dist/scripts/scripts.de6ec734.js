"use strict";angular.module("sueldometroApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","ngTable"]).config(function(){}).directive("integer",function(){return{require:"ngModel",link:function(a,b,c,d){d.$parsers.unshift(function(a){return parseInt(a,10)})}}}).service("TabletopService",["$q",function(a){this.data=!1,this.getData=function(){var b=this;return a(function(a,c){b.data?a(angular.copy(b.data)):Tabletop.init({key:"1XDxFbkRB3uoLvig7n-Iq7YXE9AvuY4UR8d4VGigCHds",callback:function(c,d){b.data=c,a(angular.copy(b.data))},simpleSheet:!0,parseNumbers:!0})})}}]),angular.module("sueldometroApp").controller("MainCtrl",["$scope","$filter","TabletopService","ngTableParams","$timeout",function(a,b,c,d,e){a.pymChild=new pym.Child,c.getData().then(function(c){a.data=c,a.tableParams=new d({page:1,count:a.data.length,sorting:{titulo:"asc"}},{total:a.data.length,counts:[],getData:function(c,d){var e=d.sorting()?b("orderBy")(a.data,d.orderBy()):a.data;c.resolve(e)}}),e(function(){a.pymChild.sendHeight()},500)})}]),angular.module("sueldometroApp").directive("numbersOnly",function(){return{require:"ngModel",link:function(a,b,c,d){d.$parsers.push(function(a){if(void 0==a||""==a)return"";a=""+a;var b=a.replace(/[^0-9]/g,"");return b!=a&&(d.$setViewValue(b),d.$render()),b})}}}).filter("escape",function(){return window.encodeURIComponent}).controller("InteractivoCtrl",["$scope","$filter","TabletopService","ngTableParams","$timeout","$location",function(a,b,c,d,e,f){a.pymChild=new pym.Child,a.loading=!0,c.getData().then(function(c){var f=c;a.variation=!1,a.myData={titulo:"MI SALARIO",ano_2006:null,ano_2007:null,ano_2008:null,ano_2009:null,ano_2010:null,ano_2011:null,ano_2012:null,ano_2013:null,ano_2014:null,ano_2015:null,indice:0,indice_anual:0,userData:!0,icon:"glyphicon glyphicon-user"},a.loading=!1,a.conclusion=function(){return"Mi sueldo varió un "+b("number")(a.myData.indice,0)+"% en la última década, mientras que el del gremio de camioneros lo hizo en 900%"},a.conclusionShare=function(){return b("escape")(a.conclusion()+" vía @chequeado - http://chequeado.com")},f.push(a.myData),a.tableParams=new d({page:1,count:f.length,sorting:{titulo:"asc"}},{total:f.length,counts:[],getData:function(a,c){var d=c.sorting()?b("orderBy")(f,c.orderBy()):f;a.resolve(d)}});var g={x:["2006","2007","2008","2009","2010","2011","2012","2013","2014","2015"]},h={"Mi SALARIO":"spline"},i={"Mi SALARIO":"#000"};angular.forEach(f,function(b,c){b.ano_2011&&(g[b.titulo]=[parseInt(b.ano_2006),parseInt(b.ano_2007),parseInt(b.ano_2008),parseInt(b.ano_2009),parseInt(b.ano_2010),parseInt(b.ano_2011),parseInt(b.ano_2012),parseInt(b.ano_2013),parseInt(b.ano_2014),parseInt(b.ano_2015)],h[b.titulo]="spline",i[b.titulo]=a.colors[c])}),a.chart=c3.generate({bindto:"#chart-container",data:{x:"x",json:g,types:h},size:{height:500},axis:{x:{padding:{left:.2,right:.2}}},line:{connectNull:!1},tooltip:{grouped:!1,format:{value:function(a,b,c){var d=d3.format("$");return d(a)}}}}),a.labels=["2006","2007","2008","2009","2010","2011","2012","2013","2014","2015"],e(function(){a.pymChild.sendHeight()},500)}),a.valueChanged=function(){a.tableParams.reload(),a.refreshChart(),a.changeVariation()},a.refreshChart=function(){a.chart.load({columns:[["Mi SALARIO",a.myData.ano_2006&&""!=a.myData.ano_2006?parseInt(a.myData.ano_2006):null,a.myData.ano_2007&&""!=a.myData.ano_2007?parseInt(a.myData.ano_2007):null,a.myData.ano_2008&&""!=a.myData.ano_2008?parseInt(a.myData.ano_2008):null,a.myData.ano_2009&&""!=a.myData.ano_2009?parseInt(a.myData.ano_2009):null,a.myData.ano_2010&&""!=a.myData.ano_2010?parseInt(a.myData.ano_2010):null,a.myData.ano_2011&&""!=a.myData.ano_2011?parseInt(a.myData.ano_2011):null,a.myData.ano_2012&&""!=a.myData.ano_2012?parseInt(a.myData.ano_2012):null,a.myData.ano_2013&&""!=a.myData.ano_2013?parseInt(a.myData.ano_2013):null,a.myData.ano_2014&&""!=a.myData.ano_2014?parseInt(a.myData.ano_2014):null,a.myData.ano_2015&&""!=a.myData.ano_2015?parseInt(a.myData.ano_2015):null]]}),a.pymChild.sendHeight()},a.changeVariation=function(){a.myData.ano_2006&&a.myData.ano_2015&&""!=a.myData.ano_2006&&""!=a.myData.ano_2015?(a.variation=!0,a.myData.indice=100*a.myData.ano_2015/a.myData.ano_2006-100):a.variation=!1},a.colors=["#EF4F2F","#ffc468","#988b7b","#25bdbe","#c2beab","#9f0026","#88d9f6","86c6b5","#fa9d3e"]}]),angular.module("sueldometroApp").run(["$templateCache",function(a){a.put("views/interactivo.html",'<div ng-controller="InteractivoCtrl"><div class="row"><div class="col-sm-12"><form class="form-inline"><fieldset><!-- Form Name --><legend></legend><div class="row"><div class="col-sm-2">Completá los datos de tu salario mensual aproximado >></div><div class="col-sm-2"><div class="form-group"><label for="textinput1">2006</label><div class="input-group"><span class="input-group-addon" id="basic-addon1">$</span> <input id="textinput1" name="textinput1" placeholder="" class="form-control input-md" type="text" step="1000" numbers-only="numbers-only" required="required" ng-change="valueChanged()" min="0" maxlength="5" ng-model="myData.ano_2006"></div></div></div><div class="col-sm-2"><div class="form-group"><label for="textinput1">2007</label><div class="input-group"><span class="input-group-addon" id="basic-addon1">$</span> <input id="textinput1" name="textinput1" placeholder="" class="form-control input-md" type="text" step="1000" numbers-only="numbers-only" required="required" ng-change="valueChanged()" min="0" maxlength="5" ng-model="myData.ano_2007"></div></div></div><div class="col-sm-2"><div class="form-group"><label for="textinput1">2008</label><div class="input-group"><span class="input-group-addon" id="basic-addon1">$</span> <input id="textinput1" name="textinput1" placeholder="" class="form-control input-md" type="text" step="1000" numbers-only="numbers-only" required="required" ng-change="valueChanged()" min="0" maxlength="5" ng-model="myData.ano_2008"></div></div></div><div class="col-sm-2"><div class="form-group"><label for="textinput1">2009</label><div class="input-group"><span class="input-group-addon" id="basic-addon1">$</span> <input id="textinput1" name="textinput1" placeholder="" class="form-control input-md" type="text" step="1000" numbers-only="numbers-only" required="required" ng-change="valueChanged()" min="0" maxlength="5" ng-model="myData.ano_2009"></div></div></div><div class="col-sm-2"><div class="form-group"><label for="textinput1">2010</label><div class="input-group"><span class="input-group-addon" id="basic-addon1">$</span> <input id="textinput1" name="textinput1" placeholder="" class="form-control input-md" type="text" step="1000" numbers-only="numbers-only" required="required" ng-change="valueChanged()" min="0" maxlength="5" ng-model="myData.ano_2010"></div></div></div><div class="col-sm-2"><div class="form-group"><label for="textinput1">2011</label><div class="input-group"><span class="input-group-addon" id="basic-addon1">$</span> <input id="textinput1" name="textinput1" placeholder="" class="form-control input-md" type="text" step="1000" numbers-only="numbers-only" required="required" ng-change="valueChanged()" min="0" maxlength="5" ng-model="myData.ano_2011"></div></div></div><div class="col-sm-2"><div class="form-group"><label for="textinput2">2012</label><div class="input-group"><span class="input-group-addon" id="basic-addon1">$</span> <input id="textinput2" name="textinput2" placeholder="" class="form-control input-md" type="text" step="1000" ng-change="valueChanged()" min="0" maxlength="5" ng-model="myData.ano_2012"></div></div></div><div class="col-sm-2"><div class="form-group"><label for="textinput3">2013</label><div class="input-group"><span class="input-group-addon" id="basic-addon1">$</span> <input id="textinput3" name="textinput3" placeholder="" class="form-control input-md" type="text" step="1000" ng-change="valueChanged()" min="0" maxlength="5" ng-model="myData.ano_2013"></div></div></div><div class="col-sm-2"><div class="form-group"><label for="textinput4">2014</label><div class="input-group"><span class="input-group-addon" id="basic-addon1">$</span> <input id="textinput4" name="textinput4" placeholder="" class="form-control input-md" type="text" step="1000" ng-change="valueChanged()" min="0" maxlength="5" ng-model="myData.ano_2014"></div></div></div><div class="col-sm-2"><div class="form-group"><label for="textinput5">2015</label><div class="input-group"><span class="input-group-addon" id="basic-addon1">$</span> <input id="textinput5" name="textinput5" placeholder="" class="form-control input-md" type="text" step="1000" ng-change="valueChanged()" min="0" maxlength="5" ng-model="myData.ano_2015"></div></div></div></div></fieldset></form></div></div><hr><div class="row"><div class="col-sm-12"><div><div class="btn-group btn-group-justified" role="group" aria-label="..."><div class="btn-group" role="group"><a href="#chart" aria-controls="chart" role="tab" data-toggle="tab" class="btn btn-default">Gráfico</a></div><div class="btn-group" role="group"><a href="#table" aria-controls="table" role="tab" data-toggle="tab" class="btn btn-default">Tabla</a></div></div><!-- Tab panes --><div class="tab-content"><div role="tabpanel" class="tab-pane active" id="chart"><div id="chart-container"></div></div><div role="tabpanel" class="tab-pane" id="table"><table class="table table-striped" ng-table="tableParams" class="table"><tr ng-repeat="d in $data" ng-class="{\'user-data\':d.userData}"><td data-title="\'Título\'" data-sortable="\'titulo\'"><span class="{{d.icon}}"></span> {{d.titulo}}</td><td class="text-right" data-title="\'2006\'" data-sortable="\'ano_2006\'"><span ng-show="d.ano_2006">${{d.ano_2006}}</span></td><td class="text-right" data-title="\'2007\'" data-sortable="\'ano_2007\'"><span ng-show="d.ano_2007">${{d.ano_2007}}</span></td><td class="text-right" data-title="\'2008\'" data-sortable="\'ano_2008\'"><span ng-show="d.ano_2008">${{d.ano_2008}}</span></td><td class="text-right" data-title="\'2009\'" data-sortable="\'ano_2009\'"><span ng-show="d.ano_2009">${{d.ano_2009}}</span></td><td class="text-right" data-title="\'2010\'" data-sortable="\'ano_2010\'"><span ng-show="d.ano_2010">${{d.ano_2010}}</span></td><td class="text-right" data-title="\'2011\'" data-sortable="\'ano_2011\'"><span ng-show="d.ano_2011">${{d.ano_2011}}</span></td><td class="text-right" data-title="\'2012\'" data-sortable="\'ano_2012\'"><span ng-show="d.ano_2012">${{d.ano_2012}}</span></td><td class="text-right" data-title="\'2013\'" data-sortable="\'ano_2013\'"><span ng-show="d.ano_2013">${{d.ano_2013}}</span></td><td class="text-right" data-title="\'2014\'" data-sortable="\'ano_2014\'"><span ng-show="d.ano_2014">${{d.ano_2014}}</span></td><td class="text-right" data-title="\'2015\'" data-sortable="\'ano_2015\'"><span ng-show="d.ano_2015">${{d.ano_2015}}</span></td></tr></table></div></div></div><div class="well well-lg"><div ng-show="variation"><h1 class="text-center">{{conclusion()}}</h1><p class="text-center"><a class="btn btn-default btn-lg" ng-href="https://twitter.com/intent/tweet?text={{conclusionShare()}}" target="_blank">Twitter</a> <a class="btn btn-default btn-lg" ng-href="https://www.facebook.com/sharer/sharer.php?u=http://chequeado.com" target="_blank">Facebook</a></p></div><div ng-hide="variation"><p><strong>COMPARTIR:</strong> Completá los datos de tu sueldo para poder compartir la conclusión.</p></div></div></div></div></div>'),a.put("views/main.html",'<div ng-controller="MainCtrl"><div class="row"><div class="col-sm-12"><table class="table table-striped" ng-table="tableParams" class="table"><tr ng-repeat="d in $data" ng-class="{\'user-data\':(d.id==9)}"><td data-title="\'Título\'" data-sortable="\'titulo\'"><span class="{{d.icon}}"></span> {{d.titulo}}</td><td class="text-right" data-title="\'2011\'" data-sortable="\'ano_2011\'">${{d.ano_2011}}</td><td class="text-right" data-title="\'2012\'" data-sortable="\'ano_2012\'">${{d.ano_2012}}</td><td class="text-right" data-title="\'2013\'" data-sortable="\'ano_2013\'">${{d.ano_2013}}</td><td class="text-right" data-title="\'2014\'" data-sortable="\'ano_2014\'">${{d.ano_2014}}</td><td class="text-right" data-title="\'2015\'" data-sortable="\'ano_2015\'">${{d.ano_2015}}</td><td class="text-right" data-title="\'Índice de crecimiento\'" data-sortable="\'indice\'">{{d.indice}}%</td><td class="text-right" data-title="\'Índice de crecimiento anual\'" data-sortable="\'indice_anual\'">{{d.indice_anual}}%</td></tr></table></div></div></div>')}]);