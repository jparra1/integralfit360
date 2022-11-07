<?php

include 'php/ApiRest.php';

    header("Access-control-Allow-Origin: *");

        if($_SERVER['REQUEST_METHOD']=='POST'){
            if (isset($_POST["newUsuario"])) {
                header("HTTP/1.1 200 OK");
                $query="SELECT * FROM usuarios WHERE usuario='".$_POST['newUsuario']."'";
                $resultado=methodGET($query)->fetch(PDO::FETCH_ASSOC);
                if (!$resultado) {
                    $query="INSERT INTO  usuarios (usuario,contraseña,nombre) VALUES ('".$_POST["newUsuario"]."','".$_POST["contraseña"]."','".$_POST["nombre"]."')";
                    $id="SELECT MAX(id_usuario) AS id_usuario FROM usuarios";
                    $resultado=methodPOST($query, $id);
                    $info=$resultado->fetch(PDO::FETCH_ASSOC);
                    echo json_encode(array("estatus"=>"Creado con exito","id_usuario"=>$info["id_usuario"]));
                }else{
                    echo json_encode(array("estatus"=>"Ya existe"));
                }
                exit();
            }
        }
    header("HTTP/1.1 400 Bad Request");
?>