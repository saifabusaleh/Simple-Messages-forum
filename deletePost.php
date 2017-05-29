<?php

header('Content-Type: application/json');

	/***************************/
	//this part will be the same on all our server files

	//connecting to the db
	$mysqli = new mysqli(
		"localhost",
		"id1120079_saif",
		"saif123",
		"id1120079_test");

	// check connection
	if ($mysqli->connect_error) {
		die("Connect failed: ".$mysqli->connect_error);
	}
	/***************************/

$method = $_SERVER["REQUEST_METHOD"];
	if($method == "POST"){
	    $name = $_POST["name"];
        $message = $_POST["message"];
        $result = mysqli_query($mysqli,
    				"DELETE from messages where message='$message' AND name='$name'")
    				or die(mysqli_error($mysqli));

	}
	$mysqli->close();
?>