
const API_KEY = "ba389ae2f86adb8a3c8cd2fe7b4fb47f"

const weather = document.querySelector(".js-weather");



const COORDS = 'coords';



function getWeather(lat, lng){
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
    ).then(function(response){
        return response.json();
    }).then(function(json){
        const Temperature =  json.main.temp;
        const place = json.name;
        weather.innerText = `${Temperature} @ ${place}`;
    });
}


function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj))
}


// 좌표 가져오는 것을 성공했을 때 시행
function handleGeoSuccess(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude)
}

// 좌표 가져오는데 에러났을 때 시행
function handleGeoError(){
    console.log("can't access geo location")
}


function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError)
}



function loadCoords(){
    const loadedCorrds = localStorage.getItem(COORDS);
    if(loadedCorrds === null) {
        askForCoords();
    } else {
        const parseCoords = JSON.parse(loadedCorrds)
        getWeather(parseCoords.latitude, parseCoords.longitude)
    }
}

const body = document.querySelector("body");

const IMG_NUMBER = 3;

function paintImage(imgNumber) {
  const image = new Image();
  image.src = `images/${imgNumber + 1}.jpg`;
  image.classList.add("bgImage");
  body.prepend(image);
}

function genRandom() {
  const number = Math.floor(Math.random() * IMG_NUMBER);
  return number;
}


function init(){
    loadCoords();
    const randomNumber = genRandom();
    paintImage(randomNumber);
}

init();