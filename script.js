
/* ==========================
   SCREEN NAVIGATION
========================== */

const screens = document.querySelectorAll(".screen");

function showScreen(id){
    screens.forEach(screen=>{
        screen.classList.remove("active");
    });

    document.getElementById(id).classList.add("active");
}

/* ==========================
   START BUTTON
========================== */

const startBtn = document.getElementById("startBtn");

if(startBtn){
    startBtn.addEventListener("click",()=>{

        const music = document.getElementById("bgMusic");

        if(music){
            music.volume = 0.4;

            music.play().catch(()=>{
                console.log("Music autoplay blocked.");
            });
        }

        showScreen("mapScreen");
    });
}

/* ==========================
   LEVEL CARDS
========================== */

document.querySelectorAll(".level-card").forEach(card=>{

    card.addEventListener("click",()=>{

        const level = card.dataset.level;

        if(level==="heart"){
            showScreen("heartLevel");
        }

        if(level==="memory"){
            showScreen("memoryLevel");
        }

        if(level==="quiz"){
            showScreen("quizLevel");
            loadQuestion();
        }

        if(level==="garden"){
            showScreen("gardenLevel");
        }

        if(level==="final"){
            showScreen("finalLevel");
        }
    });

});

/* ==========================
   BACK BUTTONS
========================== */

document.querySelectorAll(".backBtn").forEach(btn=>{

    btn.addEventListener("click",()=>{
        showScreen("mapScreen");
    });

});

/* ==========================
   FLOATING HEARTS
========================== */

const heartContainer = document.getElementById("heartContainer");

function createFloatingHeart(){

    if(!heartContainer) return;

    const heart = document.createElement("div");

    heart.className = "floating-heart";
    heart.innerHTML = ["💖","💕","💗","❤️"][Math.floor(Math.random()*4)];

    heart.style.left = Math.random()*100 + "vw";

    heart.style.animationDuration =
        (6 + Math.random()*5) + "s";

    heart.style.fontSize =
        (16 + Math.random()*24) + "px";

    heartContainer.appendChild(heart);

    setTimeout(()=>{
        heart.remove();
    },11000);
}

setInterval(createFloatingHeart,700);

/* ==========================
   HEART GAME
========================== */

const gameArea = document.getElementById("heartGameArea");
const heartScore = document.getElementById("heartScore");

let score = 0;

function spawnHeart(){

    if(!gameArea) return;

    const heart = document.createElement("div");

    heart.className = "game-heart";
    heart.innerHTML = "💖";

    heart.style.left =
        Math.random()*(gameArea.clientWidth-50) + "px";

    heart.style.top =
        Math.random()*(gameArea.clientHeight-50) + "px";

    heart.addEventListener("click",()=>{

        score++;

        if(heartScore){
            heartScore.innerHTML =
                "Hearts: " + score;
        }

        heart.remove();
    });

    gameArea.appendChild(heart);

    setTimeout(()=>{
        heart.remove();
    },1800);
}

if(gameArea){

    setInterval(()=>{

        const active =
            document.getElementById("heartLevel")
            .classList.contains("active");

        if(active){
            spawnHeart();
        }

    },800);

}

/* ==========================
   QUIZ
========================== */

const questions = [

{
question:"What's my favorite thing about you?",
answers:[
"Your smile",
"Your voice",
"Your kindness",
"EVERYTHING ❤️"
],
correct:3
},

{
question:"What's our favorite thing to do together?",
answers:[
"Call",
"Watch movies",
"Play games",
"Spend time with each other ❤️"
],
correct:3
},

{
question:"How many kids are we gonna habeee 😋😋",
answers:[
"4 Kids",
"2 Kids",
"One twin and one boy and a girl ❤️"
],
correct:2
},

{
question:"When did we have our first kiss?",
answers:[
"While walking",
"Movies ❤️",
"School"
],
correct:1
}

];

let currentQuestion = 0;

const questionText =
document.getElementById("questionText");

const answersContainer =
document.getElementById("answers");

const quizResult =
document.getElementById("quizResult");

function loadQuestion(){

    if(!questionText) return;

    if(currentQuestion >= questions.length){

        questionText.innerHTML =
        "You completed the quiz, Rene ❤️";

        answersContainer.innerHTML = "";

        quizResult.innerHTML =
        "Perfect score in my heart 💖";

        return;
    }

    const q = questions[currentQuestion];

    questionText.innerHTML = q.question;

    answersContainer.innerHTML = "";

    q.answers.forEach((answer,index)=>{

        const btn =
        document.createElement("button");

        btn.className = "answer-btn";

        btn.innerHTML = answer;

        btn.addEventListener("click",()=>{

            if(index === q.correct){

                quizResult.innerHTML =
                "Correct ❤️";

                currentQuestion++;

                setTimeout(()=>{
                    quizResult.innerHTML="";
                    loadQuestion();
                },1000);

            }else{

                quizResult.innerHTML =
                "hehe try again Rene 😋";

            }

        });

        answersContainer.appendChild(btn);

    });

}

