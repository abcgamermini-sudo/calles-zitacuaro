export function extractCoordinatesFromUrl(url: string): string | null {
  if (!url || !url.trim()) return null

  url = url.trim()

  const coordPattern = /(-?\d+\.?\d*)\s*,\s*(-?\d+\.?\d*)/
  const coordMatch = url.match(coordPattern)
  if (coordMatch) {
    const lat = parseFloat(coordMatch[1])
    const lng = parseFloat(coordMatch[2])
    if (isValidCoordinate(lat, lng)) {
      return `${lat}, ${lng}`
    }
  }

  const patterns = [
    /@(-?\d+\.?\d*),(-?\d+\.?\d*)/,
    /q=(-?\d+\.?\d*),(-?\d+\.?\d*)/,
    /!3d(-?\d+\.?\d*)!4d(-?\d+\.?\d*)/,
  ]

  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match) {
      const lat = parseFloat(match[1])
      const lng = parseFloat(match[2])
      if (isValidCoordinate(lat, lng)) {
        return `${lat}, ${lng}`
      }
    }
  }

  return null
}

function isValidCoordinate(lat: number, lng: number): boolean {
  return lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180
}
