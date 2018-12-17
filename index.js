
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var ballRadius = 10;
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;
var rightPressed = false;
var leftPressed = false;
var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var score = 0;
var lives = 3
 
 var bricks = [];
 for(var c=0; c<brickColumnCount; c++) {
     bricks[c] = [];
     for(var r=0; r<brickRowCount; r++) {
         bricks[c][r] = { x: 0, y: 0, status: 1 };
     }
 }
 
 document.addEventListener("keydown", keyDownHandler, false);
 document.addEventListener("keyup", keyUpHandler, false);
 document.addEventListener("mousemove",mouseMoveHandler, false);
 
 function keyDownHandler(e) {
     if(e.keyCode == 39) {
         rightPressed = true;
     }
     else if(e.keyCode == 37) {
         leftPressed = true;
     }
 }
 function keyUpHandler(e) {
     if(e.keyCode == 39) {
         rightPressed = false;
     }
     else if(e.keyCode == 37) {
         leftPressed = false;
     }
 }

 function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX <canvas.width) {
        paddleX = relativeX - paddleWidth/2;
    }
 }
 
 function drawBall() {
     ctx.beginPath();
     ctx.arc(x, y, ballRadius, 0, Math.PI*2);
     ctx.fillStyle = "grey";
     ctx.fill();
     ctx.closePath();
 }
 function drawPaddle() {
     ctx.beginPath();
     ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
     ctx.fillStyle = "blue";
     ctx.fill();
     ctx.closePath();
 }
 function drawBricks() {
     for(var c=0; c<brickColumnCount; c++) {
         for(var r=0; r<brickRowCount; r++) {
         	if(bricks[c][r].status == 1){
             var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
             var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
             bricks[c][r].x = brickX;
             bricks[c][r].y = brickY;
             ctx.beginPath();
             ctx.rect(brickX, brickY, brickWidth, brickHeight);
             if(r==0){ctx.fillStyle = "red"};
             if(r==1){ctx.fillStyle = "yellow"};
             if(r==2){ctx.fillStyle = "green"};
             ctx.fill();
             ctx.closePath();
         	}
         }
     }
 }

function drawScore() {
	ctx.font = "16px Arial";
	ctx.fillStyle = "grey";
	ctx.fillText("Score: "+score, 8, 20); 
}

function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "red";
    ctx.fillText("Lives: "+lives, canvas.width-65, 20);
}
 
 function collisionDetection(){
 	for(var c=0; c<brickColumnCount; c++){
 		for(var r=0; r<brickRowCount; r++){
 			var b = bricks[c][r];
 			if(b.status == 1) {
 			if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight){
 				dy = -dy
                document.getElementById("tom").play()
 				b.status = 0;
 				score++;
 				if (score == brickRowCount*brickColumnCount) {
 					alert("hello mommy from the ancient egipt");
 					document.location.reload();
 					
 				}
 			   }
 			}
 		}
 	}
 }
 
 function draw() {
     ctx.clearRect(0, 0, canvas.width, canvas.height);
     drawBricks();
     drawBall();
     drawPaddle();
     collisionDetection();
     drawScore();
     drawLives();
     
     if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
         dx = -dx;
         document.getElementById("tink").play()
     }
     if(y + dy < ballRadius) {
         dy = -dy;
         document.getElementById("tink").play()
     }
     else if(y + dy > canvas.height-ballRadius) {
         if(x > paddleX && x < paddleX + paddleWidth) {
            if(y= y-paddleHeight){
             dy = -dy  ;
             document.getElementById("tink").play()
 			 }
         }
         else{
            lives--;
            if(!lives){ 
                alert("GAME OVER");
                document.location.reload();

            }
            else {
                x = canvas.width/2;
                y =canvas.height-30;
                dx = 3;
                dy = -3;
                paddleX = (canvas.width-paddleWidth)/2;
            }
        }  
    }

             
    
     
    if(rightPressed && paddleX < canvas.width-paddleWidth) {
         paddleX += 7;
    }
    else if(leftPressed && paddleX > 0) {
         paddleX -= 7;
    }
     
    x += dx;
    y += dy;
 
requestAnimationFrame(draw);
}
draw();


