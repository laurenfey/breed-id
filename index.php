<!DOCTYPE html>
<html lang="en">
  <head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Dog BreedID</title>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <h1>BreedID</h1>

    <!-- Import TensorFlow.js library -->
    <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@3.11.0/dist/tf.min.js" type="text/javascript"></script>
    <script type="module" src="script.js" defer></script>

    <!-- Import Dropzone -->
    <script src="https://unpkg.com/dropzone@5/dist/min/dropzone.min.js"></script>
    <link rel="stylesheet" href="https://unpkg.com/dropzone@5/dist/min/dropzone.min.css" type="text/css">

    <p id="status">Awaiting TF.js load</p>

    <form action="file-upload.php" class="dropzone" id="upload" name="upload" method="post" enctype="multipart/form-data">
      <p class="dz-message">Drop photo here to upload</p>
    </form>

    <button id="predict" type="button">Predict breed!</button>

    <img src="https://res.cloudinary.com/diee73kqp/image/upload/c_fill,g_face,h_299,w_299/kxvwr96x3sv8cdrmsbgg" crossorigin="anonymous" id="dogphoto" tag="img">

    <p id="breed">We think this dog is a... </p>
  </body>
</html>
