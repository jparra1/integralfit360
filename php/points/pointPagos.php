<?php

include '../ApiRest.php';

    header("Access-control-Allow-Origin: *");

        if($_SERVER['REQUEST_METHOD']=='POST'){
            if (isset($_POST["tiempo_comprado"])) {
                header("HTTP/1.1 200 OK");
                $query="SELECT * FROM info_usuario WHERE id_usuario='".$_POST['id_usuario']."'";
                $resultado=methodGET($query)->fetch(PDO::FETCH_ASSOC);
                if ($resultado) {
                    $query=" INSERT INTO pagos (
                    id_usuario,
                    tiempo_comprado,
                    tipo_plan,
                    fecha_pago) 
                    VALUES (
                    '".$_POST["id_usuario"]."',
                    '".$_POST["tiempo_comprado"]."',
                    '".$_POST["tipo_plan"]."',
                    '".$_POST["fecha_pago"]."')";
                    $id="SELECT MAX(id_pago) as id_pago  FROM pagos";
                    $resultado=methodPOST($query, $id)->fetch(PDO::FETCH_ASSOC);
                    echo json_encode(array("usuario"=>"Registrado","info"=>$resultado));
                    $query="UPDATE info_usuario SET plan_adquirido='".$_POST["tipo_plan"]."' WHERE id_usuario='".$_POST["id_usuario"]."'";
                    $resultado=methodPUT($query);
                }else{
                    echo json_encode(array("pago"=>"Usuario no Existe","estatus"=>"Null"));
                }
                exit();
            }
        }
            
        
    header("HTTP/1.1 400 Bad Request");
?>
