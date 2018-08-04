var start = document.getElementById('start_game');
var player;
var inGame = false;

start.onclick = function() {
    startGame();
};

function startGame() {
    console.log("Dafaq");
    document.getElementById("start_game").style.display = "none";
    player = new box(20, 20, "red", 20, 20);
    inGame = true;
    gameArea.start();

    const client = io.connect('http://172.16.6.104:8000');

    client.on("connected", (msg) => console.log(msg));
    //Connect to server
    //Load Canvas
};

var gameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 1200;
        this.canvas.height = 800;
        this.canvas.style.border = "solid 1px black";
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

    this.update = function() {
        ctx = gameArea.context;

        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
};

function update() {
    gameArea.clear();
    player.x++;
    player.y++;
    player.update();
}