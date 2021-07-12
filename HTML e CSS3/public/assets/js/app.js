var app = angular.module('driverApp',[]);
app.controller('driverController', function($scope)
{
    $scope.driverList = [];
    $scope.driver = new Object(); 
    $scope.driver.name='';
    $scope.driver.isPf=true;
    $scope.driver.cnh='';
    $scope.driver.identity='';
    $scope.driver.dateBirth=new Date(1996,06,19);
    $scope.cnhCategories=['A','B','AB','AC','AD','AE','C','D','E'];
    
    $scope.saveDriverData= function()
    {
        if($scope.driver.name!=="")
        {
            driverAdd = new Object();
            driverAdd.name=$scope.driver.name;
            driverAdd.isPf=$scope.driver.isPf;
            driverAdd.cnh=$scope.driver.cnh;
            driverAdd.dateBirth=$scope.driver.dateBirth;
            $scope.driverList.push(driverAdd);
            $scope.resetFormdriver();
        }
    }
    $scope.resetFormdriver= function()
    {
        if($scope.driver!==null ||$scope.driver!==undefined)
        {
            $scope.driver.name='';
            $scope.driver.isPf=true;
            $scope.driver.cnh='';
            //$scope.driver.dateBirth=new Date.now;            
        }
    }    
});
/*var app = angular.module('eventApp',[]);
app.controller('eventController',function($scope)
{
    $scope.event = new Object();
    $scope.event.description = 'Criar um novo layout para a tela de eventos';
    $scope.event.name='Programando em pares';

    //
});*/
/*
*/
