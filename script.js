let gravity = 0.1;
let ball = {
	x: 300,
	y: 100,
	xSpeed: 1,
	ySpeed: 0,
	size: 50,
};
let player = {
	x: 300,
	y: 350,
	size: 30,
};

function setup() {
	createCanvas(600, 400);
}

function draw() {
	background(100);
	//update player
	updatePlayer();
	drawPlayer();
	//update enemies
	updateEnemy(ball);
	drawEnemy(ball);

	if (isColliding(player, ball)) {
		console.log("colliding");
	}
}

function drawPlayer() {
	fill("blue");
	circle(player.x, player.y, player.size);
}

function updatePlayer() {
	if (keyIsDown(LEFT_ARROW)) {
		player.x -= 3;
	}
	if (keyIsDown(RIGHT_ARROW)) {
		player.x += 3;
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
