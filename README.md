# Flappy-Evolve
An implementation of the genetic algorithm for learning Flappy Bird, using plain HTML and JavaScript.
Try it out here:  
https://itsmejul.github.io/flappy-evolve/

## Running locally
You can clone this repo via  
```
git clone git@github.com:itsmejul/flappy-evolve.git
```
Then, run it by starting a http server, for example using python:
```
python -m http.server 8000
```
And then visit ``http://localhost:8000`` in your browser to see the simulation.

## Evolution of the birds
Each "bird" consists of a small MLP with just one hidden layer, which will, during inference, receive the selected input features as inputs. The MLP has one output neuron where we use a sigmoid function to decide whether it should activate or not, based on the inputs. We run this inference once every frame for every bird.
The genome of each bird is represented by an Array of length (input_size*hidden_size + hidden_size + hidden_size * output_size * output_size), which contains all the weights for the weights and biases.
Each epoch, we save the score (how long did a bird survive?) for each bird, and then run the genetic algorithm accordingly.
## Algorithm
For the first epoch, all genomes are created randomly. For each folliowing epoch, we create the next generation by running the genetic algorithm, which consists of these steps:
* Selection: We select the top-k best performing individuals
* Crossover: We breed the next generation by pickung two parents from the selected top-k birds, and then randomly combining their weights
* Mutation: Finally, for each weight in each genome, there is a small chance that it will be modified by a small value

## Challenges
It is not trivial to find a balance between more mutation per epoch and more stable epochs.
If the birds converge too fast (because there is not enough variety in the crossover parents or not enough mutation), then there is a high likelihood to land in a local
minimum. In that case, the parameters are too strict and it is not possible for the birds to mutate in a way to leave that local minimum.

On the other hand, if we allow too much mutation, we might not converge at all, even if we find a "perfect" individual. In this case, some percentage of the population will die at the start of every epoch, because the random mutations can produce individuals which perform worse than the best-performing individuals of the previous generation.
