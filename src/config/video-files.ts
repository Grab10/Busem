export const VIDEO_FILES = {
  general: 'general.mp4',
  stefan: 'stefan.mp4',
  caro: 'caro.mp4',
} as const

export type VideoFileName = (typeof VIDEO_FILES)[keyof typeof VIDEO_FILES]
