# Build
FROM node:22-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

ARG VITE_VIDEO_BASE_URL=https://t3.storageapi.dev/contained-cart-dvzifke-sx
ENV VITE_VIDEO_BASE_URL=${VITE_VIDEO_BASE_URL}

ARG AWS_ENDPOINT_URL=https://t3.storageapi.dev
ARG AWS_S3_BUCKET_NAME=contained-cart-dvzifke-sx
ARG AWS_DEFAULT_REGION=auto
ARG AWS_ACCESS_KEY_ID
ARG AWS_SECRET_ACCESS_KEY

ENV AWS_ENDPOINT_URL=${AWS_ENDPOINT_URL} \
    AWS_S3_BUCKET_NAME=${AWS_S3_BUCKET_NAME} \
    AWS_DEFAULT_REGION=${AWS_DEFAULT_REGION} \
    AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID} \
    AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY}

RUN node scripts/generate-video-urls.mjs && npm run build

# Run (static files via nginx; video URLs are presigned in the build output)
FROM nginx:1.27-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
