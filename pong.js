const canvas= document.getElementById("pong");
const ctx= canvas.getContext('2d');

let newImage = new Image();
newImage.src = 'images/game boy.png'



let hit = new Audio();
let bounce = new Audio();

bounce.src="sounds/bounce.wav"
hit.src = "sounds/playclick.wav";


// When it loads
newImage.onload = () => {
    // Draw the image onto the context
    ctx.drawImage(newImage, 0, 0, 800, 500);
}
const ball={
    x:canvas.width/2,
    y:canvas.height/2,
    radius:10,
    speed:8,
    velocityX:5,
    velocityY:5,
    color:"WHITE"
}

const user={
    x:0,
    y:(canvas.height-100)/2,
    width: 10,
    height:100,
    color:"WHITE",
    score:0
}

const com={
    x:canvas.width-10,
    y:(canvas.height-100)/2,
    width: 10,
    height:100,
    color:"WHITE",
    score:0
}

const net={
    x:(canvas.width-2)/2,
    y:0,
    width:2,
    height:10,
    color:"WHITE"
}

function drawrect(x,y,w,h,color)
{
    ctx.fillStyle=color;
    ctx.fillRect(x,y,w,h);
}

function drawcircle(x,y,r,color){
    ctx.fillStyle=color;
    ctx.beginPath();
    ctx.arc(x,y,r,0,Math.PI*2,true);
    ctx.closePath()
    ctx.fill();
}


canvas.addEventListener("mousemove",getMousePos);

function getMousePos(evt){
    let rect=canvas.getBoundingClientRect();
    user.y=evt.clientY - rect.top - user.height/2;

}

function resetBall()
{
    ball.x=canvas.width/2;
    ball.y=canvas.height/2;
    ball.velocityX=-ball.velocityX;
    ball.speed=7;
}

function drawnet(){
    for(let i=0;i<=canvas.height;i+=15){
        drawrect(net.x,net.y+i,net.width,net.height,net.color);
    }
}



function drawtext(text,x,y){
    ctx.fillStyle="#ff8c00";
    ctx.font="75px fantasy";
    ctx.fillText(text,x,y);
}


function collision(b,p){
    p.top=p.y;
    p.bottom=p.y+p.height;
    p.left=p.x;
    p.right=p.x+p.width;

    b.top=b.y-b.radius;
    b.bottom=b.y+b.radius;
    b.left=b.x-b.radius;
    b.right=b.x+b.radius;

    return (b.right>p.left && b.bottom>p.top && b.left<p.right && b.top<p.bottom);
}


function update(){

    if(ball.x-ball.radius<0){
        com.score++;
        resetBall();
    }
    else if(ball.x+ball.radius>canvas.width){
        user.score++;
        resetBall();
    }

    ball.x += ball.velocityX;
    ball.y += ball.velocityY;

    com.y += ((ball.y-(com.y+com.height/2)))*0.1;

    if( ball.y + ball.radius > canvas.height || ball.y-ball.radius<0){
        ball.velocityY= -ball.velocityY;
    }

    let player=(ball.x+ball.radius < canvas.width/2)? user: com;

    if(collision(ball, player))
    {
        bounce.play();
        let collidePoint=(ball.y-(player.y+player.height/2)); 
        collidePoint=collidePoint/(player.height/2);

        let anglerad=(Math.PI/4)*collidePoint;

        let direction=(ball.x+ball.radius<canvas.width/2)?1:-1;
        ball.velocityX=direction*ball.speed*Math.cos(anglerad);
        ball.velocityY=ball.speed*Math.sin(anglerad);
        ball.speed+=0.1;

    }
}
// drawcircle(ball.x,ball.y,ball.r,ball.color);

// drawtext(user.score,canvas.width/4, canvas.height/5,"WHITE");

// drawtext(com.score,3*canvas.width/4, canvas.height/5,"WHITE");

function render(){
    drawrect(0,0,canvas.width, canvas.height,"#000");
    drawtext(user.score,canvas.width/4, canvas.height/5);
    drawtext(com.score,3*canvas.width/4, canvas.height/5);
    drawnet();
    drawrect(user.x,user.y,user.width,user.height,user.color);
    drawrect(com.x,com.y,com.width,com.height,com.color);
    drawcircle(ball.x,ball.y,ball.radius,ball.color);
}
    window.onload = function()  
    {  
        player = document.getElementById('pong');  
        document.getElementById('play').addEventListener('click', function(){  
            hit.play();
            let framePerSecond =50;
            let loop= setInterval(game, 1000/framePerSecond);
            document.getElementById('play').style.display = 'none';
        });   
        // document.getElementById('Stop').addEventListener('click', function()
        // {
        // player.pause();  
        // player.currentTime = 0;  
        // });  
    }  
    function game(){
        update();
        render();
    }

   



