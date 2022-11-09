<?php
  require_once __DIR__ . "/vendor/autoload.php";
  use Cloudinary\Cloudinary;

  $cloudinary = new Cloudinary();
  $uploader = $cloudinary->uploadApi();
  $api = $cloudinary->adminApi();

  $uploaded = $uploader->upload($_FILES["file"]["tmp_name"], array("format" => 'jpg'));

  echo $uploaded["public_id"];
?>
