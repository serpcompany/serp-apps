/**
 * Converts an SVG element to a PNG image in the browser
 * @param {SVGElement|string} svg - The SVG element or SVG string to convert
 * @param {Object} options - Configuration options
 * @param {number} options.scale - Scale factor for the output image (default: 1)
 * @param {string} options.backgroundColor - Background color of the output image (default: transparent)
 * @param {number} options.quality - Quality of the output image from 0 to 1 (default: 0.92)
 * @returns {Promise<string>} A Promise that resolves with the PNG as a data URL
 */
export function svgToPng(svg: SVGElement | string, options = {}) {
  return new Promise((resolve, reject) => {
    // Default options
    const settings = {
      scale: options.scale || 1,
      backgroundColor: options.backgroundColor || null,
      quality: options.quality || 0.92,
    }

    // Create SVG data URL
    let svgElement
    if (typeof svg === 'string') {
      // If svg is a string, parse it
      const parser = new DOMParser()
      const doc = parser.parseFromString(svg, 'image/svg+xml')
      svgElement = doc.documentElement
    } else {
      // Otherwise, use the provided SVG element
      svgElement = svg
    }

    // Get SVG dimensions
    const svgRect = svgElement.getBoundingClientRect()
    const width = svgRect.width * settings.scale
    const height = svgRect.height * settings.scale

    // Serialize SVG to string if needed
    const svgString =
      typeof svg === 'string'
        ? svg
        : new XMLSerializer().serializeToString(svgElement)

    // Create SVG data URL
    const svgBlob = new Blob([svgString], {
      type: 'image/svg+xml;charset=utf-8',
    })
    const svgUrl = URL.createObjectURL(svgBlob)

    // Create Image element
    const img = new Image()
    img.onload = () => {
      // Create canvas
      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height

      // Get 2D context
      const ctx = canvas.getContext('2d')

      // Apply background if specified
      if (settings.backgroundColor) {
        ctx.fillStyle = settings.backgroundColor
        ctx.fillRect(0, 0, width, height)
      }

      // Draw image to canvas
      ctx.drawImage(img, 0, 0, width, height)

      // Convert canvas to PNG
      const pngDataUrl = canvas.toDataURL('image/png', settings.quality)

      // Clean up
      URL.revokeObjectURL(svgUrl)

      // Return the PNG data URL
      resolve(pngDataUrl)
    }

    img.onerror = (error) => {
      // Clean up
      URL.revokeObjectURL(svgUrl)
      reject(new Error('Error loading SVG: ' + error))
    }

    // Set source and trigger loading
    img.src = svgUrl
  })
}
