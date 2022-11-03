<?php
  // The global $_POST variable allows you to access the data sent with the POST method by name
  // To access the data sent with the GET method, you can use $_GET
  $user_name = htmlspecialchars($_POST['user_name']);
  echo Your name is $user_name;
?>
