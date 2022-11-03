Dropzone.options.upload = {
  maxFilesize: 250,
  filesizeBase: 1000,
  maxFiles: 4,
};

function argMax(array) {
  return [].map.call(array, (x, i) => [x, i]).reduce((r, a) => (a[0] > r[0] ? a : r))[1];
}

const status = document.getElementById('status');
status.innerText = 'Loaded TensorFlow.js - version: ' + tf.version.tfjs;

document.getElementById("predict").onclick = predictBreed;

const BREED_TEXT = document.getElementById('breed');
const model = await tf.loadGraphModel('http://localhost:3000/model_js/model.json');

async function predictBreed(){
  const photo = document.getElementById('photo');
  const dog = tf.expandDims(tf.image.resizeBilinear(tf.browser.fromPixels(photo),[299,299]));
  const dog_scaled = tf.add(tf.div(dog,127.5),-1)
  const breed = await tf.argMax(tf.softmax(model.predict(dog_scaled)),1).array();
  BREED_TEXT.textContent = 'We think this dog is a...' + breed[0];
}
