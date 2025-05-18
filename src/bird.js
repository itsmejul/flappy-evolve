import { MLP } from "./mlp.js";

const birdRadius = 10;
export const inputSize = 2;
export const hiddenSize = 3;
export class Bird {
    constructor(y, genome) {
        this.y = y;
        this.radius = birdRadius;
        this.genome = genome;
        this.velocity = 0;
        this.alive = true;
        this.fitness = 0;
        this.mlp = new MLP(genome, inputSize, hiddenSize);
    }

    update(normGap, normDist){
        let normY = (this.y / 600)*2 - 1;
        let inputs = [this.y, this.velocity, normGap, normDist];
        let diff = (normGap - normY) / 2;

        console.log(diff);
        inputs = [diff, normDist] // Currently best performing setup with just height difference and distance as inputs
        const out = this.mlp.forward(inputs);
        if (out > 0.5) {
            this.velocity = -8; // If mlp outputs 1, the bird will jump
        }
        this.velocity += 0.5; // Apply gravity upwards since y-coords are inverted
        this.y += this.velocity; // Move bird according to velocity
    }

    draw(ctx){
        if (this.alive){
            ctx.beginPath();
            ctx.arc(150, this.y, 10, 0, 2*Math.PI);
            ctx.fillStyle = "rgba(255,0,0,0.5)";
            ctx.fill();
        }
    }
}