/*ctx.beginPath();
ctx.arc(340, 50, 20, 0, Math.PI, false);
ctx.fillstyle = "green";
ctx.fill();
ctx.closePath();

ctx.beginPath();
ctx.arc(340, 160, 20, 0, Math.PI*2, false);
ctx.fillstyle = "green";
ctx.fill();
ctx.closePath();


ctx.beginPath();
ctx.arc(100, 160, 20, 0, Math.PI/2, true);
ctx.fillstyle = "blue";
ctx.fill();
ctx.closePath();

ctx.beginPath();
ctx.arc(240, 100, 20, 0, Math.PI/4, false);
ctx.fillstyle = "green";
ctx.fill();
ctx.closePath();

//sad face

ctx.beginPath();
ctx.arc(240, 50, 20, 0, Math.PI/9, false);
ctx.fillstyle = "blue";
ctx.fill();
ctx.closePath();



ctx.beginPath();
ctx.arc(240, 200, 100, 0, Math.PI/1, false);
ctx.fillstyle = "purple";
ctx.full();
ctx.closePath();

/*ctx.beginPath();
ctx.arc(240, 300, 100, 0, Math.PI/1, true);
ctx.fillstyle = "purple";
ctx.stroke();
ctx.closePath();




ctx.beginPath();
ctx.arc(160, 100, 20, 0, Math.PI*2, false);
ctx.fillstyle = "green";
ctx.fill();
ctx.closePath();

ctx.beginPath();
ctx.arc(320, 100, 20, 0, Math.PI*2, false);
ctx.fillstyle = "green";
ctx.fill();
ctx.closePath();












/*ctx.beginPath();
ctx.rect(80,40,50,50);
ctx.fillstyle = "#FF0000";
ctx.fill();
ctx.closePath();

ctx.beginPath();
ctx.rect(140,40,50,50);
ctx.fillstyle = "#FF0000";
ctx.fill();
ctx.closePath();

ctx.beginPath();
ctx.rect(200,40,50,50);
ctx.fillstyle = "#FF0000";
ctx.fill();
ctx.closePath();

ctx.beginPath();
ctx.rect(260,40,50,50);
ctx.fillstyle = "#FF0000";
ctx.fill();
ctx.closePath();

ctx.beginPath();
ctx.rect(320,40,50,50);
ctx.fillstyle = "#FF0000";
ctx.fill();
ctx.closePath();

ctx.beginPath();
ctx.rect(380,40,50,50);
ctx.fillstyle = "#FF0000";
ctx.fill();
ctx.closePath();


ctx.beginPath();
ctx.rect(20,100,50,50);
ctx.fillstyle = "#FF0000";
ctx.fill();
ctx.closePath();

ctx.beginPath();
ctx.rect(80,100,50,50);
ctx.fillstyle = "#FF0000";
ctx.fill();
ctx.closePath();

ctx.beginPath();
ctx.rect(140,100,50,50);
ctx.fillstyle = "#FF0000";
ctx.fill();
ctx.closePath();

ctx.beginPath();
ctx.rect(200,100,50,50);
ctx.fillstyle = "#FF0000";
ctx.fill();
ctx.closePath();

ctx.beginPath();
ctx.rect(260,100,50,50);
ctx.fillstyle = "#FF0000";
ctx.closePath();
ctx.fill();

ctx.beginPath();
ctx.rect(320,100,50,50);
ctx.fillstyle = "#FF0000";
ctx.fill();
ctx.closePath();

ctx.beginPath();
ctx.rect(380,100,50,50);
ctx.fillstyle = "#FF0000";
ctx.fill();
ctx.closePath();

ctx.beginPath();
ctx.rect(20,160,50,50);
ctx.fillstyle = "#FF0000";
ctx.fill();
ctx.closePath();

ctx.beginPath();
ctx.rect(80,160,50,50);
ctx.fillstyle = "#FF0000";
ctx.fill();
ctx.closePath();

ctx.beginPath();
ctx.rect(140,160,50,50);
ctx.fillstyle = "#FF0000";
ctx.fill();
ctx.closePath();

ctx.beginPath();
ctx.rect(200,160,50,50);
ctx.fillstyle = "#FF0000";
ctx.fill();
ctx.closePath();

ctx.beginPath();
ctx.rect(260,160,50,50);
ctx.fillstyle = "#FF0000";
ctx.closePath();
ctx.fill();

ctx.beginPath();
ctx.rect(320,160,50,50);
ctx.fillstyle = "#FF0000";
ctx.fill();
ctx.closePath();

ctx.beginPath();
ctx.rect(380,160,50,50);
ctx.fillstyle = "#FF0000";
ctx.fill();
ctx.closePath();


ctx.beginPath();
ctx.rect(20,220,50,50);
ctx.fillstyle = "#FF0000";
ctx.fill();
ctx.closePath();

ctx.beginPath();
ctx.rect(80,220,50,50);
ctx.fillstyle = "#FF0000";
ctx.fill();
ctx.closePath();

ctx.beginPath();
ctx.rect(140,220,50,50);
ctx.fillstyle = "#FF0000";
ctx.fill();
ctx.closePath();

ctx.beginPath();
ctx.rect(200,220,50,50);
ctx.fillstyle = "#FF0000";
ctx.fill();
ctx.closePath();

ctx.beginPath();
ctx.rect(260,220,50,50);
ctx.fillstyle = "#FF0000";
ctx.closePath();
ctx.fill();

ctx.beginPath();
ctx.rect(320,220,50,50);
ctx.fillstyle = "#FF0000";
ctx.fill();
ctx.closePath();

ctx.beginPath();
ctx.rect(380,220,50,50);
ctx.fillstyle = "#FF0000";
ctx.fill();
ctx.closePath();*/


