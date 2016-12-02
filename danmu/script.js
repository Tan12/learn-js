/**
 * Created by Administrator on 2016/12/2 0002.
 */
$(document).ready(function () {
   var arr = [],
       $message = $('.message'),
       $txt = $('.txt'),
       $topMin = $message.offset().top,
       $topMax = $message.height() + $topMin,
       $top = $topMin;

    $('.submit').click(function () {
        if($txt.val()){
            arr.push($txt.val());
            $txt.val('');
            console.log(arr);
        }
        if(arr.length > 0){
            var $dm = $("<p></p>");
            $dm.text(arr.shift());
            moveObi($dm);
            $message.append($dm);
        }
    });

    $('.clear').click(function () {
       $message.empty();
    });

    var moveObi = function(obj){
        var $left = $message.width(),
            $time = 10000 + 10000 * Math.random();
        $top += 50;
        if($top > ($topMax - 50)){
            $top = $topMin;
        }
        obj.css({
            left : $left+'px',
            top : $top+'px',
            color : randomColor()
        });
        obj.animate({
            left : $message.offset().left+'px'
        }, $time, function () {
            obj.fadeOut();
        });

    };

    var randomColor = function(){
        return '#'+(Math.random()*0xffffff<<0).toString(16);
        /*
        另外一种实现随机颜色的方法
        return '#' + (function(h) {
                return new Array(7 - h.length).join("0") + h;
            })((Math.random() * 0x1000000 << 0).toString(16));
        */
    }

});