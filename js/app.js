

// Enemies our player must avoid
var Enemy = function(x, y) {
    this.x = x;
    this.y = y;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    var offScreen = 540
    if (this.x < offScreen){
        //console.log(dt);
        var randomNumber = Math.floor((Math.random() * 100) + 50);
        this.x += randomNumber * dt;
        } else {
            var randomX = -(Math.floor((Math.random() * 500) + 10));
            this.x = randomX;
        }

    //collison function to determine when a player collides with an enemy
     if (player.x < this.x + 75 &&
        player.x + 75 > this.x &&
        player.y < this.y + 85 &&
        player.y + 85 > this.y
        ) {
        //alert player he was caught
        $('body').append('<h1 id="caught">CAUGHT!</h1>');
        //remove alert after half a second
        setTimeout(function(){
            $('#caught').remove();
        }, 500);
        //send player back to starting area after he is caught
        player.x = 200;
        player.y = 400;
        }    
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Theplayer class sets attributes for the player
// it requires an update(), render() and a handleInput() method.
var Theplayer = function(x,y){
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
};

//This method is required by the engine 
//but I do not use it since the player does not move on his own
Theplayer.prototype.update = function(dt){

};

//draw player avatar
Theplayer.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
var player = new Theplayer(200, 400);

//Create actions for key presses
player.handleInput = function(key){
    if (key === 'left' && this.x >0){
        this.x -=100;
    } else if (key === 'right' && this.x < 400){
        this.x +=100;
    } else if (key === 'up' && this.y > 60){
        this.y -=85;
    } else if (key === 'down' && this.y < 400){
        this.y +=85;
    } else if (key === 'up' && this.y > 0){ //When player goes in water reset game
        this.y -=85;
        //alert player they got wet
        $('body').append("<h1 id='alert'>SPLASH!</h1>");
        //remove alert after half a second
        setTimeout(function(){
            $('#alert').remove();
        }, 500);
        //send player back to starting position
        var that = this;
        setTimeout(function(){
            that.y = 400;
            that.x = 200;
            //redraw canvas to remove player avater from border
            ctx.clearRect(0, 0, 505, 606);
        }, 300);
}
};

// Create enemy objects for the game
var enemy1 = new Enemy(-200, 60);
var enemy2 = new Enemy(-100, 145);
var enemy3 = new Enemy(0, 230);
var enemy4 = new Enemy(-500, 60);
var enemy5 = new Enemy(-300, 230);

// Place all enemy objects in an array allEnemies
var allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5];
// Place the player object in a variable called player

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});

