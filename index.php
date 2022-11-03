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

    <img id="photo" src="image.jpg"></img>

    <script src="https://unpkg.com/dropzone@5/dist/min/dropzone.min.js"></script>
    <link rel="stylesheet" href="https://unpkg.com/dropzone@5/dist/min/dropzone.min.css" type="text/css" />

    <form action="/file-upload.php" class="dropzone"></form>

    <form action="/my-handling-form-page.php" method="post">
      <ul>
        <li>
          <label for="name">Name:</label>
          <input type="text" id="name" name="user_name" />
        </li>
        <div>
          <button>Submit</button>
        </div>
      </ul>
    </form>

    <button id="predict" type="button">Predict breed!</button>

    <p id="breed">We think this dog is a... </p>

    <!-- Import TensorFlow.js library -->
    <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@3.11.0/dist/tf.min.js" type="text/javascript"></script>

    <script type="module" src="script.js" defer></script>
  </body>
</html>
