let pipes = [];
let pipePopulation = 5;
let PIPE_SPEED = 4;

let birds = [];
let deadBirds = [];
let POPULATION_SIZE = 50;
let birdX = 1200 / 8;
let counter = 0;

let GRAVITY = 0.3;

let slider;
let scoreCounter = 0;


function setup() {
    createCanvas(1200, 600);

    slider = createSlider(1, 100, 1);

    for (let i = 0; i < POPULATION_SIZE; i++) {
        birds[i] = new Bird;
    }

    for (var i = 0; i < pipePopulation; i++) {
        pipes[i] = new Pipe(width / 2 + (250 * i));
    }


}

function draw() {

    for (let i = 0; i < slider.value(); i++) {

        for (let i = 0; i <= birds.length - 1; i++) {
            //birds[i].show();
            //bird.think();
            output = birds[i].think();
            if (output[0] > output[1]) {
                birds[i].applyForce();
            }
            if (birds[i].alive == true) {
                scoreCounter++;
                birds[i].score = scoreCounter;
                birds[i].move();
            }
        }

        for (let j = 0; j < pipePopulation; j++) {
            //pipes[j].show();
            pipes[j].move();
        }

        if (counter == POPULATION_SIZE) {
            nextGeneration();
            counter = 0;
        }
    }

    background(0);

    for (let bird of birds) {
        bird.show();
    }
    for (let pipe of pipes) {
        pipe.show();
    }

    fill(255);
    rect(pipes[closestPipe()].x, 0, pipes[closestPipe()].width, pipes[closestPipe()].top);
    rect(pipes[closestPipe()].x, pipes[closestPipe()].bottom, pipes[closestPipe()].width, height - (pipes[closestPipe()].top - 150));
    noFill();



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
        this.x = birdX;
        this.y = height / 2;
        this.acceleration = GRAVITY;
        this.velocity = 0;
        this.diameter = 35;
        this.brain = new NeuralNetwork(5, 10, 2);
        this.alive = true;
        this.score;
        this.fitness;

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

        inputs[0] = this.y / height;
        inputs[1] = this.velocity;
        inputs[2] = pipes[closestPipe()].x / width;
        inputs[3] = pipes[closestPipe()].top / height;
        inputs[4] = pipes[closestPipe()].bottom / height;

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
        stroke(255);
        fill(255, 50);
        rect(this.x, 0, this.width, this.top);
        rect(this.x, this.bottom, this.width, height - (this.top - 150));
    }

    move() {
        this.x -= PIPE_SPEED;

        if (this.x < birdX - (this.width * 1.5) && this.passed == false) {
            this.passed = true;
        }

        if (this.x + this.width < 0) {
            this.x = width;
            this.top = floor((Math.random() * (0.8 - 0.2) + 0.2) * height);
            this.bottom = this.top + 150;
            this.passed = false;
        }


        var hit = false;
        var hit1 = false;

        //for (var k = birds.length - 1; k >= 0; k--) {
        for (var k = 0; k < birds.length; k++) {

            hit = collideRectCircle(this.x, 0, this.width, this.top, birds[k].x, birds[k].y, birds[k].diameter);
            hit1 = collideRectCircle(this.x, this.bottom, this.width, height - (this.top - 150), birds[k].x, birds[k].y, birds[k].diameter);

            if (hit || hit1) {
                //deadBirds[k] = birds[k];
                birds[k].alive = false;
                counter++;
                deadBirds.push(birds.splice(k, 1)[0]);
                //console.log("debug");
            }
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