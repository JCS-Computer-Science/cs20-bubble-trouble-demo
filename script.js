let gravity = 0.1;
let enemies = [
	{
		x: 300,
		y: 100,
		xSpeed: 1,
		ySpeed: 0,
		size: 50,
	},
	{
		x: 500,
		y: 100,
		xSpeed: 1,
		ySpeed: 0,
		size: 50,
	},
];
let player = {
	x: 300,
	y: 350,
	size: 30,
	isMovingRight: true,
	sprites: {},
};

function preload() {
	player.sprites.right = loadImage("./playerSprite.png");
	player.sprites.left = loadImage("./playerSpriteLeft.png");
}

function setup() {
	createCanvas(600, 400);
	imageMode(CENTER);
}

function draw() {
	background(100);

	//update player
	updatePlayer();
	drawPlayer();
	//update enemies
	for (let i = 0; i < enemies.length; i++) {
		updateEnemy(enemies[i]);
		drawEnemy(enemies[i]);
		if (isColliding(player, enemies[i])) {
			console.log("colliding");
		}
	}
}

function drawPlayer() {
	// fill("blue");
	// circle(player.x, player.y, player.size);
	noSmooth();
	if (player.isMovingRight) {
		image(player.sprites.right, player.x, player.y, player.size * 2, player.size * 2);
	} else {
		image(player.sprites.left, player.x, player.y, player.size * 2, player.size * 2);
	}
}

function updatePlayer() {
	if (keyIsDown(LEFT_ARROW)) {
		player.x -= 3;
		player.isMovingRight = false;
	}
	if (keyIsDown(RIGHT_ARROW)) {
		player.x += 3;
		player.isMovingRight = true;
	}
	if (player.x > width - player.size / 2) {
		player.x = width - player.size / 2;
	}
	if (player.x < player.size / 2) {
		player.x = player.size / 2;
	}
}

function drawEnemy(c) {
	fill("red");
	circle(c.x, c.y, c.size);
}

function updateEnemy(c) {
	c.ySpeed += gravity;
	c.y += c.ySpeed;
	if (c.y >= height - c.size / 2) {
		c.y = height - c.size / 2;
		c.ySpeed = -c.ySpeed;
	}
	c.x += c.xSpeed;
	if (c.x > width - c.size / 2) {
		c.xSpeed = -c.xSpeed;
	}
	if (c.x < c.size / 2) {
		c.xSpeed = -c.xSpeed;
	}
}

function isColliding(circle1, circle2) {
	let xDiff = circle1.x - circle2.x;
	let yDiff = circle1.y - circle2.y;
	let dist = sqrt(xDiff * xDiff + yDiff * yDiff);

	if (dist <= circle1.size / 2 + circle2.size / 2) {
		return true;
	} else {
		return false;
	}
}

function keyPressed() {
	if (keyCode == ENTER) {
		splitEnemy(0);
	}
}

function splitEnemy(i) {
	console.log(`destroying enemy ${i}`);
	let enemy = enemies[i];
	if (enemy.size > 20) {
		//make two new smaller enemies
		let newEnemy1 = {
			x: enemy.x,
			y: enemy.y,
			xSpeed: enemy.xSpeed,
			ySpeed: 0,
			size: enemy.size / 2,
		};
		let newEnemy2 = {
			x: enemy.x,
			y: enemy.y,
			xSpeed: -enemy.xSpeed,
			ySpeed: 0,
			size: enemy.size / 2,
		};
		//add them to the array
		enemies.push(newEnemy1);
		enemies.push(newEnemy2);
	}
	//remove the original enemy
	enemies.splice(i, 1);
}
