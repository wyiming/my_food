/**
 * Created by Administrator on 2016/12/28.
 */
var app = angular.module("myApp",
    ["ngRoute",
     "RouteModule",
     "HomePage",
     "SuperMarket",
     "ShopCar",
     "DirectiveModule",
     "me-lazyload",
     "angularCSS"
    ]);
app.controller("indexCtrl",function($http,$scope){
    var url = "/shuju"
    $http.get(url).success(function(data){
        $scope.data = data;
        if(data.err){
            console.log(data.msg)
        }else{
                var count = 0;
                for(var i=0;i<$scope.data.length;i++){
                    count += parseInt($scope.data[i].num);
                }
                if(count>0){
                    $(".buy_num").show();
                    $(".buy_num").html(count);
                }else{
                    $(".buy_num").hide();
                }
        }
    })
})
