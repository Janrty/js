$(function () {
    let wenz=$(".wenz");
    let box1=$(".box1");
    let top=$(".top5>img");

    box1.mouseover(function () {
        $(this).css({background:"#fffff4"})
    })
    box1.mouseout(function () {
        $(this).css({background:"#ffffff"},3000)
    })
    top.mouseover(function () {
        $(this).css({transform:"rotate(360deg)"},2000,function () {
              $(this).css({transform: "scale(1.2,1.2)"})
        })
    })


    function rollOne(){
        $(".picBox").animate({marginLeft:"-320px"},2000,"linear",function(){
            $(this).css({marginLeft:"0px"});
            $(this).children("li").first().remove().clone(true).appendTo(".picBox");
        });
    }
    var startRollOne=setInterval(rollOne,2000);
    $(".xmjs5").hover(function () {
        clearInterval(startRollOne);
    }, function () {
        startRollOne=setInterval(rollOne,2000);
    });


})




