let btn = document.getElementById('randomButton');
let rst = document.getElementById('reset');
let counter = document.getElementById('counter');
let timer = document.getElementById('timer');
let tpScr = document.getElementById('top-score');

let count = 0;
let topScore = 0;
let set = false;
let screenWidth = screen.width;
let screenHeight = screen.height;

btn.innerHTML=`Catch Me!`;
tpScr.innerHTML = `TOP SCORE: ${topScore}`;

handleClick = () => { /*handles click event*/
    genRndmBtn();
    count++;
    if (!set){
        setTimer();
        set = true;
    }
}

getTopScore = (score) => {
    if (score>topScore) {
        tpScr.innerHTML = `TOP SCORE: ${score} height ${screen.height} width ${screen.width}`;
        topScore = score;
    }
};

genRndmBtn = () => { /*Generates new button with random color, position and size*/
    btn.style.backgroundColor=`rgb(${genRndmClr()},${genRndmClr()},${genRndmClr()})`;
    let circleSize = genRndmSize();
    btn.style.left = `${genRndmPstn("left")}px`;
    btn.style.top = `${genRndmPstn("top")}px`;
    
    btn.style.width = `${circleSize}px`;
    btn.style.height = `${circleSize}px`;
    btn.style.fontSize=`${0.18*circleSize}px`;
}

genRndmSize = () => {
    return Math.floor(Math.random() * 280)+20;
}

genRndmClr = () => { /*Random Color*/
    return Math.floor(Math.random() * 255);
}

genRndmPstn = (leftOrTop) => { /*Random position*/
    if (leftOrTop=="left"){
        return Math.floor(Math.random() * (screen.width*0.7));
    }
    if (leftOrTop=="top") {
        return Math.floor(Math.random() * (screen.height*0.7));
    }
}

btn.addEventListener('click', handleClick);

rst.addEventListener('click', function(){
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
})

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
        }
    },1000)
}
