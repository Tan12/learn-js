$(function () {
    var timestamp = 0,
        $content = $('.content'),
        $name = $('.name');

    updateMsg();

    $('input').focus(function(){
      $(this).siblings("span").text("");
    });

   $('.send').click(function () {
     if($name.val()===''){
       $('.nameEmpty').text("请输入姓名！");
       return false;
     }else {
       $('.nameEmpty').text("");
     }
     if($content.val()===''){
       $('.contentEmpty').text("请输入内容！");
       return false;
     }else {
       $('.contentEmpty').text("");
     }

     $.ajax({
         type: "POST",
         url: "backend.php",
         data: {
           "message" : $content.val(),
           "name" : $name.val(),
           "time" : timestamp,
           "action" : "postmsg"
         },
         success: addMessages,
         dataType: "json"
      });
      return false;
   });

   function addMessages(data) {
     //console.log(data);
     $('.loading').remove();
     for(key in data){
       if(key !== 'time'){
         $('.messageWindow').append("<p><span>"+ key +": </span>"+ data[key] +"</p>");
       }
       timestamp = data["time"];
     }
   }

   function updateMsg() {
     $.ajax({
         type: "POST",
         url: "backend.php",
         data: {
           "time" : timestamp,
           "action" : "getmsg"
         },
         success: addMessages,
         dataType: "json"
      });
    setTimeout(updateMsg, 2000);
   }
});
