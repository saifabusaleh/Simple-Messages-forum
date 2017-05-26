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



	/***************************/
	//for each object, we'll create a save/retrieve function with post/get

	$method = $_SERVER["REQUEST_METHOD"];
	if($method == "GET"){ //select

		$user1 = $_GET["user"];
    	$password1 = $_GET["password"];
    	echo $user1 + " " + $password1;
		$arr = array();
		if ($select = $mysqli->query("SELECT * FROM users")) {
			while($row = $select->fetch_assoc()) {
				$arr[] = $row;
			}
			echo json_encode($arr);
		}
	}
	else if($method == "POST"){ //insert
		$user = $_POST["user"];
		$password = $_POST["password"];
		$password_hashed = password_hash($password, PASSWORD_DEFAULT);
		$email = $_POST["email"];

		mysqli_query($mysqli,
				"INSERT INTO users VALUES('$user', '$password_hashed','$email', 0)")
				or die(mysqli_error($mysqli));
		echo "ok";
	}

	/***************************/
	$mysqli->close();
?>
