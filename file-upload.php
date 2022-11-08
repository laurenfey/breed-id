<?php
  require_once __DIR__ . '/vendor/autoload.php';
  use Cloudinary\Cloudinary;

  $cloudinary = new Cloudinary();
  $uploader = $cloudinary->uploadApi();
  $api = $cloudinary->adminApi();

  $uploaded = $uploader->upload($_FILES["file"]["tmp_name"]);
  // $uploaded = $uploader->upload('uploads/image.jpg');

  $dom = new DOMDocument();
  $dom->loadHTMLFile("index.php");

  $img = $dom->getElementByID("dogphoto");
  $img->setAttribute('src', "https://res.cloudinary.com/diee73kqp/image/upload/c_fill,g_face,h_299,w_299/" . $uploaded["public_id"]);
  echo "https://res.cloudinary.com/diee73kqp/image/upload/c_fill,g_face,h_299,w_299/" . $uploaded["public_id"];

  $content = $dom->saveHTMLFile("index.php");
?>
