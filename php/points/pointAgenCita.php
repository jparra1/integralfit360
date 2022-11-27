<?php

include '../ApiRest.php';

    header("Access-control-Allow-Origin: *");

        if($_SERVER['REQUEST_METHOD']=='POST'){
            if (isset($_POST["url_sesion_meet"])) {
                header("HTTP/1.1 200 OK");
                $query="SELECT * FROM sesiones_disponibles WHERE id_sesion='".$_POST['id_sesion']."' AND estado_sesion='DISPONIBLE'";
                $resultado=methodGET($query)->fetch(PDO::FETCH_ASSOC);
                if ($resultado) {
                    $query=" INSERT INTO sesiones_agendadas (
                        id_sesion,
                        id_usuario,
                        url_sesion_meet,
                        estado_sesion) 
                        VALUES (
                        '".$_POST["id_sesion"]."',
                        '".$_POST["id_usuario"]."',
                        '".$_POST["url_sesion_meet"]."',
                        '".$_POST["estado_sesion"]."')";
                    $id="SELECT MAX(id_sesion_agendada) as id_sesion_agendada FROM sesiones_agendadas";
                    $resultado=methodPOST($query, $id)->fetch(PDO::FETCH_ASSOC);
                    echo json_encode(array("sesion"=>"Agendada","info"=>$resultado));
                    $query="UPDATE sesiones_disponibles SET estado_sesion='"."ASIGNADA"."' WHERE id_sesion ='".$_POST["id_sesion"]."'";
                    $resultado=methodPUT($query);
                }else{
                    echo json_encode(array("sesion"=>"error"));
                }
                exit();
            }
        }
        if($_SERVER['REQUEST_METHOD']=='GET'){
            if (isset($_GET["id_usuario"])) {
                header("HTTP/1.1 200 OK");
                    $query="SELECT * FROM sesiones_agendadas WHERE id_usuario='".$_GET["id_usuario"]."'";
                    $resultado=methodGET($query)->fetchAll();
                    if ($resultado) {
                        echo json_encode(array("estado"=>"Con sesiones","sesiones"=>$resultado));
                    }else {
                        echo json_encode(array("estado"=>"Sin sesiones"));
                    }
                exit();
            }else{
                header("HTTP/1.1 200 OK");
                $query="SELECT * FROM sesiones_agendadas";
                $resultado=methodGET($query)->fetchAll();
                echo json_encode(array("estado"=>"Con sesiones","sesiones"=>$resultado));

                exit();
            }
        }
            
        
    header("HTTP/1.1 400 Bad Request");
?>
