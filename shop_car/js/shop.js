/**
 * Created by Administrator on 2016/12/30.
 */
angular.module("ShopCar",[])
.controller("shopCtrl",function($scope,$http){
    var url = "/shuju";
    $http.get(url).success(function(data){
        if(data.err==1){
            console.log(data.msg)
        }else{
            $scope.data = data;
            if(data.length==0){
                $(".wrap1").hide();
                $(".wrap").show();
            }else{
                $(".wrap1").show();
                $(".wrap").hide();
            }
            $scope.all_price = 0;
            for(var i=0;i<data.length;i++){
                $scope.all_price = data[i].price*data[i].num+$scope.all_price;
            }
        }
    })
    $(".list li").click(function(){
        $("body").css({
            "background":"#ffffff"
        })
    })
    $(".btn").click(function(){
        $("body").css({
            "background":"#ffffff"
        })
    })
})