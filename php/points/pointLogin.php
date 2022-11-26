<?php

include '../ApiRest.php';

    header("Access-control-Allow-Origin: *");

        if($_SERVER['REQUEST_METHOD']=='POST'){
            if (isset($_POST["email_usuario"])) {
                header("HTTP/1.1 200 OK");
                $query="SELECT * FROM info_usuario WHERE email_usuario='".$_POST['email_usuario']."' AND password_usuario ='".$_POST['password_usuario']."'";
                $resultado=methodGET($query)->fetch(PDO::FETCH_ASSOC);
                if ($resultado) {
                    session_start();
                    $_SESSION['estado']='activo';
                    $_SESSION['info']=$resultado;
                    echo json_encode(array("usuario"=>"Existente","estatus"=>"Activo","data_usuario"=>$resultado));
                }else{
                    $query="SELECT * FROM usuarios_interno WHERE usuario='".$_POST['email_usuario']."' AND contraseña ='".$_POST['password_usuario']."'";
                    $resultado=methodGET($query)->fetch(PDO::FETCH_ASSOC);
                    if ($resultado) {
                        session_start();
                        $_SESSION['estado']='activo';
                        $_SESSION['info']=$resultado;
                        echo json_encode(array("usuario"=>"Existente","estatus"=>"Entrenador","data_usuario"=>$resultado));
                    }else{
                        echo json_encode(array("usuario"=>"No Existente","estatus"=>"Null"));
                    }
                }
                exit();
            }
        }
            
        
    header("HTTP/1.1 400 Bad Request");
?>