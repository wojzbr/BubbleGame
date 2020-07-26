let btn = document.getElementById('randomButton');
let rst = document.getElementById('reset');
let counter = document.getElementById('counter');
let timer = document.getElementById('timer');
let tpScr = document.getElementById('top-score');

let count = 0;
let topScore = 0;
let set = false;
let screenWidth = window.innerWidth;
let screenHeight = window.innerHeight;

btn.innerHTML=`Catch Me!`;
tpScr.innerHTML = `TOP SCORE: ${topScore}`;

handleClick = () => { /*handles click event*/
    genRndmBtn();
    count++;
    if (!set){
        rst.removeEventListener('click', reset);
        rst.style.cursor = 'default';
        setTimer();
        set = true;
    }
}

getTopScore = (score) => {
    if (score>topScore) {
        tpScr.innerHTML = `TOP SCORE: ${score}`;
        topScore = score;
    }
};

reset = () => {
    set=false;
    count=0;
    btn.innerHTML=`Catch Me!`;
    btn.style.width = `100px`;
    btn.style.height = `100px`;
    btn.style.fontSize=`18px`;
    btn.style.left = `45%`;
    btn.style.top = `200px`;
    btn.style.backgroundColor = "rgb(64,224,208)";
    timer.innerText = "TIME: 5";
    btn.addEventListener('click', handleClick);
    rst.style.cursor = 'default';
    btn.style.cursor = 'pointer'; //
}

genRndmBtn = () => { /*Generates new button with random color, position and size*/
    btn.style.backgroundColor=`rgb(${genRndmClr()},${genRndmClr()},${genRndmClr()})`;
    let circleSize = genRndmSize();
    btn.style.left = `${genRndmPstn("left", circleSize)}px`;
    btn.style.top = `${genRndmPstn("top", circleSize)}px`;
    
    btn.style.width = `${circleSize}px`;
    btn.style.height = `${circleSize}px`;
    btn.style.fontSize=`${0.18*circleSize}px`;
}

genRndmSize = () => {
    return Math.floor(Math.random() * 280)+20;
}

genRndmClr = () => { //Random Color
    return Math.floor(Math.random() * 255);
}

genRndmPstn = (leftOrTop, bubbleDiameter) => { //Random position
    let randomPosition;
    if (leftOrTop=="left"){ //Check if the dimension is from left or from top
        randomPosition = Math.floor(Math.random() * screenWidth); //assign random valiue to randomPosition
        if (randomPosition + bubbleDiameter > screenWidth) {    //Check if a bubble rendered at randomPosition exceeds the screen dimension
            return screenWidth-bubbleDiameter; //if it exeeds, then just render it as far as possible without exeeding
        }
        else return randomPosition; //if it doesn't exeed, return it at randomPosition
    }
    if (leftOrTop=="top") { //same as above
        randomPosition = Math.floor(Math.random() * screenHeight);
        if (randomPosition + bubbleDiameter > screenHeight) {
            return screenHeight-bubbleDiameter;
        }
        else return randomPosition;
    }
}

btn.addEventListener('click', handleClick);

rst.addEventListener('click', reset);



setTimer = () => { /*Timer for right upper corner*/
    let seconds = 5;
    var interval;
    interval = setInterval(function(){
        seconds--;
        timer.innerText=seconds;
        if (!seconds){
            clearInterval(interval);
            getTopScore(count);
            btn.style.height="200px";
            btn.style.width="200px";
            btn.style.left=`${screenWidth/2-100}px`;
            btn.style.top=`${screenHeight/2-100}px`;
            btn.style.fontSize="30px";
            btn.innerHTML=`Time's up!<br>Your score: ${count}`;
            btn.removeEventListener('click', handleClick);
            rst.addEventListener('click', reset);
            btn.style.cursor = 'default';
            rst.style.cursor = 'pointer';
        }
    },1000)
}

document.getElementById('height-test').style.height=`${screenHeight}`