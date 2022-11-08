Dropzone.options.upload = {
  autoProcessQueue: false,
  maxFilesize: 1,
  maxFiles: 1,
  addRemoveLinks: true,
  init: function () {
    var myDropzone = this;

    document.getElementById('predict').addEventListener("click", function (e) {
      e.preventDefault();
      myDropzone.processQueue();
    });

    this.on("complete", function (file) {
      myDropzone.removeFile(file);
      predictBreed();
    });
  }
}

function argMax(array) {
  return [].map.call(array, (x, i) => [x, i]).reduce((r, a) => (a[0] > r[0] ? a : r))[1];
}

const status = document.getElementById('status');
status.innerText = 'Loaded TensorFlow.js - version: ' + tf.version.tfjs;

const BREED_TEXT = document.getElementById('breed');

const model = await tf.loadGraphModel('https://breed-id.herokuapp.com/model_js/model.json');
// const model = await tf.loadGraphModel('http://localhost:8000/model_js/model.json');

async function predictBreed(){
  const photo = document.getElementById('dogphoto');
  const dog = tf.expandDims(tf.browser.fromPixels(photo));
  const dog_scaled = tf.add(tf.div(dog,127.5),-1)
  const breed = await tf.argMax(tf.softmax(model.predict(dog_scaled)),1).array();
  BREED_TEXT.textContent = 'We think this dog is a... ' + breed[0];
}
