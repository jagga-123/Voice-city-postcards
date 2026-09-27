import { loadImage } from './imageUtils';

export type BadgeCorner = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

interface StampOptions {
  /** Badge width as a fraction of the image width. */
  scale: number;
  /** Rotation in degrees, for a hand-stamped look. */
  rotate: number;
}

/**
 * Draws a badge SVG onto an image (a data URL from the editor) and returns the
 * result as a PNG data URL. It only uses the editor's public getImage()/reset()
 * API, so the Unlayer integration itself is untouched.
 */
export async function stampBadge(
  baseImage: string,
  badgeSrc: string,
  corner: BadgeCorner,
  { scale, rotate }: StampOptions
): Promise<string> {
  const [base, badge] = await Promise.all([loadImage(baseImage), loadImage(badgeSrc)]);
  const width = base.naturalWidth;
  const height = base.naturalHeight;

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return baseImage;

  ctx.drawImage(base, 0, 0, width, height);

  const badgeWidth = Math.round(width * scale);
  const badgeHeight = Math.round(badgeWidth * (badge.naturalHeight / badge.naturalWidth));
  const margin = Math.round(width * 0.035);
  const x = corner.endsWith('left') ? margin : width - margin - badgeWidth;
  const y = corner.startsWith('top') ? margin : height - margin - badgeHeight;

  ctx.save();
  ctx.translate(x + badgeWidth / 2, y + badgeHeight / 2);
  ctx.rotate((rotate * Math.PI) / 180);
  ctx.shadowColor = 'rgba(0, 0, 0, 0.45)';
  ctx.shadowBlur = badgeWidth * 0.06;
  ctx.shadowOffsetY = badgeWidth * 0.02;
  ctx.drawImage(badge, -badgeWidth / 2, -badgeHeight / 2, badgeWidth, badgeHeight);
  ctx.restore();

  return canvas.toDataURL('image/png');
}
