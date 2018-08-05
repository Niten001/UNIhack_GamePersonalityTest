var start = document.getElementById('start_game');
var username = document.getElementById('name');
var cont = document.getElementById('continue');
var menu = document.getElementById('menu');

var inGame = false;
var pause = false;
var client = io();

var right = false;
var left = false;
var jump = false;

var x = 400;
var y = 700;

start.onclick = function() {
    if (username.value != "") {
        startGame();
    } else {
        document.getElementById('name').style.borderBottom = "solid 2px red";
    }
};

cont.onclick = function() {
    if (inGame) {
        pause = !pause;
        pauseMenu();
    }
};

menu.onclick = function() {
    document.getElementById("main_menu").style.display = "block";
    document.getElementById("logo").style.display = "block";
    document.getElementById("name_title").style.display = "block";
    document.getElementById("name").style.display = "block";
    document.getElementById("start_game").style.display = "block";

    if (inGame) {
        pause = !pause;
        pauseMenu();
    }

    inGame = false;
    client.disconnect();
    gameArea.canvas.parentNode.removeChild(gameArea.canvas);
};

function keyCode(ev){
    return `${ev.keyCode}`;
}

window.addEventListener('keydown', function(ev) {
    switch (keyCode(ev)) {
      case "37":
        console.log("LEFT");
        left = true;
        client.emit("input_down_event", "left");
        break;
      case "39":
        console.log("RIGHT");
        right = true;
        client.emit("input_down_event", "right");
        break;
      case "32":
        console.log("SPACE");
        jump = true;
        client.emit("input_down_event", "space");
        break;
    case "27":
        if (inGame) {
            pause = !pause;
            pauseMenu();
        }
      default:
        break;
    }
});

window.addEventListener('keyup', function(ev) {
    switch (keyCode(ev)) {
        case "37":
            console.log("LEFT");
            left = false;
            client.emit("input_up_event", "left");
            break;
        case "39":
            console.log("RIGHT");
            right = false;
            client.emit("input_up_event", "right");
            break;
        case "32":
            console.log("SPACE");
            jump = false;
            client.emit("input_up_event", "space");
            break;
        default:
            break;
    }
});

function startGame() {
    document.getElementById("main_menu").style.display = "none";
    document.getElementById("logo").style.display = "none";
    document.getElementById("name_title").style.display = "none";
    document.getElementById("name").style.display = "none";
    document.getElementById("start_game").style.display = "none";

    inGame = true;
    client = io.connect('http://172.16.6.104:8000');
    gameArea.start();

    //Connect to server
    //Load Canvas
};

function pauseMenu() {
    if (pause) {
        document.getElementById("pause_menu").style.display = "block";
        document.getElementById("pause").style.display = "block";
        document.getElementById("menu").style.display = "block";
        document.getElementById("continue").style.display = "block";
    } else {
        document.getElementById("pause_menu").style.display = "none";
        document.getElementById("pause").style.display = "none";
        document.getElementById("menu").style.display = "none";
        document.getElementById("continue").style.display = "none";
    }
}

var gameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 1920;
        this.canvas.height = 1080;
        this.canvas.style.padding = "0";
        this.canvas.style.position = "absolute";
        this.canvas.style.top = "0";
        this.canvas.style.left = "0";
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(render, 2);
        //Draw background
        //
        },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
};

function render() {
    gameArea.clear();
    var ctx = gameArea.context;

    var image = new Image();
    image.src = "./img/map.png";

    ctx.drawImage(image, 0, 0, 1920, 1080);

    //for (const player of players.values()) {
        ctx.fillStyle = "red";//player.color;
        ctx.fillRect(x, y, 20, 20);

    //}
    var vx = 0;
    var vy = 0;
    var ax = 0;
    var ay = 5;

    if ((right) && (!left)) {
        vx = 1;
    }
    if ((left) && (!right)) {
        vx = -1;
    }
    if (jump) {
        ay = 2;
        vy = -10;
    }

    vx += ax;
    vy += ay;
    x += vx;
    y += vy;

    if (x < 0) {
        x = 0;
    }
    if (y < 0) {
        y = 0;
    }
    if (x > 1884) {
        x = 1884;
    }
    if (y > 760) {
        y = 760;
    }
}

client.on("connected", function() {console.log("TEST")});
