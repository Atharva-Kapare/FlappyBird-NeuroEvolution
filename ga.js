
function nextGeneration() {
    console.log("Next Gen.");
    calculateFitness();
    let bestBird = fittestBird();
    //console.log(deadBirds[0].fitness);
    console.log("Fitness of fittest bird: " + deadBirds[bestBird].fitness);

    let sum = 0;
    for(let bird of deadBirds){
        sum += bird.fitness;
    }
    console.log(sum);
    //console.log(bestBird);
    scoreCounter = 0;
    for (let i = 0; i < POPULATION_SIZE; i++) {
        birds[i] = new Bird;
    }

    for (var i = 0; i < pipePopulation; i++) {
        pipes[i] = new Pipe(width / 2 + (250 * i));
    }

    //deadBirds.splice(0, deadBirds.length - 1);
    deadBirds = [];
    
}

function calculateFitness() {
    let sum = 0;
    for (let bird of deadBirds) {
        sum += bird.score;
    }
    for (let bird of deadBirds) {
        bird.fitness = bird.score / sum;
        //console.log(bird.fitness);
    }
}

function fittestBird() {
    var random = 0;
    var fittestBirdIndex = 0;
    //var count = 0;
    for (let i = 0; i <= deadBirds.length - 1; i++) {
        if (deadBirds[i].fitness > random) {
            fittestBirdIndex = i;
            //console.log(fittestBirdIndex);
            random = deadBirds[i].fitness;
            //console.log(i);
            //count++;
            //return fittestBirdIndex;
        }
        //console.log("count " + count);
        //return fittestBirdIndex;
    }
    return fittestBirdIndex;
}