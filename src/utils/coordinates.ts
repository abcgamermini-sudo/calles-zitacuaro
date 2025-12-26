export function extractCoordinatesFromUrl(url: string): string | null {
  if (!url || !url.trim()) return null

  const patterns = [
    /@(-?\d+\.\d+),(-?\d+\.\d+)/,
    /q=(-?\d+\.\d+),(-?\d+\.\d+)/,
    /!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/,
  ]

  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match) {
      return `${match[1]}, ${match[2]}`
    }
  }

  return null
}
