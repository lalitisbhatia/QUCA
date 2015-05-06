'use strict';
var adminApp = angular.module('adminApp',['ui.router','ngRoute']);
adminApp.config(['$stateProvider', function($stateProvide){
  $stateProvide
    .state('home',{
      url:"",
      templateUrl:"../partials/admin/adminHome"
    })
    .state('users',{
      url:"users",
      templateUrl:"../partials/admin/users"
    })
}

]);