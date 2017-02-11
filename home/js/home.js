/**
 * Created by Administrator on 2016/12/28.
 */
angular.module("HomePage",[])
.controller("homeCtrl",function($scope,$http){
    $http.get("json/datu-nav.json").success(function(data){
        console.log(data.data.carousel)
        $scope.bigImg = data.data.carousel;
        $scope.navImg = data.data.recommendedContent[0].items;
    })
    $http.get("json/api.json").success(function(data){
        console.log(data.data.acts)
        $scope.imgLink = data.data.acts;
        $scope.imgLink1 = data.data.acts[6].items[0].imgUrl;
    });
// 大图滚动
    var mySwiper = new Swiper('.swiper-container', {
        loop: true,
        autoplay: 1000,
        observer: true,
        observeParents: true,
        // 如果需要分页器
        pagination: '.swiper-pagination'
    })

})

