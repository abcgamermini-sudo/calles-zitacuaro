export function extractCoordinatesFromUrl(url: string): string | null {
  if (!url || !url.trim()) return null;

  // Patrones para detectar diferentes tipos de URLs
  const patterns = [
    /@(-?\d+\.\d+),(-?\d+\.\d+)/, // Para URLs como https://www.google.com/maps/@lat,long,...
    /q=(-?\d+\.\d+),(-?\d+\.\d+)/, // Para URLs con parámetros de consulta q=lat,long
    /!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/, // Para URLs estructuradas con !3d lat y !4d long
    // Para el formato de URLs https://maps.app.goo.gl/...
    /https:\/\/maps\.app\.goo\.gl\/([A-Za-z0-9\-_]+)/, // Detecta URLs como https://maps.app.goo.gl/LXfgHEiLxPs9hqM88
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) {
      // Si es una URL como maps.app.goo.gl, extraemos la latitud y longitud
      if (match[1] && match[2]) {
        return `${match[1]}, ${match[2]}`;
      }
    }
  }

  return null; // Si no se encuentra ningún patrón válido
}
