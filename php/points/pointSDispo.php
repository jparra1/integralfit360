<?php
include '../ApiRest.php';

header("Access-control-Allow-Origin: *");

    if($_SERVER['REQUEST_METHOD']=='POST'){
        if (isset($_POST["nueva_sesion"])) {
            $query=" INSERT INTO sesiones_disponibles (
                id_usuario_interno,
                titulo_sesion,
                estado_sesion,
                hora_sesion,
                fecha_sesion) 
                VALUES (
                '".$_POST["id_usuario_interno"]."',
                '".$_POST["titulo_sesion"]."',
                '".$_POST["estado_sesion"]."',
                '".$_POST["hora_sesion"]."',
                '".$_POST["fecha_sesion"]."')";
            $id="SELECT MAX(id_sesion ) as id_sesion  FROM sesiones_disponibles";
            $resultado=methodPOST($query, $id)->fetch(PDO::FETCH_ASSOC);
            echo json_encode(array("sesion"=>"Creada","info"=>$resultado));
            exit();
        }
    }
    if($_SERVER['REQUEST_METHOD']=='GET'){
        if (isset($_GET["id_usuario_interno"])) {
            header("HTTP/1.1 200 OK");
                $query="SELECT * FROM sesiones_disponibles WHERE id_usuario_interno='".$_GET["id_usuario_interno"]."'";
                $resultado=methodGET($query)->fetchAll();
                echo json_encode(array("sesiones"=>$resultado));
            exit();
        }
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