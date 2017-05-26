<?php
session_start();// Starting Session
if(isset($_SESSION['login_user']) && !empty($_SESSION['login_user'])) {
$login_session=$_SESSION['login_user'];
} else {
$login_session = "";
}
?>