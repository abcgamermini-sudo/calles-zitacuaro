export function extractCoordinatesFromUrl(url: string): string | null {
  if (!url || !url.trim()) return null;

  const patterns = [
    /@(-?\d+\.\d+),(-?\d+\.\d+)/, // Para URLs como https://www.google.com/maps/@lat,long,...
    /q=(-?\d+\.\d+),(-?\d+\.\d+)/, // Para URLs con parámetros de consulta q=lat,long
    /!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/, // Para URLs estructuradas con !3d lat y !4d long
    /https:\/\/maps\.app\.goo\.gl\/[A-Za-z0-9\-_]+(?:\?d=)?(?:&?([^&=]+)=([^&=]+))+/, // Para el formato de URLs https://maps.app.goo.gl/...
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) {
      return `${match[1]}, ${match[2]}`; // Retorna latitud y longitud
    }
  }

  return null; // Si no se encuentra ningún patrón válido
}
