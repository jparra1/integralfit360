<?php
include '../ApiRest.php';

header("Access-control-Allow-Origin: *");
    if($_SERVER['REQUEST_METHOD']=='GET'){
        if (isset($_GET["usuarios_360"])) {
            header("HTTP/1.1 200 OK");
                $query="SELECT * FROM usuarios_interno";
                $resultado=methodGET($query)->fetchAll();
                echo json_encode(array("usuarios"=>$resultado));
            exit();
        }
        if (isset($_GET["usuarios_clientes"])) {
            header("HTTP/1.1 200 OK");
                $query="SELECT * FROM info_usuario";
                $resultado=methodGET($query)->fetchAll();
                echo json_encode(array("usuarios_clientes"=>$resultado));
            exit();
        }
    }
header("HTTP/1.1 400 Bad Request");
?>