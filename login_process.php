<?php
 session_start();
 $error='';
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



	/***************************/
	$method = $_SERVER["REQUEST_METHOD"];
	if($method == "POST"){
    		$user = $_POST["user"];
    		$password = $_POST["password"];
// To protect MySQL injection for Security purpose
$user = stripslashes($user);
$password = stripslashes($password);
$user = mysqli_real_escape_string($mysqli,$user);
$password = mysqli_real_escape_string($mysqli,$password);
    		$result = mysqli_query($mysqli,
    				"select * from users where password='$password' AND user='$user'")
    				or die(mysqli_error($mysqli));
    	    $rows = mysqli_num_rows($result);
    		if ($rows == 1) {
    		$arr = array();
            $user_data = $result->fetch_assoc();
            $arr[] = $user_data;
            $_SESSION['login_user']=$arr;
            } else {
            $error = "Username or Password is invalid";
            echo json_encode($error);
            }
    	}

    	$mysqli->close();
 ?>