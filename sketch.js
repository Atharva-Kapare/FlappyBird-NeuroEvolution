let pipes = [];
let pipePopulation = 5;
let PIPE_SPEED = 4;

let birds = [];
let POPULATION_SIZE = 100;

let GRAVITY = 0.3;

let score = 0;

function setup() {
    createCanvas(1200, 600);

    for (let i = 0; i < POPULATION_SIZE; i++) {
        birds[i] = new Bird;
    }

    for (var i = 0; i < pipePopulation; i++) {
        pipes[i] = new Pipe(width + (250 * i));
    }


}

function draw() {
    background(0);

    fill(255);
    rect(pipes[closestPipe()].x, 0, pipes[closestPipe()].width, pipes[closestPipe()].top);
    rect(pipes[closestPipe()].x, pipes[closestPipe()].bottom, pipes[closestPipe()].width, height - (pipes[closestPipe()].top - 150));
    noFill();

    for (let i = 0; i < POPULATION_SIZE; i++) {
        birds[i].show();
        //bird.think();
        if (birds[i].think() > 0.5) {
            birds[i].applyForce();
        }
        birds[i].move();
    }

    for (let j = 0; j < pipePopulation; j++) {
        pipes[j].show();
        pipes[j].move();
    }

    var hit = false;
    var hit1 = false;
    //var score = 0;

    for (var k = 0; k < pipePopulation; k++) {
        hit = collideRectCircle(pipes[k].x, 0, pipes[k].width, pipes[k].top, birds[k].x, birds[k].y, birds[k].diameter);
        hit1 = collideRectCircle(pipes[k].x, pipes[k].bottom, pipes[k].width, height - (this.top - 150), birds[k].x, birds[k].y, birds[k].diameter);

        if (hit || hit1) {
            //noLoop();
        }
    }

    //console.log(score);
    // rectMode(CENTER);
    // text(score, birds[i].x - 3, birds[i].y);
    // rectMode(CORNER);


}

// function keyPressed() {
//     if (key == ' ') {
//         bird.velocity -= 8;

//     }
// }


class Bird {
    constructor() {
        this.x = width / 8;
        this.y = height / 2;
        this.acceleration = GRAVITY;
        this.velocity = 0;
        this.diameter = 35;
        this.brain = new NeuralNetwork(5, 10, 1);

    }

    applyForce() {
        this.velocity -= 8;
    }

    think() {
        let inputs = [];
        // inputs[0] = this.y;
        // inputs[1] = this.velocity;
        // inputs[2] = pipes.top;
        // inputs[3] = pipes.bottom;
        // inputs[4] = pipes.x;
        //let closestPipe = pipes.closestX();

        inputs[0] = this.y/height;
        inputs[1] = this.velocity;
        inputs[2] = pipes[closestPipe()].x/width;
        inputs[3] = pipes[closestPipe()].top/height;
        inputs[4] = pipes[closestPipe()].bottom/height;

        let outputs = this.brain.predict(inputs);

        return outputs;

    }



    show() {
        stroke(255);
        fill(255, 50);
        ellipse(this.x, this.y, this.diameter, this.diameter);
    }

    move() {
        if (this.y > height) {
            this.y = height;
            this.velocity = 0;
        }
        else if (this.y < 0) {
            this.y = 0;
            this.velocity = 0;
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

let closestPipe = function () {
    let closestX = Infinity;
    let closestPipe = 0;
    for (let i = 0; i < pipePopulation; i++) {
        if (pipes[i].passed == false) {
            if (pipes[i].x < closestX) {
                closestPipe = i;
                closestX = pipes[i].x;
            }
        }
    }
    //console.log("debug");
    return closestPipe;
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

        if (this.x < birds[0].x - (this.width * 1.5) && this.passed == false) {
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

    // closestX() {
    //     let closestX = Infinity;
    //     for (let i = 0; i < pipes.length(); i++) {
    //         if (pipes[i].passed == false) {
    //             if (pipes[i].x < closestX) {
    //                 closestX = pipes[i].x;
    //             }
    //         }
    //     }
    //     return closestX;
    // }
}