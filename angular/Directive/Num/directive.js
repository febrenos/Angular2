// Code goes here

var app = angular.module('myApp', ['myApp.controllers'])
  .config(function($routeProvider) {
    return $routeProvider.when("/", {
      controller: 'firstCtrl'
    }).when("/numbers/:number", {
    controller: 'secondCtrl'
    });
  }).run(function($route) {});
  
  app.directive('myDir', ['$routeParams', function ($routeParams) {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        element.bind('click', function() {
          alert($routeParams.number);
        });
      }
    }
  }]);

angular.module("myApp.controllers", []).controller("firstCtrl", function($scope) {
  $scope.numbers = [1, 2, 3];
}).controller("secondCtrl", function($scope,$routeParams, $rootScope, $location) {
  return $rootScope.$on("$routeChangeSuccess", function(event, current) {
    $scope.current_path = $location.$$path;
    $scope.number = $routeParams['number'];
  });
});