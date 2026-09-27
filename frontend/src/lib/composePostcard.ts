import type { ThemeName } from '@/types/postcard';
import { hexToRgba, loadImage } from './imageUtils';

export interface CanvasTheme {
  accent: string;
  scrim: string;
  text: string;
  subText: string;
  font: string;
  glow?: string;
}

const SANS = '"Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
const SERIF = 'Georgia, "Times New Roman", serif';
const MONO = '"Courier New", Courier, monospace';

// Hex counterparts of the Tailwind classes in constants/themes.ts, so the
// text placed on the photo matches the postcard theme the user picked.
export const CANVAS_THEMES: Record<ThemeName, CanvasTheme> = {
  Sunset: { accent: '#fb923c', scrim: '#3b0a3f', text: '#fff7ed', subText: '#fed7aa', font: SANS },
  Neon: { accent: '#22d3ee', scrim: '#020617', text: '#ffffff', subText: '#a5f3fc', font: MONO, glow: '#ec4899' },
  Retro: { accent: '#f59e0b', scrim: '#451a03', text: '#fffbeb', subText: '#fde68a', font: SERIF },
  Luxury: { accent: '#eab308', scrim: '#09090b', text: '#fafafa', subText: '#e4e4e7', font: SERIF },
  Tropical: { accent: '#34d399', scrim: '#064e3b', text: '#f0fdfa', subText: '#99f6e4', font: SANS },
};

export interface ComposeOptions {
  imageUrl: string;
  title: string;
  message: string;
  theme: ThemeName;
  locationName: string;
  maxWidth?: number;
}

function roundedRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function setLetterSpacing(ctx: CanvasRenderingContext2D, px: number) {
  (ctx as CanvasRenderingContext2D & { letterSpacing?: string }).letterSpacing = `${px}px`;
}

function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number, maxLines: number): string[] {
  const lines: string[] = [];
  for (const paragraph of text.split('\n')) {
    let line = '';
    for (const word of paragraph.split(/\s+/).filter(Boolean)) {
      const candidate = line ? `${line} ${word}` : word;
      if (ctx.measureText(candidate).width > maxWidth && line) {
        lines.push(line);
        line = word;
      } else {
        line = candidate;
      }
    }
    if (line) lines.push(line);
  }
  if (lines.length > maxLines) {
    lines.length = maxLines;
    lines[maxLines - 1] = `${lines[maxLines - 1].replace(/\s*\S*$/, '')}…`;
  }
  return lines;
}

/**
 * Places the user's title and message (and a location tag) onto the location
 * photo, styled for the chosen theme, and returns a JPEG data URL for the
 * editor to open. This is what makes the "text is placed for you" promise
 * real without depending on the paid Unlayer AI assistant.
 */
export async function composePostcardImage(options: ComposeOptions): Promise<string> {
  const img = await loadImage(options.imageUrl);
  const width = Math.min(img.naturalWidth, options.maxWidth ?? 1600);
  const height = Math.round((width * img.naturalHeight) / img.naturalWidth);

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return options.imageUrl;

  ctx.drawImage(img, 0, 0, width, height);

  const theme = CANVAS_THEMES[options.theme] ?? CANVAS_THEMES.Sunset;
  const title = options.title.trim();
  const message = options.message.trim();
  const pad = Math.round(width * 0.05);

  // Location tag, top-left
  const tagSize = Math.round(width * 0.017);
  ctx.font = `700 ${tagSize}px ${SANS}`;
  setLetterSpacing(ctx, tagSize * 0.16);
  const tagText = options.locationName.toUpperCase();
  const tagPadX = tagSize * 1.1;
  const tagH = tagSize * 2.4;
  const tagW = ctx.measureText(tagText).width + tagPadX * 2 + tagSize * 1.2;
  roundedRect(ctx, pad, pad, tagW, tagH, tagH / 2);
  ctx.fillStyle = 'rgba(2, 6, 23, 0.6)';
  ctx.fill();
  ctx.beginPath();
  ctx.arc(pad + tagPadX, pad + tagH / 2, tagSize * 0.32, 0, Math.PI * 2);
  ctx.fillStyle = theme.accent;
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.textBaseline = 'middle';
  ctx.fillText(tagText, pad + tagPadX + tagSize * 1.1, pad + tagH / 2 + tagSize * 0.05);
  setLetterSpacing(ctx, 0);

  if (title || message) {
    // Legibility scrim behind the text
    const scrimHeight = Math.round(height * 0.55);
    const scrim = ctx.createLinearGradient(0, height - scrimHeight, 0, height);
    scrim.addColorStop(0, hexToRgba(theme.scrim, 0));
    scrim.addColorStop(1, hexToRgba(theme.scrim, 0.86));
    ctx.fillStyle = scrim;
    ctx.fillRect(0, height - scrimHeight, width, scrimHeight);

    const maxTextWidth = width - pad * 2;
    ctx.textBaseline = 'alphabetic';

    // Measure first, then draw the block bottom-up
    const titleSize = Math.round(width * 0.054);
    const messageSize = Math.round(width * 0.027);
    ctx.font = `800 ${titleSize}px ${theme.font}`;
    setLetterSpacing(ctx, titleSize * 0.05);
    const titleLines = title ? wrapText(ctx, title.toUpperCase(), maxTextWidth, 2) : [];
    ctx.font = `500 ${messageSize}px ${theme.font}`;
    setLetterSpacing(ctx, 0);
    const messageLines = message ? wrapText(ctx, message, maxTextWidth * 0.8, 3) : [];

    const titleLead = titleSize * 1.12;
    const messageLead = messageSize * 1.45;
    const barGap = titleSize * 0.5;
    const blockHeight =
      (titleLines.length ? titleLines.length * titleLead + barGap + width * 0.008 : 0) +
      (messageLines.length ? messageLines.length * messageLead + (titleLines.length ? titleSize * 0.35 : 0) : 0);

    let y = height - pad - blockHeight;

    if (titleLines.length) {
      ctx.fillStyle = theme.accent;
      ctx.fillRect(pad, y, width * 0.09, width * 0.008);
      y += width * 0.008 + barGap;

      ctx.font = `800 ${titleSize}px ${theme.font}`;
      setLetterSpacing(ctx, titleSize * 0.05);
      ctx.fillStyle = theme.text;
      if (theme.glow) {
        ctx.shadowColor = theme.glow;
        ctx.shadowBlur = titleSize * 0.5;
      } else {
        ctx.shadowColor = 'rgba(0, 0, 0, 0.55)';
        ctx.shadowBlur = titleSize * 0.18;
      }
      for (const line of titleLines) {
        y += titleLead;
        ctx.fillText(line, pad, y - titleLead * 0.18);
      }
      ctx.shadowBlur = 0;
      setLetterSpacing(ctx, 0);
      if (messageLines.length) y += titleSize * 0.35;
    }

    if (messageLines.length) {
      ctx.font = `500 ${messageSize}px ${theme.font}`;
      ctx.fillStyle = theme.subText;
      ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
      ctx.shadowBlur = messageSize * 0.3;
      for (const line of messageLines) {
        y += messageLead;
        ctx.fillText(line, pad, y - messageLead * 0.25);
      }
      ctx.shadowBlur = 0;
    }
  }

  return canvas.toDataURL('image/jpeg', 0.92);
}
