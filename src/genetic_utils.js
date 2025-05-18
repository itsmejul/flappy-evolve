import { inputSize, hiddenSize , Bird} from "./bird.js";
import { canvas } from "./consts.js";
    
// Generate a random Genome
// In our model, a genome is just an Array where each value is in [-1, 1] and represents one weight in the MLP
export function randomGenome() {
  let l = inputSize * hiddenSize + hiddenSize + hiddenSize * 1 + 1;
  return Array.from({ length: l }, () => Math.random() * 2 - 1);
}

function crossover(g1, g2) {
  // For each of our features, pick it randomly from either parent
  const child = g1.map((g, i) => (Math.random() < 0.5 ? g : g2[i]));
  return mutate(child);  //mutate resulting child
}
// Randomly change some features slightly
function mutate(genome) {
  return genome.map(w =>
    Math.random() < 0.2
      ? w + (Math.random() * 2 - 1) * 0.5
      : w
  );
}
export function generateNewBirdsGenetic(birds){
    const nextGen = [];
    //sort birds by fitness
    const sortedBirds = birds.slice()
    .sort((a, b) => b.fitness - a.fitness);

    //best ten birds stay the same
    for (let i = 0; i < 10; i ++){
        nextGen.push(sortedBirds[0], sortedBirds[1]);
    }
    // Filter top 10 birds genomes
    const topGenomes = sortedBirds.slice(0, 10).map(bird => bird.genome);
    // Run crossover
    while (nextGen.length < 1000) {
        const parent1 = topGenomes[Math.floor(Math.random() * topGenomes.length)];
        const parent2 = topGenomes[Math.floor(Math.random() * topGenomes.length)];
        nextGen.push(new Bird(canvas.height / 2, crossover(parent1, parent2)));
    }
    birds = [];
    birds = nextGen;
    return birds;
}