var loading_text;
var calculating_text;

Dropzone.options.upload = {
  autoProcessQueue: false,
  maxFilesize: 25,
  maxFiles: 1,
  addRemoveLinks: true,
  acceptedFiles: "image/*",
  init: function () {
    var myDropzone = this;

    document.getElementById("predict").addEventListener("click", function (e) {
      e.preventDefault();
      if(myDropzone.getQueuedFiles().length > 0){
        dog_photo.setAttribute("src", "");
        clearInterval(loading_text);
        clearInterval(calculating_text);
        loading_text = uploadingText();
      }
      myDropzone.processQueue();
    });

    this.on("success", function(file, responseText) {
      clearInterval(loading_text);
      clearInterval(calculating_text);
      calculating_text = calculatingText();
      myDropzone.removeFile(file);
      predictBreed(responseText);
    });
  }
}

const breed_json = '{"0" : "an Akita","1" : "an Alaskan Malamute","2" : "an American Bully","3" : "an American English Coonhound","4" : "an American Eskimo Dog","5" : "an American Foxhound","6" : "an American Pit Bull Terrier","7" : "an American Staffordshire Terrier","8" : "an American Village Dog","9" : "an Australian Cattle Dog","10" : "an Australian Shepherd","11" : "a Basset Hound","12" : "a Beagle","13" : "a Belgian Malinois","14" : "a Bernese Mountain Dog","15" : "a Bichon Frise","16" : "a Black And Tan Coonhound","17" : "a Bloodhound","18" : "a Bluetick Coonhound","19" : "a Border Collie","20" : "a Boston Terrier","21" : "a Boxer","22" : "a Brittany","23" : "an American Bulldog","24" : "an English Bulldog","25" : "a French Bulldog","26" : "a Bullmastiff","27" : "a Cane Corso","28" : "a Catahoula Leopard Dog","29" : "a Cavalier King Charles Spaniel","30" : "a Chesapeake Bay Retriever","31" : "a Chihuahua","32" : "a Chinese Shar Pei","33" : "a Chow Chow","34" : "a Cocker Spaniel","35" : "a Collie","36" : "a Dachshund","37" : "a Dalmatian","38" : "a Doberman Pinscher","39" : "an Elkhound","40" : "an English Shepherd","41" : "an English Springer Spaniel","42" : "a German Shepherd","43" : "a German Shorthaired Pointer","44" : "a Golden Retriever","45" : "a Gray Wolf","46" : "a Great Dane","47" : "a Great Pyrenees","48" : "a Havanese","49" : "a Kelpie","50" : "a Labrador Retriever","51" : "a Lhasa Apso","52" : "a Llewellin Setter","53" : "a Maltese","54" : "a Mastiff","55" : "a Miniature American Shepherd","56" : "a Miniature Pinscher","57" : "a Miniature Schnauzer","58" : "a Mix","59" : "a Mountain Cur","60" : "a Neapolitan Mastiff","61" : "a Pekingese","62" : "a Pembroke Welsh Corgi","63" : "a Perro De Presa Canario","64" : "a Plott","65" : "a Pointer","66" : "a Pomeranian","67" : "a Poodle","68" : "a Miniature Poodle","69" : "a Pug","70" : "a Rat Terrier","71" : "a Redbone Coonhound","72" : "a Rottweiler","73" : "a Russell Type Terrier","74" : "a Saint Bernard","75" : "a Samoyed","76" : "a Shetland Sheepdog","77" : "a Shih Tzu","78" : "a Siberian Husky","79" : "a Silky Terrier","80" : "a Staffordshire Terrier","81" : "a Toy Fox Terrier","82" : "a Treeing Walker Coonhound","83" : "a Weimaraner","84" : "a Yorkshire Terrier"}';
const breed_names = JSON.parse(breed_json);

const breed_text = document.getElementById("breed");
const dog_photo = document.getElementById("dogphoto");

var model = null;

async function predictBreed(image_id){
  if(!model){
    model = await tf.loadGraphModel("https://breed-spot.herokuapp.com/model_js/model.json");
  }
  dog_photo.setAttribute("src", "https://res.cloudinary.com/diee73kqp/image/upload/c_fill,g_face,h_299,w_299/" + image_id);
  breed_text.textContent = "";
  dog_photo.onload = async () => {
    const dog = tf.expandDims(tf.browser.fromPixels(dog_photo));
    const dog_scaled = tf.add(tf.div(dog,127.5),-1);
    const prob = await tf.softmax(model.predict(dog_scaled));
    const prob_array = await prob.array();
    const prob_unsrt = prob_array[0].map((x) => x);
    const prob_sort = prob_array[0].sort(function(a,b){return b-a;});
    clearInterval(loading_text);
    clearInterval(calculating_text);
    breed_text.textContent = breed_names[prob_unsrt.indexOf(prob_sort[0])].split(" ").slice(1).join(" ");
    if(prob_sort[0] < 0.75){
      if(prob_sort[2] > 0.3){
        breed_text.textContent = "Most likely " + breed_names[prob_unsrt.indexOf(prob_sort[0])] + " or " + breed_names[prob_unsrt.indexOf(prob_sort[1])] + ".";
      }
      else if(prob_sort[2] > 0.2){
        breed_text.textContent = "Most likely " + breed_names[prob_unsrt.indexOf(prob_sort[0])] + ", but could also be " + breed_names[prob_unsrt.indexOf(prob_sort[1])] + " or " + breed_names[prob_unsrt.indexOf(prob_sort[2])] + ".";
      }
      else{
        breed_text.textContent = "Most likely " + breed_names[prob_unsrt.indexOf(prob_sort[0])] + ", but could also be " + breed_names[prob_unsrt.indexOf(prob_sort[1])] + ".";
      }
    }
  }
}

function uploadingText(){
  var count = 0;
  return setInterval(function(){
    count++;
    var dots = new Array(count % 4 + 1).join('.');
    document.getElementById('breed').textContent = "Uploading" + dots;
  }, 500);
}

function calculatingText(){
  var count = 0;
  return setInterval(function(){
    count++;
    var dots = new Array(count % 4 + 1).join('.');
    document.getElementById('breed').textContent = "Calculating" + dots;
  }, 500);
}
