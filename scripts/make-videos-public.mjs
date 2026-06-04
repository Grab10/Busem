import { config as loadEnv } from 'dotenv'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { PutObjectAclCommand, S3Client } from '@aws-sdk/client-s3'
import {
  TIGRIS_BUCKET,
  TIGRIS_ENDPOINT,
  TIGRIS_REGION,
  TIGRIS_VIDEO_BASE_URL,
} from './tigris-config.mjs'

const VIDEO_KEYS = ['general.mp4', 'stefan.mp4', 'caro.mp4']

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(__dirname, '..')

loadEnv({ path: path.join(repoRoot, '.env') })

const endpoint = process.env.AWS_ENDPOINT_URL ?? TIGRIS_ENDPOINT
const bucket =
  process.env.AWS_S3_BUCKET_NAME ?? process.env.AWS_S3_BUCKET ?? TIGRIS_BUCKET
const region =
  process.env.AWS_DEFAULT_REGION ?? process.env.AWS_REGION ?? TIGRIS_REGION

const accessKeyId = process.env.AWS_ACCESS_KEY_ID
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY

if (!accessKeyId || !secretAccessKey) {
  console.error('Missing AWS_ACCESS_KEY_ID or AWS_SECRET_ACCESS_KEY in .env')
  process.exit(1)
}

const client = new S3Client({
  region,
  endpoint,
  credentials: { accessKeyId, secretAccessKey },
  forcePathStyle: true,
})

for (const key of VIDEO_KEYS) {
  await client.send(
    new PutObjectAclCommand({
      Bucket: bucket,
      Key: key,
      ACL: 'public-read',
    }),
  )
  console.log(`public-read -> ${TIGRIS_VIDEO_BASE_URL}/${key}`)
}

console.log('Done. Test in browser:', `${TIGRIS_VIDEO_BASE_URL}/${VIDEO_KEYS[0]}`)
