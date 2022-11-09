Dropzone.options.upload = {
  autoProcessQueue: false,
  maxFilesize: 25,
  maxFiles: 1,
  addRemoveLinks: true,
  init: function () {
    var myDropzone = this;

    document.getElementById("predict").addEventListener("click", function (e) {
      e.preventDefault();
      myDropzone.processQueue();
    });

    this.on("success", function(file, responseText) {
      myDropzone.removeFile(file);
      predictBreed(responseText);
    });
  }
}

function argMax(array) {
  return [].map.call(array, (x, i) => [x, i]).reduce((r, a) => (a[0] > r[0] ? a : r))[1];
}

const breed_json = '{"0" : "Akita","1" : "Alaskan Malamute","2" : "American Bully","3" : "American English Coonhound","4" : "American Eskimo Dog","5" : "American Foxhound","6" : "American Pit Bull Terrier","7" : "American Staffordshire Terrier","8" : "American Village Dog","9" : "Australian Cattle Dog","10" : "Australian Shepherd","11" : "Basset Hound","12" : "Beagle","13" : "Belgian Malinois","14" : "Bernese Mountain Dog","15" : "Bichon Frise","16" : "Black And Tan Coonhound","17" : "Bloodhound","18" : "Bluetick Coonhound","19" : "Border Collie","20" : "Boston Terrier","21" : "Boxer","22" : "Brittany","23" : "American Bulldog","24" : "English Bulldog","25" : "French Bulldog","26" : "Bullmastiff","27" : "Cane Corso","28" : "Catahoula Leopard Dog","29" : "Cavalier King Charles Spaniel","30" : "Chesapeake Bay Retriever","31" : "Chihuahua","32" : "Chinese Shar Pei","33" : "Chow Chow","34" : "Cocker Spaniel","35" : "Collie","36" : "Dachshund","37" : "Dalmatian","38" : "Doberman Pinscher","39" : "Elkhound","40" : "English Shepherd","41" : "English Springer Spaniel","42" : "German Shepherd","43" : "German Shorthaired Pointer","44" : "Golden Retriever","45" : "Gray Wolf","46" : "Great Dane","47" : "Great Pyrenees","48" : "Havanese","49" : "Kelpie","50" : "Labrador Retriever","51" : "Lhasa Apso","52" : "Llewellin Setter","53" : "Maltese","54" : "Mastiff","55" : "Miniature American Shepherd","56" : "Miniature Pinscher","57" : "Miniature Schnauzer","58" : "Mix","59" : "Mountain Cur","60" : "Neapolitan Mastiff","61" : "Pekingese","62" : "Pembroke Welsh Corgi","63" : "Perro De Presa Canario","64" : "Plott","65" : "Pointer","66" : "Pomeranian","67" : "Poodle","68" : "Miniature Poodle","69" : "Pug","70" : "Rat Terrier","71" : "Redbone Coonhound","72" : "Rottweiler","73" : "Russell Type Terrier","74" : "Saint Bernard","75" : "Samoyed","76" : "Shetland Sheepdog","77" : "Shih Tzu","78" : "Siberian Husky","79" : "Silky Terrier","80" : "Staffordshire Terrier","81" : "Toy Fox Terrier","82" : "Treeing Walker Coonhound","83" : "Weimaraner","84" : "Yorkshire Terrier"}';
const breed_names = JSON.parse(breed_json);

const breed_text = document.getElementById("breed");
const dog_photo = document.getElementById("dogphoto");

const model = await tf.loadGraphModel("https://breed-spot.herokuapp.com/model_js/model.json");
// const model = await tf.loadGraphModel("http://localhost:8000/model_js/model.json");

async function predictBreed(image_id){
  dog_photo.setAttribute("src", "https://res.cloudinary.com/diee73kqp/image/upload/c_fill,g_face,h_299,w_299/" + image_id);
  dog_photo.onload = async () => {
    const dog = tf.expandDims(tf.browser.fromPixels(dog_photo));
    const dog_scaled = tf.add(tf.div(dog,127.5),-1)
    const breed = await tf.argMax(tf.softmax(model.predict(dog_scaled)),1).array();
    breed_text.textContent = breed_names[breed[0]];
  }
}
