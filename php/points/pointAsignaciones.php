<?php

include '../ApiRest.php';

    header("Access-control-Allow-Origin: *");

        if($_SERVER['REQUEST_METHOD']=='POST'){
            if (isset($_POST["tipo_asignacion"])) {
                header("HTTP/1.1 200 OK");
                $query="SELECT * FROM asignaciones_a_usuarios WHERE id_usuario_asignado='".$_POST['id_usuario_asignado']."'";
                $resultado=methodGET($query)->fetch(PDO::FETCH_ASSOC);
                if ($resultado) {
                    $textSQL="";
                    if ($_POST["tipo_asignacion_usuario"]=="SPORT") {
                        $textSQL="contenido1_asignacion='".$_POST["contenido1_asignacion"]."'";
                    }elseif ($_POST["tipo_asignacion_usuario"]=="HEALTH") {
                        $textSQL="contenido2_asignacion='".$_POST["contenido2_asignacion"]."'";
                    }else {
                        header("HTTP/1.1 400 Bad Request");
                        exit();
                    }
                    $query="UPDATE asignaciones_a_usuarios SET 
                    ".$textSQL.",
                    tipo_asignacion='".$_POST["tipo_asignacion"]."',
                    id_user_interno='".$_POST["id_user_interno"]."',
                    comentarios_asignacion='".$_POST["comentarios_asignacion"]."' 
                    WHERE id_usuario_asignado='".$_POST["id_usuario_asignado"]."'";
                    $resultado=methodPUT($query);

                    echo json_encode(array("asignacion"=>"realizada","info"=>$resultado));
                    exit();

                } else {
                    $query=" INSERT INTO asignaciones_a_usuarios (
                        id_usuario_asignado ,
                        tipo_asignacion,
                        id_user_interno,
                        contenido1_asignacion,
                        contenido2_asignacion,
                        comentarios_asignacion,
                        fecha_asignacion,
                        estado_asignacion) 
                        VALUES (
                        '".$_POST["id_usuario_asignado"]."',
                        '".$_POST["tipo_asignacion"]."',
                        '".$_POST["id_user_interno"]."',
                        '".$_POST["contenido1_asignacion"]."',
                        '".$_POST["contenido2_asignacion"]."',
                        '".$_POST["comentarios_asignacion"]."',
                        '".$_POST["fecha_asignacion"]."',
                        '".$_POST["estado_asignacion"]."')";
                    $id="SELECT MAX(id_asignacion) as id_asignacion FROM asignaciones_a_usuarios";
                    $resultado=methodPOST($query, $id)->fetch(PDO::FETCH_ASSOC);
                    echo json_encode(array("asignacion"=>"realizada","info"=>$resultado));
                    exit();
                }
            }
        }
        if($_SERVER['REQUEST_METHOD']=='GET'){
            if (isset($_GET["id_usuario"])) {
                header("HTTP/1.1 200 OK");
                    $query="SELECT * FROM asignaciones_a_usuarios WHERE id_usuario_asignado='".$_GET["id_usuario"]."'";
                    $resultado=methodGET($query)->fetchAll();
                    if ($resultado) {
                        echo json_encode(array("estado"=>"Con sesiones","sesiones"=>$resultado));
                    }else {
                        echo json_encode(array("estado"=>"Sin sesiones"));
                    }
                exit();
            }else{
                header("HTTP/1.1 200 OK");
                    $query="SELECT * FROM asignaciones_a_usuarios ";
                    $resultado=methodGET($query)->fetchAll();
                    echo json_encode(array("sesiones"=>$resultado));
                exit();
            }
        }
            
        
    header("HTTP/1.1 400 Bad Request");
?>
;