var startButton = document.getElementById('start_game');
var object;

startButton.onclick = function() {
    document.getElementById("start_game").style.display = "none";
    object = new box(20, 20, "red", 20, 20);
    gameArea.start();
}

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
    object.x++;
    object.y++;
    object.update();
}