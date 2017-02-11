/**
 * Created by Administrator on 2016/12/29.
 */
angular.module("SuperMarket",[])
.controller("marketCtrl",function($scope,$http){
    $http.get("json/classify.json").success(function(data){
        $scope.data = data.data[0].children;
        $scope.data1 = data.data[1].children;
    })
    $http.get("json/2.json").success(function(data){
        $scope.data2 = data.data;
    })

})
