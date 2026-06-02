## Why

Teams need a lightweight way to introduce Spec-Driven Development to different roles without a full LMS. A focused browser demo lets Product Owners and Software Developers experience the same core concepts through role-appropriate content and validates understanding with a short quiz.

## What Changes

- New single-page web application (mini online learning platform) for a Spec-Driven Development demo
- Persona selection screen: **Software Developer Stefan** or **Product Owner Caro**
- Shared intro video for both personas, then persona-specific follow-up video
- Final quiz page with 3 questions on Spec-Driven Development (same quiz for both personas)
- Placeholder video assets in the repo (general + role-specific slots); real videos supplied later by the project owner
- Static, client-side flow—no backend, accounts, or progress persistence required for the demo

## Capabilities

### New Capabilities

- `persona-selection`: Choose Stefan (developer) or Caro (product owner) to start the learning path
- `video-learning-flow`: Sequential video experience—general intro, then persona-specific content
- `spec-driven-quiz`: Three-question quiz on Spec-Driven Development as the closing step

### Modified Capabilities

<!-- none -->

## Impact

- New frontend app (or new module) in the repository
- Static assets under a dedicated folder (e.g. `public/videos/` or `assets/videos/`) for placeholder and future replacement videos
- No API or database changes for the initial demo
