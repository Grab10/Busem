# Mini Learning Platform Demo

Eine kleine Web-Anwendung, um Spec-Driven Development als Demo-Lernstrecke zu zeigen:

1. Persona auswählen (`Software Developer Stefan` oder `Product Owner Caro`)
2. Allgemeines Intro-Video ansehen
3. Rollen-spezifisches Video ansehen
4. Quiz mit 3 Fragen beantworten

## Entwicklung starten

**Node.js 20.19+ oder 22+** (Vite 8). Prüfen: `node -v` — bei `v16.x` zuerst upgraden (siehe unten).

```bash
npm install
cp .env.example .env   # einmalig: Access Keys eintragen (siehe .env.example)
npm run dev
```

Ohne Node-Upgrade: `docker compose up --build` → http://localhost:8080

### Node unter Windows aktualisieren

```powershell
winget install OpenJS.NodeJS.LTS
```

Terminal/Cursor danach neu öffnen, dann `node -v` (sollte `v22.x` o. ä. zeigen).

Alle Tigris-Einstellungen liegen in **`.env`** (gitignored). Bucket-Name und Video-URL sind zusätzlich fest in `src/config/tigris.ts` hinterlegt.

## Produktions-Build

```bash
npm run build
npm run preview
```

## Videos (Tigris / Railway)

Die MP4-Dateien liegen **nicht** im Repository, sondern im S3-kompatiblen Bucket:

| Datei | Key im Bucket |
|--------|----------------|
| Allgemeines Intro | `general.mp4` |
| Developer | `stefan.mp4` |
| Product Owner | `caro.mp4` |

**Base-URL** (Standard in Code und `.env`):

`https://t3.storageapi.dev/contained-cart-dvzifke-sx`

Videos ohne neuen App-Build austauschen: dieselben Keys im Bucket ersetzen.

### Upload (einmalig oder bei neuen Dateien)

Keys in `.env` setzen, dann:

```bash
npm run videos:upload
```

Legt lokale Dateien aus `public/videos/*.mp4` in den Bucket. **Access Keys nie ins Git committen** — nur in `.env` (ist in `.gitignore`).

### Öffentlicher Lesezugriff & CORS

Der Browser lädt die Videos direkt vom Bucket. Dafür braucht der Bucket:

1. **Öffentliches Lesen** der drei Objekte (oder des gesamten Buckets) — sonst liefert Tigris `403`.
2. **CORS**: `GET` von deinen App-Origins (z. B. `http://localhost:5173`, Produktions-URL).

Konfiguration im [Tigris-Dashboard](https://t3.storageapi.dev) bzw. über Bucket-Policy/IAM. Nach Änderung die Video-URL im Browser testen.

## Mit Docker starten

Voraussetzung: [Docker](https://www.docker.com/) (inkl. Docker Compose).

```bash
docker compose up --build
```

Die App läuft dann unter: **http://localhost:8080**

Nur Image bauen und Container manuell starten:

```bash
docker build -t busem-learning-demo .
docker run --rm -p 8080:80 busem-learning-demo
```

Optional andere Video-URL beim Build:

```bash
docker build --build-arg VITE_VIDEO_BASE_URL=https://t3.storageapi.dev/contained-cart-dvzifke-sx -t busem-learning-demo .
```

Container stoppen:

```bash
docker compose down
```

## Image aus GHCR (GitHub Actions)

Bei Push auf `main` baut die Workflow-Datei `.github/workflows/docker-ghcr.yml` das Image und pusht es nach GHCR:

`ghcr.io/grab10/busem:latest`

Optional im Repository unter **Settings → Secrets and variables → Actions → Variables**:

`VITE_VIDEO_BASE_URL` = `https://t3.storageapi.dev/contained-cart-dvzifke-sx`

Lokal starten:

```bash
docker pull ghcr.io/grab10/busem:latest
docker run --rm -p 8080:80 ghcr.io/grab10/busem:latest
```

**Hinweis:** Beim ersten Mal unter GitHub → Packages ggf. Package-Sichtbarkeit auf *public* stellen, falls der Pull ohne Login fehlschlägt.
