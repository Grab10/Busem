## ADDED Requirements

### Requirement: General intro video for all personas

After persona selection, the application SHALL display a general Spec-Driven Development intro video from `public/videos/general.mp4` (or equivalent static path). The video MUST be playable via standard browser controls.

#### Scenario: General video shown

- **WHEN** the user completes persona selection
- **THEN** the application displays the general intro video with a control to proceed to the next step

#### Scenario: Proceed after general video

- **WHEN** the user chooses to continue after the general video
- **THEN** the application advances to the persona-specific video step

### Requirement: Persona-specific follow-up video

After the general video, the application SHALL display a role-specific video based on the selected persona: `public/videos/stefan.mp4` for Stefan and `public/videos/caro.mp4` for Caro.

#### Scenario: Stefan role video

- **WHEN** the active persona is `stefan` and the user reaches the role-specific step
- **THEN** the application plays `stefan.mp4` with browser video controls

#### Scenario: Caro role video

- **WHEN** the active persona is `caro` and the user reaches the role-specific step
- **THEN** the application plays `caro.mp4` with browser video controls

#### Scenario: Proceed to quiz

- **WHEN** the user chooses to continue after the persona-specific video
- **THEN** the application advances to the quiz step

### Requirement: Video assets are replaceable without code changes

The application SHALL resolve videos by fixed filenames (`general.mp4`, `stefan.mp4`, `caro.mp4`) under the public videos directory so that replacing files on disk updates content without modifying application logic.

#### Scenario: Owner replaces video file

- **WHEN** the file at `public/videos/general.mp4` is replaced with a new MP4 using the same filename
- **THEN** the application serves the new video on the next load without a code change
