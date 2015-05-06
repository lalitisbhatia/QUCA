'use strict';
var vis = angular.module('vis',['ui.router','ngRoute']);
vis.config(['$stateProvider', function($stateProvide){
  $stateProvide
    .state('home',{
      url:"/",
      templateUrl:"../partials/home"
    })
}

]);