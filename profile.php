<?php
include('session.php');
	$method = $_SERVER["REQUEST_METHOD"];
	if($method == "GET"){ //select
			echo json_encode($login_session);
		}
?>