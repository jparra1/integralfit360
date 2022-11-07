<?php

include '../ApiRest.php';

    header("Access-control-Allow-Origin: *");

        if($_SERVER['REQUEST_METHOD']=='POST'){
            if (isset($_POST["usuario"])) {
                header("HTTP/1.1 200 OK");
                $query="SELECT * FROM usuarios WHERE usuario='".$_POST['usuario']."' AND contraseña ='".$_POST['contraseña']."'";
                $resultado=methodGET($query)->fetch(PDO::FETCH_ASSOC);
                if ($resultado) {
                    echo json_encode(array("usuario"=>"Existente","estatus"=>"Activo","Mensaje"=>"Bienvenido a 360","data_usuario"=>$resultado));
                }else{
                    echo json_encode(array("usuario"=>"No Existente","estatus"=>"Null","Mensaje"=>"Acceso Denegado"));
                }
                exit();
            }
        }
    header("HTTP/1.1 400 Bad Request");
?>