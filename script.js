let btn = document.getElementById('randomButton');
let count = 0;
let counter = document.getElementById('counter');
let timer = document.getElementById('timer');
let set = false;
let screenWidth = screen.width - 400;
let screenHeight = screen.height - 400;
btn.innerHTML=`Catch Me!`;

handleClick = () => { /*handles click event*/
    genRndmBtn();
    count++;
    if (!set){
        setTimer();
        set = true;
    }
}

genRndmBtn = () => { /*Generates new button with random color, position and size*/
    btn.style.backgroundColor=`rgb(${genRndmClr()},${genRndmClr()},${genRndmClr()})`;
    btn.style.left = `${genRndmPstn("left")}px`;
    btn.style.top = `${genRndmPstn("top")}px`;
    let circleSize = genRndmSize();
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
        return Math.floor(Math.random() * screenWidth);
    }
    if (leftOrTop=="top") {
        return Math.floor(Math.random() * screenHeight);
    }
}

btn.addEventListener('click', handleClick);

setTimer = () => { /*Timer for right upper corner*/
    let seconds = 5;
    var interval;
    interval = setInterval(function(){
        seconds--;
        timer.innerText=seconds;
        if (!seconds){
            clearInterval(interval);
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