/* ==========================
   FLOWER GARDEN
========================== */

const flowerArea =
document.getElementById("flowerArea");

const flowerMessage =
document.getElementById("flowerMessage");

const flowerMessages = [

"I love your smile ❤️",
"You are my comfort 🌸",
"Forever my Bbyy 💖",
"You make me happy 🥰",
"I choose you every day ❤️",
"My favorite person 🌷",
"You mean the world to me 💕"

];

function createFlower(){

    if(!flowerArea) return;

    const flower =
    document.createElement("div");

    flower.className = "flower";

    flower.innerHTML = "🌷";

    flower.style.left =
        Math.random()*
        (flowerArea.clientWidth-50)+"px";

    flower.style.top =
        Math.random()*
        (flowerArea.clientHeight-50)+"px";

    flower.addEventListener("click",()=>{

        const msg =
        flowerMessages[
            Math.floor(
                Math.random()*flowerMessages.length
            )
        ];

        flowerMessage.innerHTML = msg;

        flower.remove();
    });

    flowerArea.appendChild(flower);

    setTimeout(()=>{
        flower.remove();
    },3000);
}

if(flowerArea){

    setInterval(()=>{

        const active =
        document.getElementById("gardenLevel")
        .classList.contains("active");

        if(active){
            createFlower();
        }

    },1200);

}

/* ==========================
   FINAL LETTER
========================== */

const openLetterBtn =
document.getElementById("openLetterBtn");

const letterBox =
document.getElementById("letterBox");

if(openLetterBtn){

    openLetterBtn.addEventListener("click",()=>{

        letterBox.style.display = "block";

        openLetterBtn.style.display = "none";

    });

}

/* ========================== FIREWORKS + CONFETTI ========================== */

 const canvas = document.getElementById("celebrationCanvas"); 

const ctx = canvas.getContext("2d"); 

canvas.width = innerWidth; 
canvas.height = innerHeight; 

window.addEventListener("resize",()=>{

canvas.width=innerWidth; 
canvas.height=innerHeight; 

}); 

let particles=[]; 


function launchFirework(){ 

const x=Math.random()*canvas.width; 

const y=Math.random()*canvas.height*0.5+80; 

for(let i=0;i<80;i++){ 

particles.push({ 

x:x, 

y:y, 

dx:(Math.random()-0.5)*10, 

dy:(Math.random()-0.5)*10, 

life:100, 

size:2+Math.random()*4, 

color:`hsl(${Math.random()*360},100%,60%)` 

}); 


} 


} 

function animateFireworks(){ 

ctx.clearRect(0,0,canvas.width,canvas.height); 

particles.forEach((p,index)=>{ 

p.x+=p.dx; 

p.y+=p.dy; 

p.dy+=0.05; 

p.life--; 

ctx.beginPath(); 

ctx.fillStyle=p.color; 

ctx.arc(p.x,p.y,p.size,0,Math.PI*2); 

ctx.fill(); 

if(p.life<=0){ 

particles.splice(index,1); 

} 

}); 

requestAnimationFrame(animateFireworks); 

} 

animateFireworks(); 

setInterval(()=>{ 

if(document.getElementById("endingScreen").classList.contains("active")){ 

launchFirework(); 

} 

},600);


function confettiBurst(){ 

for(let i=0;i<180;i++){ 

const piece=document.createElement("div"); 

piece.innerHTML=Math.random()>0.5?"💖":"🎉"; 

piece.style.position="fixed"; 

piece.style.left=Math.random()*100+"vw"; 

piece.style.top="-50px"; 

piece.style.fontSize=(18+Math.random()*20)+"px"; 

piece.style.pointerEvents="none"; 

piece.style.transition= 
(3+Math.random()*2)+"s linear"; 

piece.style.zIndex=9999; 

document.body.appendChild(piece); 

setTimeout(()=>{ 

piece.style.transform= 
`translateY(${window.innerHeight+100}px) 
rotate(${Math.random()*1080}deg)`; 

piece.style.opacity=0; 

},50); 

setTimeout(()=>{ 

piece.remove(); 

},6000); 

}

}

/* ==========================
   YES BUTTON
========================== */

const yesBtn =
document.getElementById("yesBtn");

if(yesBtn){

    yesBtn.addEventListener("click",()=>{

        showScreen("endingScreen");

        confettiBurst(); 

        for(let i=0;i<15;i++){ 
              
        setTimeout(launchFirework,i*500); 
} 
          
        const message=document.createElement("div"); 

        message.className="celebrationMessage"; 

        message.innerHTML=` 

     <h1>💖 I LOVE YOU RENE 💖</h1> 

<p> 
Forever My Bbyy ❤️ 
</p>

 `; 

document.body.appendChild(message); 

    });
        
}

  
