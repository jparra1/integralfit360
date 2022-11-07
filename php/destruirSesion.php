<?php
    session_start();
    $_SESSION['estado']='off';
    session_destroy();
    echo json_encode($_SESSION);
?>