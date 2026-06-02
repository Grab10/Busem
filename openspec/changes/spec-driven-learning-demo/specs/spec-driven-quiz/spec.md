## ADDED Requirements

### Requirement: Quiz with three Spec-Driven Development questions

After the persona-specific video, the application SHALL present a quiz of exactly three multiple-choice questions about Spec-Driven Development. The same three questions SHALL be shown regardless of whether Stefan or Caro was selected.

#### Scenario: Quiz displayed after videos

- **WHEN** the user completes the persona-specific video step and continues
- **THEN** the application displays three quiz questions with selectable answers

### Requirement: Per-question feedback

For each question, the application SHALL allow the user to submit or confirm an answer and SHALL show whether the answer was correct or incorrect before or when moving to the next question.

#### Scenario: Correct answer feedback

- **WHEN** the user selects the correct answer for a question and confirms
- **THEN** the application indicates the answer was correct

#### Scenario: Incorrect answer feedback

- **WHEN** the user selects an incorrect answer and confirms
- **THEN** the application indicates the answer was incorrect and MAY show the correct option

### Requirement: Quiz completion

After all three questions have been answered, the application SHALL show a completion state (e.g. thank-you or summary) so the user knows the demo flow is finished.

#### Scenario: All questions answered

- **WHEN** the user has answered all three questions
- **THEN** the application displays a completion message
