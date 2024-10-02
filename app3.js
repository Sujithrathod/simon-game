let gameseq=[];
let userseq=[];

let btns = ['red','yellow','green','purple'];

let Started = false;
let level = 0;

document.addEventListener("keypress",function(){
    if(Started == false){
        Started = true;
        console.log("game started");
    }
    levelup();

});

let h3 = document.querySelector("h3");

function levelup(){
    userseq = [];
    level++;
    h3.innerText = `Level ${level}`;

    let random = Math.floor(Math.random()*4);
    let randcol = btns[random];
    let randbtn = document.querySelector(`.${randcol}`);
    gameseq.push(randcol);
    console.log(gameseq);
    btnFlash(randbtn);
    maxscore();

}

function btnFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },1000);
}

function userbtnFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    },1000/10);
}

function checkAns(index){
    if (gameseq[index] === userseq[index] ){
        if(userseq.length == gameseq.length){
            setInterval(levelup(),2000);
        }
    }else{
        h3.innerHTML = `Game Over! Your score was <b>${level}</b>.<br> Press any key to start`;
        redCol();
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white";
        },1000/10);
        reset();
    }

}

function btnpress(){
    let btn = this;
    // console.log("button pressed");
    userbtnFlash(btn);

    let usercolor = btn.getAttribute("id");
    userseq.push(usercolor);

    checkAns(userseq.length-1);
}

let altBtns = document.querySelectorAll(".btn");

for(btn of altBtns){
    btn.addEventListener("click",btnpress);
}
function reset(){
    Started = false;
    gameseq = [];
    userseq = [];
    level = 0;

}

function redCol(){
    let redcol = document.querySelector("body");
    redcol.style.backgroundColor = "red";
}

function highScore(){
    let maxscore = 0;
    let maxsc = document.createElement("h4");
    if(userseq.length-1 > maxscore){
        maxscore = userseq.length-1;
    }
    maxsc.innerText = `Max Score is ${maxscore}`;
    h3.append(maxsc);
}