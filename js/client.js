var start = document.getElementById('start_game');
var player = new box(20, 20, "red", 20, 20);
var inGame = false;
var pause = false;
const client = io.connect('http://172.16.6.104:8000');

start.onclick = function() {
    startGame();
};

function keyCode(ev){
    return `${ev.keyCode}`;
}

window.addEventListener('keydown', function(ev) {
    switch (keyCode(ev)) {
      case "37":
        console.log("LEFT");
        client.emit("input_down_event", "left");
        break;
      case "39":
        console.log("RIGHT");
        client.emit("input_down_event", "right");
        break;
      case "32":
        console.log("SPACE");
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
            client.emit("input_up_event", "left");
            break;
        case "39":
            console.log("RIGHT");
            client.emit("input_up_event", "right");
            break;
        case "32":
            console.log("SPACE");
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
        this.interval = setInterval(update, 2);
        //Draw background
        //
        },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
};

function box(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.color = color;
    this.x = x;
    this.y = y;

    this.update = function(player) {
        this.x = player.x;
        this.y = player.y;
        this.width = player.width;
        this.height = player.height;
        this.color = player.color;
    }
};

function update() {
    gameArea.clear();
    var ctx = gameArea.context;

    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);

}

client.on("player_update", (input) => player.update(input));
