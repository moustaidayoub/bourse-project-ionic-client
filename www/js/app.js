// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app=angular.module('starter', ['ionic']);
var url="http://localhost:8080";

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});
app.config(function($stateProvider,$urlRouterProvider){
  $stateProvider.state("societes",{
    url:"/societes",
    templateUrl:"views/societes.html",
    controller:"SocietesController"
  });
  $stateProvider.state("ordresSociete",{
    url:"/ordresSociete/:numeroSociete",
    templateUrl:"views/ordresSociete.html",
    controller:"OrdresSocieteController"
  });
  $urlRouterProvider.otherwise("societes");
});

app.controller("SocietesController",function($http,$scope,$state){
$scope.listSocietes=[];
$scope.currentPage=-1;
  $scope.size=4;
  $scope.url=url;
  $scope.pageCount=0;
  $scope.chargerSocietes=function(page){
    $http.get(url+"/v1/societes?page="+$scope.currentPage+"&size="+$scope.size)
      .success(function(data){
        $scope.pageCount=data.totalPages;
        data.content.forEach(function(act){
          $scope.listSocietes.push(act);
        });
        $scope.$broadcast('scroll.infiniteScrollComplete');
      })
      .error(function(err){
        console.log(err);
      })
  }
  $scope.loadMore=function(){
    if($scope.currentPage<=$scope.pageCount){
    ++$scope.currentPage;
    $scope.chargerSocietes($scope.currentPage);
    }
  }
$scope.getOrdresSociete=function(numero){
  $state.go("ordresSociete",{
    numeroSociete:numero
  });
}

});

app.controller("OrdresSocieteController",function($http,$scope,$state,$stateParams){
	$scope.numeroSociete=$stateParams.numeroSociete;
$scope.listOrdres=[];
$scope.currentPage=-1;
  $scope.size=4;
  $scope.url=url;
  $scope.pageCount=0;
  $scope.chargerOrdres=function(page){
    $http.get(url+"/v1/ordres/societe/"+$scope.numeroSociete+"?page="+$scope.currentPage+"&size="+$scope.size)
      .success(function(data){
        $scope.pageCount=data.totalPages;
        data.content.forEach(function(ordre){
          $scope.listOrdres.push(ordre);
        });
        $scope.$broadcast('scroll.infiniteScrollComplete');
      })
      .error(function(err){
        console.log(err);
      })
  }
  $scope.loadMore=function(){
    if($scope.currentPage<=$scope.pageCount){
    ++$scope.currentPage;
    $scope.chargerOrdres($scope.currentPage);
    }
  }

});

