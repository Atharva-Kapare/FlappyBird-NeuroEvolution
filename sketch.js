let pipes = [];
let PIPE_SPEED = 4;

let GRAVITY = 0.3;

let score = 0;

function setup() {
    createCanvas(1200, 600);

    bird = new Bird;

    for (var i = 0; i < 5; i++) {
        pipes[i] = new Pipe(width + (250 * i));
    }


}

function draw() {
    background(0);


    bird.show();
    bird.move();

    for (var i = 0; i < 5; i++) {
        pipes[i].show();
        pipes[i].move();
    }

    var hit = false;
    var hit1 = false;
    //var score = 0;

    for (var i = 0; i < 5; i++) {
        hit = collideRectCircle(pipes[i].x, 0, pipes[i].width, pipes[i].top, bird.x, bird.y, bird.diameter);
        hit1 = collideRectCircle(pipes[i].x, pipes[i].bottom, pipes[i].width, height - (this.top - 150), bird.x, bird.y, bird.diameter);

        if (hit || hit1) {
            noLoop();
        }
    }

    //console.log(score);
    rectMode(CENTER);
    text(score, bird.x-3, bird.y);
    rectMode(CORNER);

}

function keyPressed() {
    if (key == ' ') {
        bird.velocity -= 8;

    }
}

class Bird {
    constructor() {
        this.x = width / 8;
        this.y = height / 2;
        this.acceleration = GRAVITY;
        this.velocity = 0;
        this.diameter = 35;
    }

    show() {
        stroke(255);
        fill(255, 50);
        ellipse(this.x, this.y, this.diameter, this.diameter);
    }

    move() {
        if (this.y >= height || this.y <= 0) {
            noLoop();
        }
        else {
            if (this.velocity > 25) {
                this.velocity = this.velocity;
            }
            else {
                this.velocity += this.acceleration
            }
            this.y += this.velocity;
        }
    }
}

class Pipe {
    constructor(startX) {
        this.x = startX;
        this.width = 50;
        this.top = floor((Math.random() * (0.8 - 0.2) + 0.2) * height);
        this.bottom = this.top + 150;
        this.passed = false;
    }

    show() {
        rect(this.x, 0, this.width, this.top);
        rect(this.x, this.bottom, this.width, height - (this.top - 150));
    }

    move() {
        this.x -= PIPE_SPEED;

        if(this.x < bird.x && this.passed == false){
            score++;
            this.passed = true;
        }

        if (this.x + this.width < 0) {
            this.x = width;
            this.top = floor((Math.random() * (0.8 - 0.2) + 0.2) * height);
            this.bottom = this.top + 150;
            this.passed = false;
        }
    }
}