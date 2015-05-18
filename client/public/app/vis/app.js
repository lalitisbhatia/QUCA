'use strict';
var vis = angular.module('vis',['ui.router','ngRoute']);
vis.config(['$stateProvider', function($stateProvide) {
  $stateProvide
    .state('home', {
      url: "",
      templateUrl: "../partials/vis/home"

    })
    .state('register', {
      url: '/register',
      abstract: true,
      templateUrl: "../partials/vis/register"
    })

    .state('register.signup', {
      url: '/signup',
      views: {
        'reg': {
          templateUrl: "../partials/vis/signup"
        }
      }
    })
    .state('register.login', {
      url: '/login',
      views: {
        'reg': {
          templateUrl: "../partials/vis/login"
        }
      }
    })

}]);