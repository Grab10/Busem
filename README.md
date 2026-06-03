# Mini Learning Platform Demo

Eine kleine Web-Anwendung, um Spec-Driven Development als Demo-Lernstrecke zu zeigen:

1. Persona auswählen (`Software Developer Stefan` oder `Product Owner Caro`)
2. Allgemeines Intro-Video ansehen
3. Rollen-spezifisches Video ansehen
4. Quiz mit 3 Fragen beantworten

## Entwicklung starten

```bash
npm install
npm run dev
```

## Produktions-Build

```bash
npm run build
npm run preview
```

## Mit Docker starten

Voraussetzung: [Docker](https://www.docker.com/) (inkl. Docker Compose).

```bash
docker compose up --build
```

Die App läuft dann unter: **http://localhost:8080**

Nur Image bauen und Container manuell starten:

```bash
docker build -t busem-learning-demo .
docker run --rm -p 8080:80 -v "%cd%/public/videos:/usr/share/nginx/html/videos:ro" busem-learning-demo
```

Unter Linux/macOS den Volume-Pfad anpassen, z. B. `-v "$(pwd)/public/videos:/usr/share/nginx/html/videos:ro"`.

Container stoppen:

```bash
docker compose down
```

## Image aus GHCR (GitHub Actions)

Bei Push auf `main` baut die Workflow-Datei `.github/workflows/docker-ghcr.yml` das Image und pusht es nach GHCR:

`ghcr.io/grab10/busem:latest`

Lokal starten:

```bash
docker pull ghcr.io/grab10/busem:latest
docker run --rm -p 8080:80 ghcr.io/grab10/busem:latest
```

**Hinweis:** Beim ersten Mal unter GitHub → Packages ggf. Package-Sichtbarkeit auf *public* stellen, falls der Pull ohne Login fehlschlägt.

## Video-Dateien austauschen

Die Anwendung nutzt feste Dateinamen in `public/videos/`:

- `general.mp4`
- `stefan.mp4`
- `caro.mp4`

Einfach die Dateien mit denselben Namen ersetzen, dann spielt die App automatisch die neuen Inhalte ab (ohne Code-Änderung).
