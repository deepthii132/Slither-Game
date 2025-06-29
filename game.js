// game constants and variables
let inputDir={x:0, y:0};
const move_sound=new Audio("eat.mp3");
const eat_sound=new Audio("eat.mp3");
const over_sound=new Audio("game over.mp3");
let speed=5;
let lastPaintTime=0;
// in js x axis is on the top left to top right and y axis moves from top to bottom
let snakeArr=[{x:13,y:15}];
food={x:6,y:7};
let score=0;
// const playarea = document.getElementById("playarea");
// const scorebox = document.getElementById("scorebox");
// const highscorebox = document.getElementById("highscorebox");


//game function
function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime-lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime=ctime;
    gameEngine();
}
function collide(snake){
    //if the snake bumps into itself
    for(let i=1;i<snakeArr.length;i++){
        if(snake[i].x===snake[0].x && snake[i].y===snake[0].y){
            return true;
        }
    }
    //if you bump into the wall
    if(snake[0].x>=18 || snake[0].x<=0 || snake[0].y>=18 || snake[0].y<=0){
        return true;
    }
    return false;
}
function gameEngine(){
    if(collide(snakeArr)){
        over_sound.play();
        inputDir={x:0,y:0};
        alert("Game over! (Press ctrl+r to refresh the game)");
        snakeArr=[{x:13,y:15}];
        score=0;
    }
    //if you have eaten the food, regenerate the food
    if(snakeArr[0].y===food.y && snakeArr[0].x===food.x){
        eat_sound.play();
        score++;
        if(score>highscoreval){
            highscoreval=score;
            localStorage.setItem("HighScore",JSON.stringify(highscoreval));
            highscorebox.innerHTML="High Score: "+highscoreval;
        }
        scorebox.innerHTML="Score: "+score;
        snakeArr.unshift({x:snakeArr[0].x+inputDir.x,y:snakeArr[0].y+inputDir.y});
        let a=2;
        let b=16;
        food={x: Math.round(a+(b-a)*Math.random()),y: Math.round(a+(b-a)*Math.random())};
    }
    //moving snake
    for(let i=snakeArr.length-2;i>=0;i--){
        snakeArr[i+1]={...snakeArr[i]};
    }
    snakeArr[0].x+=inputDir.x;
    snakeArr[0].y+=inputDir.y;
    //display snake
    playarea.innerHTML="";
    snakeArr.forEach((e,index)=>{
        let snakeElement=document.createElement('div');
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;
    if(index==0){
        snakeElement.classList.add('head');
    }else{
        snakeElement.classList.add('snake');
    }
    playarea.appendChild(snakeElement);
    });

    //display food
    let foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    playarea.appendChild(foodElement);
}
//main logic
let HighScore=localStorage.getItem("HighScore");
if(HighScore===null){
    highscoreval=0;
    localStorage.setItem("HighScore",JSON.stringify(highscoreval))
}else{
    highscoreval=JSON.parse(HighScore);
    highscorebox.innerHTML="High Score: "+HighScore;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    inputDir={x:0,y:1};
    switch (e.key) {
        case "ArrowUp":
            console.log("arrow Up");
            inputDir.x=0;
            inputDir.y=-1;
            break;
        case "ArrowDown":
            console.log("arrow Down");
            inputDir.x=0;
            inputDir.y=1;
            break;
        case "ArrowLeft":
            console.log("arrow Left");
            inputDir.x=-1;
            inputDir.y=0;
            break;
        case "ArrowRight":
            console.log("arrow Right");
            inputDir.x=1;
            inputDir.y=0;
            break;
    
        default:
            break;
    }
})