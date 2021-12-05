# Guess-a-Sketch

![Build](https://github.com/joeylemon/guess-a-sketch/workflows/Build/badge.svg)

https://jlemon.org/projects/guess-a-sketch/

A React web application where users can sketch on a canvas and have a convolutional neural network attempt to classify the drawing. Predictions are made in real-time as the user adds strokes to the canvas. The machine learning algorithm is performed client-side in the user's browser using [Tensorflow.js](https://www.tensorflow.org/js).

## Machine Learning

The web application loads a convolutional neural network which was pre-trained on a subset of Google's ["Quick, Draw!"](https://github.com/googlecreativelab/quickdraw-dataset) dataset. The construction and training of this network can be found at https://github.com/joeylemon/sketch-classifier. Google's dataset is provided in the form of drawing strokes instead of images. Therefore, during the training of the model, these strokes were used to generate images on-the-fly to be fed into the network. Additionally, to provide the network with even more context on stroke patterns, each individual stroke is colored differently, as seen below:

<p align="center"><img src="https://i.imgur.com/skoPqCw.jpg" /></p>

To follow the training algorithm, the web application similarly colors a user's sketches when they are sent to the network. Additionally, a few more modifications to the user's sketches are performed to follow how the "Quick, Draw!" dataset was created:

- Align the drawing to the top-left corner, to have minimum values of 0.
- Uniformly scale the drawing, to have a maximum value equal to the size of the canvas.
- Simplify all strokes using the [Ramer–Douglas–Peucker](https://en.wikipedia.org/wiki/Ramer%E2%80%93Douglas%E2%80%93Peucker_algorithm) algorithm (implemented with [Simplify.js](https://mourner.github.io/simplify-js/)) with an epsilon value of 2.0.

After performing all of these modifications, the image is sent to the neural network and an array of probabilities is returned and presented to the user.

<p align="center"><img src="https://i.imgur.com/3IuTrha.jpg" /></p>
