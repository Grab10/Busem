import { VIDEO_URLS } from '../generated/video-urls'
import { VIDEO_FILES, type VideoFileName } from './video-files'

const FILE_TO_KEY = {
  [VIDEO_FILES.general]: 'general',
  [VIDEO_FILES.stefan]: 'stefan',
  [VIDEO_FILES.caro]: 'caro',
} as const satisfies Record<VideoFileName, keyof typeof VIDEO_URLS>

/** Presigned Tigris URLs (generated via npm run videos:presign). */
export function videoUrl(filename: VideoFileName): string {
  const key = FILE_TO_KEY[filename]
  return VIDEO_URLS[key]
}

export { VIDEO_FILES, type VideoFileName } from './video-files'
