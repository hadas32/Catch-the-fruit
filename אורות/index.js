let interval = null;
let mark = 0;
let onclick=true;
function displayColor() {
    if(onclick==false){
     document.querySelector("#mark").innerHTML = mark;}
    let rand = getRandomInt(9);
    let boxes = document.querySelectorAll('.box');
    for (let i = 0; i < boxes.length; i++) {
        boxes[i].classList = null;
        if (i === rand) {
            boxes[i].classList.add('box', 'green');
        } else {
            boxes[i].classList.add('box', 'blue');
        }
    }
    onclick=false;
} 
document.querySelector("#btnStart").onclick = changeGame;
document.querySelector("#btnStop").onclick = changeGame;
document.querySelector("#mark").innerHTML = mark;
document.querySelectorAll(".box").forEach((box) => {
  box.addEventListener("click",checkColor);
});
 function checkColor(event){
    onclick=true;
    if(event.currentTarget.classList.contains("blue")){
        mark = mark-5;
    }
    else{
        mark = mark+5;
        clearInterval(interval);
        interval = setInterval(displayColor, 1000);
        displayColor();
    }
    document.querySelector("#mark").innerHTML = mark;
 }
function startGame() {
    interval = setInterval(displayColor, 1000);
}
function StopGame() {
    clearInterval(interval);
}
function changeGame(event){
    if(event.currentTarget.id == "btnStart"){
        startGame();
    }else{
        StopGame();
    }
}
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}