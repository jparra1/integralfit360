<?php

include '../ApiRest.php';

    header("Access-control-Allow-Origin: *");

        if($_SERVER['REQUEST_METHOD']=='POST'){
            if (isset($_POST["email_usuario"])) {
                header("HTTP/1.1 200 OK");
                $query="SELECT * FROM info_usuario WHERE email_usuario='".$_POST['email_usuario']."'";
                $resultado=methodGET($query)->fetch(PDO::FETCH_ASSOC);
                if (!$resultado) {
                    $query=" INSERT INTO  info_usuario (
                    nombre_usuario,
                    apellido_usuario,
                    email_usuario,
                    password_usuario,
                    edad_usuario,
                    genero_usuario,
                    peso_usuario,
                    estatura_usuario,
                    observaciones_usuario) 
                    VALUES (
                    '".$_POST["nombre_usuario"]."',
                    '".$_POST["apellido_usuario"]."',
                    '".$_POST["email_usuario"]."',
                    '".$_POST["password_usuario"]."',
                    '".$_POST["edad_usuario"]."',
                    '".$_POST["genero_usuario"]."',
                    '".$_POST["peso_usuario"]."',
                    '".$_POST["estatura_usuario"]."',
                    '".$_POST["observaciones_usuario"]."')";
                    $id="SELECT MAX(id_usuario ) as id_usuario FROM info_usuario";
                    $resultado=methodPOST($query, $id)->fetch(PDO::FETCH_ASSOC);
                    echo json_encode(array("usuario"=>"Registrado","info"=>$resultado));
                }else{
                    echo json_encode(array("usuario"=>"Ya Existente","estatus"=>"Null"));
                }
                exit();
            }
        }
            
        
    header("HTTP/1.1 400 Bad Request");
?>


