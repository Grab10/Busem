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

## Video-Dateien austauschen

Die Anwendung nutzt feste Dateinamen in `public/videos/`:

- `general.mp4`
- `stefan.mp4`
- `caro.mp4`

Einfach die Dateien mit denselben Namen ersetzen, dann spielt die App automatisch die neuen Inhalte ab (ohne Code-Änderung).
