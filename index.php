<!DOCTYPE html>
<html lang="en">
  <head> <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>SPOT</title>
    <link rel="icon" type="image/x-icon" href="paw.svg">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="style.css">
  </head>
  <header>
    <h1>Spot</h1>
    <img src="paw.svg" class="filter-white" style="float: right; height: 45px;">
  </header>
  <body>
    <!-- Import TensorFlow.js library -->
    <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@3.11.0/dist/tf.min.js" type="text/javascript"></script>
    <script type="module" src="script.js" defer></script>

    <!-- Import Dropzone -->
    <script src="https://unpkg.com/dropzone@5/dist/min/dropzone.min.js"></script>
    <link rel="stylesheet" href="https://unpkg.com/dropzone@5/dist/min/dropzone.min.css" type="text/css">

    <p> Spot is a neural network that can guess your dog's breed from just a picture. </p>

    <form action="file-upload.php" class="dropzone" id="upload" name="upload" method="post" enctype="multipart/form-data">
      <p class="dz-message">Upload a photo here</p>
    </form> <br>

    <button id="predict" type="button" style="display: block; margin: 0 auto;"> Click to Predict </button> <br>

    <img crossorigin="anonymous" id="dogphoto" tag="img"> <br>
    <p id="breed"> </p> <br>

    <p style="font-size:70%"";> Click <a href="https://github.com/laurenfey/spot" target="_blank">here</a> to learn how this model was developed. </p>

  </body>
</html>
