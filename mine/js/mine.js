/**
 * Created by Administrator on 2016/12/30.
 */
app.controller("mineCtrl",function($scope,$http){
    $scope.bol = false;
    $(".down").click(function(){
        $scope.bol = ! $scope.bol;
        $(this).parent().next().slideToggle();

        if( $scope.bol){
            $(this).css({"transform":"rotateZ(180deg)"});
        }else{
            $(this).css({"transform":"rotateZ(0deg)"});
        }
    })
    $(".member_down").click(function(){
        $scope.bol = ! $scope.bol;
        $(this).parent().children().eq(3).slideToggle();
        if( $scope.bol){
            $(this).css({"transform":"rotateZ(270deg)"});
        }else{
            $(this).css({"transform":"rotateZ(90deg)"});
        }
    })
})