// game constants and variables

const score = document.querySelector(".score");
const startScreen = document.querySelector(".startScreen");
const gameArea = document.querySelector(".gameArea");

let player = { speed:5, score:0 };
let keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false,
};

//functions

function start() {
  // gameArea.classList.remove("hide");
  startScreen.classList.add("hide");
  score.classList.remove('hide')
  gameArea.innerHTML =""

 

  player.start = true;
  player.score = 0;
  window.requestAnimationFrame(gamePlay);

  for (x = 0; x < 6; x++) {
    let roadLine = document.createElement("div");
    roadLine.classList.add("lines");
    roadLine.y = x * 150;
    roadLine.style.top = roadLine.y + "px";
    console.log(roadLine.y);
    gameArea.appendChild(roadLine);
  }

  let car = document.createElement("div");
  car.classList.add("car");
  // car.innerText = 'hey this is car'
  gameArea.appendChild(car);

  player.x = car.offsetLeft;
  player.y = car.offsetTop;


  //enemyCars
  for (x = 0; x < 3; x++) {
    let enemyCars = document.createElement("div");
    enemyCars.classList.add("enemyCars");
     enemyCars.y = ((x * 1) * 350) * -1;
    enemyCars.style.top = enemyCars.y + "px";
    enemyCars.style.backgroundColor = randomColor();
    enemyCars.style.left = Math.floor(Math.random() * 350) + "px"
    gameArea.appendChild(enemyCars);
  }
  
}

function endGame(){
  player.start = false;
  startScreen.classList.remove('hide');
  startScreen.innerHTML = "Game Over <br> Your Score is " + player.score +  "<br> Press Here To Restart The Game. "
}


function moveEnemyCars(car){
  let enemy = document.querySelectorAll('.enemyCars');

   enemy.forEach(function(item){

    if(isCollide(car, item)){
      endGame();
    }
      if(item.y >750){
          item.y = -300
          item.style.left = Math.floor(Math.random() * 350) + "px"
          }
          
  
     item.y += player.speed;
     item.style.top = item.y + "px";
    
})
   
}


function isCollide(a,b){
aRect = a.getBoundingClientRect();
bRect = b.getBoundingClientRect();
return !((aRect.bottom < bRect.top) || (aRect.top > bRect.bottom)||
  (aRect.right < bRect.left )  ||  (aRect.left > bRect.right))                                              
}

function moveLines() {
  let lines = document.querySelectorAll(".lines");
  lines.forEach(function (item) {
    if(item.y > 700){
      item.y -= 750
    }
    item.y += player.speed;
    item.style.top = item.y + "px";
  });
}



function gamePlay() {
  let car = document.querySelector(".car");
  let road = gameArea.getBoundingClientRect();
  // console.log(road);
  if (player.start) {
    //moving logic
    moveLines();
    moveEnemyCars(car);
    if (keys.ArrowUp && player.y > road.top + 70) {
      player.y -= player.speed;
    }
    if (keys.ArrowDown && player.y < road.bottom - 80) {
      player.y += player.speed;
    }
    if (keys.ArrowLeft && player.x > 0) {
      player.x -= player.speed;
    }
    if (keys.ArrowRight && player.x < road.width - 63) {
      player.x += player.speed;
    }

    car.style.top = player.y + "px";
    car.style.left = player.x + "px";

    window.requestAnimationFrame(gamePlay);
 
    // score = document.getElementsByClassName('score');
   
 
    player.score++;
    ps = player.score -1;
    score.innerText= "score: "+ ps; 
     
  }
}

function randomColor (){
  function c(){
    let hex = Math.floor(Math.random()*256).toString(16);
    return ("0"+ String(hex)).substr(-2);
  }
 return  "#"+c()+c()+c()
}


startScreen.addEventListener("click", start);

document.addEventListener(
  "keydown",
  (keyDown = (e) => {
    e.preventDefault();
    keys[e.key] = true;
    // console.log(keys);
  })
);

document.addEventListener(
  "keyup",
  (keyUp = (e) => {
    e.preventDefault();
    keys[e.key] = false;
  })
);
