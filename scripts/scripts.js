var memeImages;
var currentMeme;

function generateMemes() {

  var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      storeResponse(JSON.parse(xhttp.responseText));
    }
  };

  xhttp.open("GET", "https:www.reddit.com/r/dankmemes/.json?&show=all&limit=100", true);
  xhttp.send(null);
} //generateMemes() bracket end

generateMemes();

function storeResponse(json){
  let imageType;
  memeImages = [];
  currentMeme = 0;

  for(let i = 0, x = json.data.children.length; i < x; i++){

    imageType = json.data.children[i].data.url.slice(-3);

    if(imageType === "jpg" || imageType === "png") {
      memeImages.push(json.data.children[i].data.url);
    }
  }
    document.getElementById("meme").src = memeImages[currentMeme];
}

// Function that fires when right arrow is clicked
function nextMeme(){
  currentMeme += 1;
  if(currentMeme > 0){
    document.querySelector(".left-arrow").className = "left-arrow button";
  }else if(currentMeme === 0){
    document.querySelector(".left-arrow").className = "left-arrow button none";
  }
  document.getElementById("meme").src = memeImages[currentMeme];

  if(currentMeme === memeImages.length){
    document.getElementById("meme").src = "https://cdn.meme.am/instances/500x/11194231.jpg";
    document.querySelector(".right-arrow").className = "right-arrow button none";
  } else if(currentMeme !== memeImages.length){
    document.querySelector(".right-arrow").className = "right-arrow button";
  }
}

// Function that fires when left arrow is clicked
function prevMeme(){
  currentMeme -= 1;
  if(currentMeme > 0){
    document.querySelector(".left-arrow").className = "left-arrow button";
  }else if(currentMeme === 0){
    document.querySelector(".left-arrow").className = "left-arrow button none";
  }

if(currentMeme !== memeImages.length){
    document.querySelector(".right-arrow").className = "right-arrow button";
  }

  document.getElementById("meme").src = memeImages[currentMeme];
}
