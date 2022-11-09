<!DOCTYPE html>
<html lang="en">
  <head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>BreedReader</title>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <h1>BreedReader</h1>

    <!-- Import TensorFlow.js library -->
    <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@3.11.0/dist/tf.min.js" type="text/javascript"></script>
    <script type="module" src="script.js" defer></script>

    <!-- Import Dropzone -->
    <script src="https://unpkg.com/dropzone@5/dist/min/dropzone.min.js"></script>
    <link rel="stylesheet" href="https://unpkg.com/dropzone@5/dist/min/dropzone.min.css" type="text/css">

    <p> BreedReader can guess your dog's breed from just a picture! </p>

    <form action="file-upload.php" class="dropzone" id="upload" name="upload" method="post" enctype="multipart/form-data">
      <p class="dz-message">Upload a photo</p>
    </form> <br>

    <button id="predict" type="button" style="display: block; margin: 0 auto;"> Predict Breed </button> <br>

    <img crossorigin="anonymous" id="dogphoto" tag="img"> <br>
    <p id="breed"> </p>

  </body>
</html>
