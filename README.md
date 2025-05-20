# Flappy-Evolve
An implementation of the genetic algorithm for flappy bird, using plain HTML and JavaScript.

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

## Features
This implementation supports the selection of different input features (Current height, next pipe height, height difference, current velocity, distance to next pipe).
It also supports Pausing and restarting the simulation with different parameters.
## Algorithm

## Challenges
It is not trivial to find a balance between more mutation per epoch and more stable epochs.
If the birds converge too fast (because there is not enough variety in the crossover parents or not enough mutation), then there is a high likelihood to land in a local
minimum. In that case, the parameters are too strict and it is not possible for the birds to mutate in a way to leave that local minimum.

On the other hand, if we allow too much mutation, we might not converge at all, even if we find a "perfect" individual. In this case, some percentage of the population will die at the start of every epoch, because the random mutations can produce individuals which perform worse than the best-performing individuals of the previous generation.