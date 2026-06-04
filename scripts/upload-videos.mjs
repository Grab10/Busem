import { config as loadEnv } from 'dotenv'
import { createReadStream, existsSync } from 'node:fs'
import { readdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import {
  TIGRIS_BUCKET,
  TIGRIS_ENDPOINT,
  TIGRIS_REGION,
  TIGRIS_VIDEO_BASE_URL,
} from './tigris-config.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(__dirname, '..')

loadEnv({ path: path.join(repoRoot, '.env') })

const videosDir = path.join(repoRoot, 'public', 'videos')

const endpoint = process.env.AWS_ENDPOINT_URL ?? TIGRIS_ENDPOINT
const bucket =
  process.env.AWS_S3_BUCKET_NAME ?? process.env.AWS_S3_BUCKET ?? TIGRIS_BUCKET
const region =
  process.env.AWS_DEFAULT_REGION ?? process.env.AWS_REGION ?? TIGRIS_REGION

const accessKeyId = process.env.AWS_ACCESS_KEY_ID
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY

if (!accessKeyId || !secretAccessKey) {
  console.error(
    'Missing AWS_ACCESS_KEY_ID or AWS_SECRET_ACCESS_KEY in .env (see .env.example).',
  )
  process.exit(1)
}

if (!existsSync(videosDir)) {
  console.error(`No videos directory at ${videosDir}`)
  process.exit(1)
}

const client = new S3Client({
  region,
  endpoint,
  credentials: { accessKeyId, secretAccessKey },
  forcePathStyle: true,
})

const files = (await readdir(videosDir)).filter((name) => name.endsWith('.mp4'))

if (files.length === 0) {
  console.error(`No .mp4 files found in ${videosDir}`)
  process.exit(1)
}

for (const filename of files) {
  const filePath = path.join(videosDir, filename)
  const body = createReadStream(filePath)

  await client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: filename,
      Body: body,
      ContentType: 'video/mp4',
      ACL: 'public-read',
    }),
  )

  console.log(`Uploaded ${filename} -> s3://${bucket}/${filename}`)
}

console.log(`Done. Base URL for the app: ${TIGRIS_VIDEO_BASE_URL}`)
