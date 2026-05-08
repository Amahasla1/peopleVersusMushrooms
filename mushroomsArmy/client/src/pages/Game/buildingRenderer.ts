// buildingRenderer.ts — общие утилиты и рендер зданий

/** Картинка реально готова к отрисовке (не битая, загрузка завершена). */
export function isImageDrawable(img: HTMLImageElement | undefined): img is HTMLImageElement {
  return img !== undefined && img.complete && img.naturalWidth > 0;
}

/**
 * Безопасный drawImage: при сбое canvas возвращает false —
 * тогда вызывающий код рисует fallback.
 */
export function tryDrawImageScaled(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  dx: number,
  dy: number,
  dw: number,
  dh: number
): boolean {
  try {
    ctx.drawImage(img, dx, dy, dw, dh);
    return true;
  } catch {
    return false;
  }
}

const buildingImages: Record<string, HTMLImageElement> = {};

/** Возвращает (и кэширует) картинку здания по ключу и URL. */
export function getBuildingImage(key: string, src: string | undefined): HTMLImageElement | undefined {
  if (src === undefined) return undefined;
  if (!buildingImages[key]) {
    const img = new Image();
    img.src = src;
    buildingImages[key] = img;
  }
  return buildingImages[key];
}
