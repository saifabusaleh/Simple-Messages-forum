<?php
$method = $_SERVER["REQUEST_METHOD"];
	if($method == "GET"){
	session_start();
	session_unset();
	if(session_destroy()) // Destroying All Sessions
    {
    $_SESSION = [];
        echo json_encode("Logged out successfully");
    }
}

?>