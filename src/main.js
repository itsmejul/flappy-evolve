import { Pipe } from './pipe.js';
import { Bird , inputSize, hiddenSize} from './bird.js';
import { randomGenome , generateNewBirdsGenetic} from './genetic_utils.js';
import { canvas, ctx } from './consts.js';

const birdX = 150; // x-position of the birds, which are constant
let pipes = [];
let birds = [];
let frame = 0;
let epoch = 1;
let alive = 1000;
let paused = false;
const epochTextField = document.getElementById("epoch"); 
epochTextField.innerText = `Epoch ${epoch}`;
const aliveTextField = document.getElementById("alivecount");
aliveTextField.innerText = `Alive: ${alive};`

document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("pauseButton").addEventListener("click", function(){changePaused()});
})

function changePaused(){
    paused = !paused
}

document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("restartButton").addEventListener("click",function(){ resetGame()});
})

function initPipes() {
    pipes = []
    for(let i = -100; i < 600; i += 200){
        const newPipe = Pipe.spawn(canvas);
        newPipe.x = i;
        pipes.push(newPipe);
    }
}



// For the first epoch, all birds genomes are random
function initBirdsRandom(){
    for(let i = 0; i < 1000; i++){
        let bird = new Bird(canvas.height / 2, randomGenome());
        birds.push(bird);
    }
}

function updatePipes() {
    // Remove Pipe that crossed x < -200 and spawn a new Pipe at x = 600 instead
    const beforeCount = pipes.length;
    pipes = pipes.filter(pipe => pipe.x > -200);
    if (pipes.length < beforeCount){
        const newPipe = Pipe.spawn(canvas);
        newPipe.x = 600;
        pipes.push(newPipe);
    }
    // Move pipes
    pipes.forEach(pipe => {
        pipe.x += -2;
    });
}
function updateBirds(){
    let currPipe = findCurrentPipe(); // This is always the next pipe the birds could potentially collide with
    const normGap = (currPipe.gapY / 600)*2 -1; // Normalize to [-1, 1] to improve MLP performance
    const normDist = ((currPipe.x - 100)/200) * 2 - 1;

    birds.forEach(bird => {
        // Collision with current Pipe
        if ((birdX + bird.radius > currPipe.x) && (birdX - bird.radius < currPipe.x + currPipe.width)){
            if ((bird.y - bird.radius < currPipe.gapY) || (bird.y + bird.radius > currPipe.gapY + currPipe.gap)){
                if(bird.alive){
                    bird.alive = false;
                    bird.fitness = frame;
                }
            }
        }
        //check collision with floor or ceiling
        if ((bird.y < 0 ) || (bird.y > canvas.height)){
            if(bird.alive){
            bird.alive = false;
            bird.fitness=frame;
            }
        }
        // Update bird
        bird.update(normGap, normDist);
    });

    //check if all birds died, if yes start new Epoch
    const aliveCount = birds.filter(b => b.alive).length;
    aliveTextField.innerText = `Alive: ${aliveCount}`
    //console.log(aliveCount);
    if (aliveCount == 0 || frame > 1500){ //force a new epoch every 1500 frames 
        resetEpoch();
    }
}

function resetEpoch(){
    initPipes();
    birds = generateNewBirdsGenetic(birds);
    epoch++;
    frame = 0;
    epochTextField.innerText = `Epoch ${epoch}`;
}

function resetGame(){
    console.log("reset");
    pipes = [];
    birds = [];
    frame = 0;
    epoch = 1;
    alive = 1000;
    paused = false;
    epochTextField.innerText = `Epoch: ${epoch}`
    aliveTextField.innerText = `Alive: ${alive}`
    initPipes();
    initBirdsRandom();

}

function findCurrentPipe(){
    for(let i = 0; i < pipes.length; i++){
        if (pipes[i].x > 100) {
            return pipes[i];
        }
    }
}

function drawPipesAndBirds(){
    pipes.forEach(pipe => pipe.draw(ctx, canvas));
    birds.forEach(bird => bird.draw(ctx));
}

function loop(){
    console.log(paused)
    if(!paused){

        ctx.clearRect(0, 0, canvas.clientWidth, canvas.height);
        updatePipes();
        updateBirds();
        drawPipesAndBirds();
        //requestAnimationFrame(loop);
        frame++;
    }
    requestAnimationFrame(loop);
}

initPipes();
initBirdsRandom();
loop();
