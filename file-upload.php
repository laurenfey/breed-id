<?php
require_once __DIR__ . '/vendor/autoload.php';
use Cloudinary\Cloudinary;

$cloudinary = new Cloudinary();
$uploader = $cloudinary->uploadApi();
$api = $cloudinary->adminApi();

echo json_encode($uploader->upload($_FILES["file"]["tmp_name"]), JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES) . "\n";
// echo json_encode($uploader->upload('uploads/image.jpg'), JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES) . "\n";
// echo json_encode($api->assets(),JSON_PRETTY_PRINT|JSON_UNESCAPED_SLASHES) . "\n";
// $target_dir = "uploads/";
// $target_file = $target_dir . basename($_FILES["file"]["name"]);
// if (move_uploaded_file($_FILES["file"]["tmp_name"], $target_dir."image.jpg")) {
//    $status = 1;
// }
?>
