<?php
include '../ApiRest.php';

header("Access-control-Allow-Origin: *");
    if($_SERVER['REQUEST_METHOD']=='GET'){
        if (isset($_GET["info_session"])) {
            header("HTTP/1.1 200 OK");
            session_start();
            if(count($_SESSION)==0){
                session_destroy();
                echo json_encode(array("estado"=>"No session"));
            }else {
                echo json_encode($_SESSION);
            }

            exit();
        }
        if (isset($_GET["close_session"])) {
            header("HTTP/1.1 200 OK");
            session_start();
            session_destroy();
            echo json_encode(array("estado"=>"Session Cerrada"));
            exit();

        }
    }
header("HTTP/1.1 400 Bad Request");
?>