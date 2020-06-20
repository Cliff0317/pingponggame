var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var ballRadius = 12;
var x = ballRadius;
var y = Math.random() * (canvas.height - 2*ballRadius) + ballRadius;
var r = 7;
var theta = Math.random() * 1/2 * Math.PI;
var dx = r * Math.cos(theta);
var dy = -r * Math.sin(theta);
var paddleHeight = 100;
var paddleWidth = 12;
var paddleY = (canvas.height-paddleHeight)/2;
var brickRowCount = 9;
var brickColumnCount = 4;
var brickWidth = 25;
var brickHeight = 60;
var brickPadding = 6;
var brickOffsetTop = 5;
var brickOffsetLeft = 370;
var bricks = [];
var score = 0;

for(var c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for(var r=0; r<brickRowCount; r++) {
        bricks[c][r] = {x: 0, y: 0, visible: 1};
    }
}

function mouseMoveHandler(e) {
    var relativeY = e.clientY - canvas.offsetTop;
    if(relativeY > paddleHeight / 2 && relativeY < canvas.height - paddleHeight / 2) {
        paddleY = relativeY - paddleHeight / 2;
    }
}

function drawScore() {
    document.getElementById("score").textContent = "分數: " + score;
}

function collisionDetection() {
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            var b = bricks[c][r];
            if(b.visible == 1) {
                if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                    dx = -dx;
                    b.visible = 0;
                    score += c+1;
                    drawScore();
                }
            }
        }
    }
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(0, paddleY, paddleWidth, paddleHeight);
    ctx.fillStyle = "#333";
    ctx.fill();
    ctx.closePath();
}

function drawBricks() {
    var brickColor = ["#0095DD", "#0088BB", "#007799", "#006677"];
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            if (bricks[c][r].visible == 1) {
                var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = brickColor[c];
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, 2 * Math.PI);
    ctx.fillStyle = "#FF0000";
    ctx.fill();
    ctx.closePath();
}
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(0, paddleY, paddleWidth, paddleHeight);
    ctx.fillStyle = "#333";
    ctx.fill();
    ctx.closePath();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    drawBricks();
    collisionDetection();
    
    if(x + dx > canvas.width-ballRadius) {
        dx = -dx;
    }
    else if (x + dx < ballRadius) {
        if (y > paddleY && y < paddleY + paddleHeight) {
            dx = -dx;
        }
        else {
            console.log("遊戲結束。");
            document.location.reload();
        }
    }
    if(y + dy > canvas.height-ballRadius || y + dy < ballRadius) {
        dy = -dy;
    }
    
    x += dx;
    y += dy;
    requestAnimationFrame(draw);
}
document.addEventListener("mousemove", mouseMoveHandler, false);
draw();
