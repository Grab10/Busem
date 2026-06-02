## Context

The repository currently has no application code—only OpenSpec scaffolding. The demo must run as a simple web app in the browser, suitable for workshops or stakeholder walkthroughs. Two personas (Stefan, developer; Caro, product owner) share a common Spec-Driven Development intro, then receive role-tailored videos. The project owner will replace placeholder videos later; the app must use stable, predictable file paths.

## Goals / Non-Goals

**Goals:**

- Single-page or few-step client-side flow: persona → general video → role video → quiz
- Clear UI labels in German (personas, navigation, quiz feedback)
- Swap videos without code changes (convention-based filenames in `public/videos/`)
- Include a minimal placeholder video file so the flow is testable before real assets arrive
- Responsive layout usable on laptop and tablet

**Non-Goals:**

- User accounts, authentication, or server-side progress storage
- CMS, analytics, certificates, or multi-course catalog
- Localized content beyond German for this demo
- Scoring persistence or leaderboard

## Decisions

### Stack: Vite + React + TypeScript

**Rationale:** Fast local dev, simple static build, easy video serving from `public/`. No backend required.

**Alternatives:** Plain HTML/JS (faster but harder to maintain state across steps); Next.js (unnecessary SSR complexity for a static demo).

### Routing: In-app step state (no URL router required)

**Rationale:** Linear flow with four steps (`persona` → `general-video` → `role-video` → `quiz`). React state or a small step enum is sufficient.

**Alternatives:** React Router with paths—useful if deep-linking is needed later; not required for v1.

### Video asset layout

| File | Purpose |
|------|---------|
| `public/videos/general.mp4` | Shared intro (placeholder until replaced) |
| `public/videos/stefan.mp4` | Developer-specific content |
| `public/videos/caro.mp4` | Product-owner-specific content |

HTML5 `<video controls>` with `src` pointing to these paths. Persona choice selects which role video plays in step 3.

### Quiz: Client-side only

Three multiple-choice questions with immediate feedback (correct/incorrect per question). No minimum score gate for demo completion—user can finish after answering all three.

Question copy and correct answers live in a small config module (e.g. `src/data/quiz.ts`) for easy editing.

### Placeholder video

Ship a tiny valid MP4 (or a documented script to generate one) under `public/videos/` so developers can run the app without the owner's final recordings. README note: replace `general.mp4`, `stefan.mp4`, `caro.mp4` when ready.

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| Large video files bloat the repo | Document external hosting option later; v1 uses local `public/videos/` with placeholders |
| Browser autoplay policies | Do not autoplay; user starts playback via native controls |
| Quiz answers visible in client bundle | Acceptable for internal demo; not a secure assessment |
| Placeholder video may not represent final quality | Clearly label UI that content is demo/placeholder |

## Migration Plan

1. Scaffold Vite React app at repo root or `apps/learning-demo/`
2. Add placeholder videos and persona/quiz data
3. Build and verify flow for both personas
4. Owner drops in final MP4s with same filenames (no redeploy logic beyond static file swap)

## Open Questions

- Exact quiz questions and answer options (to be confirmed with owner; use sensible Spec-Driven Development defaults in implementation)
- Preferred repo location: root vs. `apps/learning-demo/` (default: `apps/learning-demo/` if monorepo grows; root acceptable for minimal repo)
