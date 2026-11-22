/**
 * Versiones WebP optimizadas de las viñetas (800 y 1600 px de ancho) en
 * /comic/web/capitulo-N/. Los archivos originales se conservan intactos y se
 * siguen usando en «Ampliar». Si una imagen no tiene versión optimizada,
 * se usa la original.
 */
const pattern = /^\/comic\/(capitulo-\d+)\/([^/]+)\.(jpe?g|png)$/i;

export function webSources(src: string) {
  const match = src.match(pattern);
  if (!match) return { src, srcset: undefined as string | undefined };
  const [, chapter, name] = match;
  const base = `/comic/web/${chapter}/${name}`;
  return {
    src: `${base}-1600.webp`,
    small: `${base}-800.webp`,
    srcset: `${base}-800.webp 800w, ${base}-1600.webp 1600w`,
  };
}
