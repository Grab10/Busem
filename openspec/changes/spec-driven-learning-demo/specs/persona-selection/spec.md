## ADDED Requirements

### Requirement: User chooses a learning persona

The application SHALL present exactly two personas on the start screen: **Software Developer Stefan** and **Product Owner Caro**. The user MUST select one persona before continuing.

#### Scenario: Stefan selected

- **WHEN** the user selects Software Developer Stefan and continues
- **THEN** the application records the active persona as `stefan` and advances to the general intro video step

#### Scenario: Caro selected

- **WHEN** the user selects Product Owner Caro and continues
- **THEN** the application records the active persona as `caro` and advances to the general intro video step

#### Scenario: Continue without selection

- **WHEN** the user attempts to continue without selecting a persona
- **THEN** the application SHALL NOT advance and SHALL indicate that a selection is required
