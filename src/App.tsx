import { useMemo, useState } from 'react'
import { quizQuestions } from './data/quiz'
import './App.css'

type Persona = 'stefan' | 'caro'
type Step = 'persona' | 'general-video' | 'persona-video' | 'quiz' | 'done'

const PERSONA_LABELS: Record<Persona, string> = {
  stefan: 'Software Developer Stefan',
  caro: 'Product Owner Caro',
}

function App() {
  const [step, setStep] = useState<Step>('persona')
  const [selectedPersona, setSelectedPersona] = useState<Persona | null>(null)
  const [personaError, setPersonaError] = useState('')
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [isChecked, setIsChecked] = useState(false)
  const [correctAnswers, setCorrectAnswers] = useState(0)

  const currentQuestion = quizQuestions[currentQuestionIndex]
  const isLastQuestion = currentQuestionIndex === quizQuestions.length - 1

  const stepTitle = useMemo(() => {
    switch (step) {
      case 'persona':
        return 'Schritt 1 von 4: Persona wählen'
      case 'general-video':
        return 'Schritt 2 von 4: Allgemeines Video'
      case 'persona-video':
        return 'Schritt 3 von 4: Rollen-Video'
      case 'quiz':
        return 'Schritt 4 von 4: Quiz'
      case 'done':
        return 'Abschluss'
      default:
        return ''
    }
  }, [step])

  const roleVideo = selectedPersona ? `/videos/${selectedPersona}.mp4` : ''

  const handleContinueFromPersona = () => {
    if (!selectedPersona) {
      setPersonaError('Bitte wähle zuerst eine Persona aus.')
      return
    }

    setPersonaError('')
    setStep('general-video')
  }

  const checkAnswer = () => {
    if (selectedOption === null) {
      return
    }

    if (selectedOption === currentQuestion.correctAnswerIndex) {
      setCorrectAnswers((prev) => prev + 1)
    }
    setIsChecked(true)
  }

  const nextQuestion = () => {
    if (!isChecked) {
      return
    }

    if (isLastQuestion) {
      setStep('done')
      return
    }

    setCurrentQuestionIndex((prev) => prev + 1)
    setSelectedOption(null)
    setIsChecked(false)
  }

  return (
    <main className="app">
      <header className="header">
        <p className="step">{stepTitle}</p>
        <h1>Spec-Driven Development Demo</h1>
        <p className="subtitle">
          Lerne die Grundlagen in einem kurzen Rollen-Training mit Video und Quiz.
        </p>
      </header>

      {step === 'persona' && (
        <section className="card">
          <h2>Wähle deine Rolle</h2>
          <div className="persona-grid">
            <button
              type="button"
              className={`persona ${selectedPersona === 'stefan' ? 'active' : ''}`}
              onClick={() => {
                setSelectedPersona('stefan')
                setPersonaError('')
              }}
            >
              Software Developer Stefan
            </button>
            <button
              type="button"
              className={`persona ${selectedPersona === 'caro' ? 'active' : ''}`}
              onClick={() => {
                setSelectedPersona('caro')
                setPersonaError('')
              }}
            >
              Product Owner Caro
            </button>
          </div>

          {personaError && <p className="error">{personaError}</p>}

          <button type="button" className="primary" onClick={handleContinueFromPersona}>
            Weiter zum allgemeinen Video
          </button>
        </section>
      )}

      {step === 'general-video' && (
        <section className="card">
          <h2>Allgemeines Intro</h2>
          <p>
            Dieses Video erklärt die gemeinsame Grundlage von Spec-Driven Development für
            beide Rollen.
          </p>

          <video controls src="/videos/general.mp4" className="video-player">
            Dein Browser unterstützt kein HTML5-Video.
          </video>

          <button type="button" className="primary" onClick={() => setStep('persona-video')}>
            Weiter zum Rollen-Video
          </button>
        </section>
      )}

      {step === 'persona-video' && selectedPersona && (
        <section className="card">
          <h2>{PERSONA_LABELS[selectedPersona]}: Vertiefung</h2>
          <p>Dieses Video ist auf die gewählte Rolle zugeschnitten.</p>

          <video controls src={roleVideo} className="video-player">
            Dein Browser unterstützt kein HTML5-Video.
          </video>

          <button type="button" className="primary" onClick={() => setStep('quiz')}>
            Weiter zum Quiz
          </button>
        </section>
      )}

      {step === 'quiz' && (
        <section className="card">
          <h2>Quiz: Spec-Driven Development</h2>
          <p>
            Frage {currentQuestionIndex + 1} von {quizQuestions.length}
          </p>

          <h3>{currentQuestion.question}</h3>
          <div className="quiz-options">
            {currentQuestion.options.map((option, index) => (
              <label key={option} className="option">
                <input
                  type="radio"
                  name={`question-${currentQuestion.id}`}
                  checked={selectedOption === index}
                  onChange={() => setSelectedOption(index)}
                  disabled={isChecked}
                />
                <span>{option}</span>
              </label>
            ))}
          </div>

          {!isChecked ? (
            <button
              type="button"
              className="primary"
              onClick={checkAnswer}
              disabled={selectedOption === null}
            >
              Antwort prüfen
            </button>
          ) : (
            <>
              <p
                className={
                  selectedOption === currentQuestion.correctAnswerIndex ? 'feedback ok' : 'feedback bad'
                }
              >
                {selectedOption === currentQuestion.correctAnswerIndex
                  ? 'Richtig!'
                  : `Nicht ganz. Richtig ist: ${currentQuestion.options[currentQuestion.correctAnswerIndex]}`}
              </p>
              <button type="button" className="primary" onClick={nextQuestion}>
                {isLastQuestion ? 'Quiz abschließen' : 'Nächste Frage'}
              </button>
            </>
          )}
        </section>
      )}

      {step === 'done' && (
        <section className="card">
          <h2>Super, du hast die Demo abgeschlossen!</h2>
          <p>
            Du hast {correctAnswers} von {quizQuestions.length} Fragen richtig beantwortet.
          </p>
          <p>
            Persona: <strong>{selectedPersona ? PERSONA_LABELS[selectedPersona] : 'Unbekannt'}</strong>
          </p>
        </section>
      )}
    </main>
  )
}

export default App
