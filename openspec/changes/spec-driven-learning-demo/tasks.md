## 1. Project setup

- [x] 1.1 Scaffold Vite + React + TypeScript app (e.g. `apps/learning-demo/` or repo root)
- [x] 1.2 Add base layout, German UI copy, and simple styling (readable on desktop/tablet)
- [x] 1.3 Add README with dev/build commands and video replacement instructions

## 2. Video assets

- [x] 2.1 Create `public/videos/` with placeholder MP4 files: `general.mp4`, `stefan.mp4`, `caro.mp4` (minimal valid sample or generated stub)
- [x] 2.2 Document that final videos from the owner replace these files by name without code changes

## 3. Persona selection

- [x] 3.1 Build start screen with Stefan and Caro cards/buttons (labels: Software Developer Stefan, Product Owner Caro)
- [x] 3.2 Store selected persona in app state; block continue until one is selected
- [x] 3.3 Navigate to general video step on continue

## 4. Video learning flow

- [x] 4.1 Implement general video step using `<video controls src="/videos/general.mp4">` and Weiter button
- [x] 4.2 Implement role video step: load `stefan.mp4` or `caro.mp4` based on persona
- [x] 4.3 Add step indicator or back navigation optional; ensure linear flow to quiz

## 5. Spec-Driven Development quiz

- [x] 5.1 Add `src/data/quiz.ts` with 3 multiple-choice questions and correct answers (Spec-Driven Development topics)
- [x] 5.2 Build quiz UI: one question at a time or all visible; show correct/incorrect feedback per answer
- [x] 5.3 Show completion screen after all three questions are answered

## 6. Verification

- [ ] 6.1 Manually test full flow for Stefan (persona → general → stefan video → quiz → done)
- [ ] 6.2 Manually test full flow for Caro (persona → general → caro video → quiz → done)
- [x] 6.3 Run production build and confirm videos load from `public/videos/`
