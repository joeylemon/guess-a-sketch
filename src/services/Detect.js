import * as tf from '@tensorflow/tfjs'
import { SKETCH_NAMES, createCanvas } from './Utils.js'
import store from '../redux/store.js'
import { setProbabilities } from '../redux/actions.js'

let model

/**
 * Get the saved network model
 * @returns {Promise<tf.Sequential>} The Tensorflow model
 */
export async function getModel () {
    if (!model) {
        model = await tf.loadLayersModel('/model/model.json')
        model.compile({
            optimizer: tf.train.adam(),
            loss: 'categoricalCrossentropy',
            metrics: ['accuracy']
        })
    }

    return model
}

/**
 * Convert the canvas image to an array of RGB pixels
 * @param {CanvasRenderingContext2D} ctx The canvas 2d context
 * @param {Number} scale The size of the given canvas in pixels
 * @returns {Array} An array of RGB pixels
 */
export function imageDataToPixels (ctx, size) {
    const scale = (64 / size)
    const [width, height] = [size * scale, size * scale]

    // Scale the image down by scale
    const smallCanvas = createCanvas(width, height)
    const smallCtx = smallCanvas.getContext('2d')
    smallCtx.scale(scale, scale)
    smallCtx.drawImage(ctx.canvas, 0, 0)

    const imageData = smallCtx.getImageData(0, 0, width, height).data
    smallCanvas.remove()

    // The rows of pixels
    const pixelRows = Array(height)
    let rIdx = 0

    // The columns of pixels
    let pixelCols = Array(width)
    let cIdx = 0

    for (let i = 0; i < imageData.length; i += 4) {
        // add the red, green, and blue values to pixels
        // ignore alpha value imageData[i + 3]
        pixelCols[cIdx++] = [imageData[i], imageData[i + 1], imageData[i + 2]]

        // if we have fill all 256 columns of this row, add to row array
        if (cIdx === width) {
            cIdx = 0
            pixelRows[rIdx++] = pixelCols
            pixelCols = Array(width)
        }
    }

    return pixelRows
}

/**
 * Run the model on the image in the canvas and return a list of probable classes
 * @param {CanvasRenderingContext2D} ctx The canvas 2d context
 * @param {Number} scale The size of the given canvas in pixels
 * @returns {Array} Label probabilities from the model output
 */
export async function detectImage (ctx, size) {
    const pixels = imageDataToPixels(ctx, size)
    const model = await getModel()
    const predictions = model.predict(tf.tensor4d([pixels])).dataSync()

    let result = []
    for (let i = 0; i < SKETCH_NAMES.length; i++) {
        result.push({ label: SKETCH_NAMES[i], probability: predictions[i] })
    }
    result = result.sort((a, b) => b.probability - a.probability)

    store.dispatch(setProbabilities(result))
}
