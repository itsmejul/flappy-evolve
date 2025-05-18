// To convert output neuron to binary activation value
function sigmoid(x) {
    return 1 / (1 + Math.exp(-x));
}

function relu(x) {
    return Math.max(0, x);
}
export class MLP {
    constructor(genome, inputSize, hiddenSize) {
        // Genomes are array of length inputSize * hiddenSize + hiddenSize + hiddenSize * 1 + 1 (since outputSize is 1)
        this.inputSize = inputSize;
        this.hiddenSize = hiddenSize;

        // Extract each layers weights and biases from the Genome
        let offset = 0;
        this.w1 = []; 
        for (let i = 0; i < this.hiddenSize; i++) {
            this.w1.push(genome.slice(offset, offset + this.inputSize));
            offset += this.inputSize;
        }

        this.b1 = genome.slice(offset, offset + this.hiddenSize);
        offset += this.hiddenSize;

        this.w2 = genome.slice(offset, offset + this.hiddenSize);
        offset += this.hiddenSize;

        this.b2 = genome[offset]; 
    }

    forward(inputs) {
        // Pass inputs through hidden layer
        let hidden = [];
        for (let i = 0; i < this.hiddenSize; i++) {
            let sum = this.b1[i]; // Start with biases which are extra values that don't come from the input layer
            for (let j = 0; j < this.inputSize; j++) {
                sum += this.w1[i][j] * inputs[j];
            }
            hidden.push(relu(sum));
        }
        // Pass hidden states through output layer
        let output = this.b2;
        for (let i = 0; i < this.hiddenSize; i++) {
            output += this.w2[i] * hidden[i];
        }
        return sigmoid(output); // Binary activation
    } 
}

