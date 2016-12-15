<?php
    $dbhost = "localhost";
    $dbuser = "root";
    $dbpaass = "";
    $dbname = "chat";
    $store_num = 10;
    $display_num = 10;

    $dbconn = mysql_connect($dbhost, $dbuser, $dbpaass);
    mysql_select_db($dbname, $dbconn);

    // 遍历接收到的json对象，将所有键名设置为同名变量，其值为变量值
    foreach($_POST as $key => $value){
      // 转义 SQL 语句中使用的字符串中的特殊字符,预防数据库攻击
    	$$key = mysql_real_escape_string($value, $dbconn);
    }

    if($action === "postmsg"){
      mysql_query("INSERT INTO `messages`(`user`, `msg`, `time`)
                   VALUES ('$name','$message',".time().")",$dbconn);

      //保证数据库只保留最新的十条信息
      mysql_query("DELETE FROM `messages` WHERE id <=".
                  (mysql_insert_id($dbconn)-$store_num),$dbconn);
    }


    // 是否有新纪录
    $messages = mysql_query("SELECT user,msg
    						 FROM messages
    						 WHERE time > $time
    						 ORDER BY id ASC
    						 LIMIT $display_num",$dbconn);
    if(mysql_num_rows($messages)){
       $msg = [];
        while($message = mysql_fetch_array($messages)){
    		    $msg[$message['user']] = $message['msg'];
        }
        $msg["time"] = time();
        echo json_encode($msg);
    }
?>
