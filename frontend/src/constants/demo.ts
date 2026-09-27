export interface DemoChapter {
  id: string;
  label: string;
  description: string;
  /** Seconds into the demo recording where this chapter begins. */
  start: number;
}

// A real screen recording of the app (public/demo). The chapter start times
// match that recording and drive the clickable chapter list beside the player.
export const DEMO_CHAPTERS: DemoChapter[] = [
  {
    id: 'location',
    label: 'Location Selection',
    description: 'Browse iconic places and open one to see its highlights.',
    start: 0,
  },
  {
    id: 'editor',
    label: 'Editor',
    description: 'Pick a theme and a message, then open the Unlayer React Image Editor.',
    start: 6.7,
  },
  {
    id: 'customize',
    label: 'Customization',
    description: 'Filters, stickers and Vice City badges, stamped right onto the postcard.',
    start: 19,
  },
  {
    id: 'export',
    label: 'Export',
    description: 'Export a PNG, unlock a badge and find it waiting in your gallery.',
    start: 34.6,
  },
];

export const DEMO_MEDIA = {
  webm: '/demo/demo.webm',
  mp4: '/demo/demo.mp4',
  poster: '/demo/poster.jpg',
} as const;
