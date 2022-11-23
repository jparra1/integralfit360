<?php
include '../ApiRest.php';

header("Access-control-Allow-Origin: *");
    if($_SERVER['REQUEST_METHOD']=='GET'){
        if (isset($_GET["sesiones_disponibles"])) {
            header("HTTP/1.1 200 OK");
                $query="SELECT * FROM sesiones_disponibles";
                $resultado=methodGET($query)->fetchAll();
                echo json_encode(array("sesiones"=>$resultado));
            exit();
        }
    }
header("HTTP/1.1 400 Bad Request");
?>