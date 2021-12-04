
export const SKETCH_NAMES = ['bus', 'car', 'castle', 'coffee_cup', 'compass', 'cookie', 'crab', 'fork', 'golf_club', 'ice_cream', 'key', 'moon', 'octopus', 'paintbrush', 'parachute', 'pizza', 'shark', 'shovel', 'train']

/**
 * Get a value from the color gradient between two colors
 * @param {Array} color1 RGB array
 * @param {Array} color2 RGB array
 * @param {Number} weight Percentage to move between color1 and color2
 * @returns {String} A string to use as a CSS color
 */
export function colorGradient (color1, color2, weight) {
    const w1 = weight
    const w2 = 1 - w1
    const rgb = [Math.round(color1[0] * w1 + color2[0] * w2),
        Math.round(color1[1] * w1 + color2[1] * w2),
        Math.round(color1[2] * w1 + color2[2] * w2)]

    return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`
}

/**
 * Create a new temporary canvas
 * @param {Number} width
 * @param {Number} height
 * @returns {Canvas} The canvas element reference
 */
export function createCanvas (width, height) {
    const canvas = document.createElement('canvas')

    canvas.id = `temp-canvas-${Math.floor(Math.random() * 100000)}`
    canvas.width = width
    canvas.height = height
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`
    canvas.style.position = 'fixed'
    canvas.style.top = '0px'
    canvas.style.left = '0px'

    document.body.appendChild(canvas)

    return canvas
}

/**
 * Crop and scale the given strokes to fill the given size canvas.
 * Since the model was trained on strokes that were cropped and scaled, we must perform
 * the same step to ensure optimal performance.
 * @param {Array} strokes An array of strokes
 * @param {Number} size The size of the canvas on which the strokes were drawn
 * @returns {Array} The modified strokes array
 */
export function cropAndScaleStrokes (strokes, size) {
    let pts = strokes.flat()
    const [minX, minY] = [Math.min(...pts.map(s => s.x)), Math.min(...pts.map(s => s.y))]

    // align the strokes to the top-left of canvas
    strokes = strokes.map(pts => pts.map(s => ({ x: s.x - minX, y: s.y - minY })))

    // rebuild the new pts array
    pts = strokes.flat()
    const [maxX, maxY] = [Math.max(...pts.map(s => s.x)), Math.max(...pts.map(s => s.y))]

    // scale by smallest value to fill in x- or y-dimension
    const scaleFactor = Math.min(size / maxX, size / maxY)

    // scale to fill
    strokes = strokes.map(pts => pts.map(s => ({ x: s.x * scaleFactor, y: s.y * scaleFactor })))

    return strokes
}

/**
 * Capitalize the given string and replace underscores with spaces
 * @param {String} str
 */
export function capitalize (str) {
    str = str.replace(/_/g, ' ')
    return str.charAt(0).toUpperCase() + str.slice(1)
}
