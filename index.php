<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Dog BreedID</title>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <h1>BreedID</h1>

    <p id="status">Awaiting TF.js load</p>

    <?php
      require_once __DIR__ . '/vendor/autoload.php';
      use Cloudinary\Cloudinary;
      use Cloudinary\Tag\ImageTag;
      use Cloudinary\Transformation\Resize;
      use Cloudinary\Transformation\Gravity;
      use Cloudinary\Transformation\FocusOn;
      use Cloudinary\Transformation\RoundCorners;
      use Cloudinary\Transformation\Delivery;
      use Cloudinary\Transformation\Format;

      $cloudinary = new Cloudinary();
      $uploader = $cloudinary->uploadApi();
      $api = $cloudinary->adminApi();

      echo ImageTag::fromParams("fmuzmhqteyb7g2qzwonk", ["id"=>"dogphoto", "crossorigin" => "anonymous"])->resize(Resize::fill()->width(299)->height(299)->gravity(Gravity::focusOn(FocusOn::face())));
    ?>

    <script src="https://unpkg.com/dropzone@5/dist/min/dropzone.min.js"></script>
    <link rel="stylesheet" href="https://unpkg.com/dropzone@5/dist/min/dropzone.min.css" type="text/css" />

    <form action='file-upload.php' class="dropzone" id="upload" name="upload" method="post" enctype="multipart/form-data">
      <p class="dz-message">Drop photo here to upload</p>
    </form>

    <button id="predict" type="button">Predict breed!</button>

    <p id="breed">We think this dog is a... </p>

    <!-- Import TensorFlow.js library -->
    <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@3.11.0/dist/tf.min.js" type="text/javascript"></script>
    <script type="module" src="script.js" defer></script>



  </body>
</html>
