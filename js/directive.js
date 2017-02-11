/**
 * Created by Administrator on 2017/2/8.
 */
angular.module("DirectiveModule",[])
//    home页面添加
    .directive("myTouch",function($http){
        return{
            link:function(scope,element,attr){
                element.click(function(){
                    var imgUrl = $(this).parents('li').find('img').attr("src");
                    var name = $(this).parents('li').children().eq(1).html();
                    var market_price = $(this).parents('li').find(".market-price").html();
                    var price = $(this).parents('li').find('.price1').html();
                    var num = 1;
                    var url = "/add?img="+imgUrl+"&name="+name+"&price="+price+"&market_price="+market_price+"&num="+num+"&bol="+false;
                    $http.get(url).success(function(data){
                        if(data.err>0){
                            console.log(data.msg)
                        }else{
                            console.log(data);
                            var number = $(".buy_num").html();
                            number++;
                            $(".buy_num").html(number);
                        }
                    })
                })
            }
        }
    })
//    购物车加加
    .directive("addNum",function($http){
        return{
            link:function(scope,element,attr){
                element.click(function(){
                    var This = $(this);
                    scope.$apply();
                    var price = $(this).parents('dt').find(".shop_order_one_money").html();
                    var _id = $(this).parents('li').attr("data_id");
                    var num = $(this).siblings(".order_num").html();
                    var url = "/addNum?_id="+_id+"&num="+num;
                    var Bol = $(this).parents('li').find(".shop_order_one input").prop("checked");
                    if(Bol){
                        price_extend($http,price,false)
                    }
                    $http.get(url).success(function(data){
                        if(data.err){
                            console.log(data.msg)
                        }else{
                            num++;
                            This.siblings(".order_num").html(num);
                            var num1 = $(".buy_num").html();
                            num1++;
                            $(".buy_num").html(num1)
                        }
                    })
                })
            }
        }
    })
    .directive("myMinus",function($http){
        return{
            link:function(scope,element,attr){
                element.click(function(){
                    scope.$apply();
                    var This = $(this);
                    var price = $(this).parents('dt').find(".shop_order_one_money").html();
                    var _id = $(this).parents('li').attr("data_id");
                    var num = $(this).next(".order_num").html();
                    var Bol = $(this).parents('li').find(".shop_order_one input").prop("checked");
                    if(num<=1){
                        if(confirm('是否删除该商品')){
                            var url = "/rm?_id="+_id;
                            $http.get(url).success(function(data){
                                if(data.err){
                                    console.log(data.msg)
                                }else{
                                    This.next(".order_num").html(0);
                                    This.parents('li').remove();
                                    var num1 = $(".buy_num").html();
                                    num1--;
                                    $(".buy_num").html(num1);
                                }
                            })
                        }
                    }else{
                        var url = "/minus?_id="+_id+"&num="+num;
                        $http.get(url).success(function(data){
                            if(data.err){
                                console.log(data.msg)
                            }else{
                                var num1 = $(".buy_num").html();
                                num--;
                                num1--;
                                $(".buy_num").html(num1)
                                This.next(".order_num").html(num);
                                if(Bol){
                                    price_extend($http,price,true)
                                }

                            }
                        })
                    }
                })
            }
        }
    })
    .directive("allOrcan",function($http){
        return{
            link:function(scope,element,attr){
                element.click(function(){
                    var price = 0;
                    var allCheck = $(this).prop('checked');
                    if(allCheck){
                       angular.element('input[type=checkbox]').prop('checked',true);
                       price_extend($http,price,true)
                    }else{
                        angular.element('input[type=checkbox]').prop('checked',false)
                        $(".count_money").html(0)
                    }
                    angular.forEach(scope.data,function(data,index,array){
                        data.bol = allCheck;
                    })

                })
            }
        }
    })
    .directive("oneCheck",function($http){
        return{
            link:function(scope,element,attr){
                element.click(function(){
                    var sss = $(".shop_order_one input").length;
                    console.log(sss)
                    var This = this;
                    scope.$apply();
                    var totalprices = 0;
                    var bol = $(this).prop("checked");
                    if(bol){
                        angular.forEach($(".shop_order_one input"),function(data,index,array){
                            console.log(data)
                            if($(data).prop("checked") != true){
                                sss++
                            }
                        })
                        if(sss == $(".shop_order_one input").length){
                            $(".count_all input").prop("checked",true);
                        }
                    }else{
                        totalprices = 0;
                        $(".count_all input").prop("checked",false)
                    }
                    var bb = 0;
                    angular.forEach($(".shop_order_one input"),function(data,index,array){
                        if($(data).prop("checked")==true){
                            bb++;
                            var oneprice = $(data).parents('li').find(".shop_order_one_money").html();
                            var num = $(data).parents('li').find(".order_num").html()
                            totalprices = totalprices + num*oneprice;
                            $(".count_money").html(totalprices.toFixed(2));
                        }
                    })
                    if(bb == 0){
                        $(".count_money").html(0);
                    }
                })
            }
        }
    })
    .directive("tabPage",function(){
        return{
            link:function(scope,element,attr){
                element.click(function(){
                    var index = $("nav ul li").index(this);
                    var _id = $(this).attr("id");
                    angular.forEach($("nav ul li"),function(data,index,array){
                        $(data).removeClass("on")
                    })
                    $(this).addClass("on")
                    if(index==0){
                        $("#scroller").show();
                    }else{
                        $("#scroller").hide();
                        angular.forEach($(".item-top"),function(data,index,array){
                            if($(data).attr("parentid") == _id){
                                $(data).show();
                            }else{
                                $(data).hide();
                            }
                        })
                        angular.forEach($(".class-item ul li"),function(data,index,array){
                            $(data).hide();
                        })
                        for(var i=(index-1)*10;i<(index-1)*10+10;i++){
                            $(".class-item ul li").eq(i).show();
                        }
                    }
                })
            }
        }
    })
function price_extend($http,price,bol){
    $http.get("/shuju").success(function(data){
        if(data.err){
            console.log(data.msg)
        }else{
            var allprice = 0;
            for(var i=0;i<data.length;i++){
                allprice = data[i].price*data[i].num+allprice;
            }
            if(bol){
                allprice = parseFloat(allprice)-parseFloat(price);
                console.log(allprice)
                $(".count_money").html(allprice.toFixed(2))
            }else{
                allprice = parseFloat(allprice)+parseFloat(price);
//                console.log(allprice)
                $(".count_money").html(allprice.toFixed(2))
            }
        }
    })
}
