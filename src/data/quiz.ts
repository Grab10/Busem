export type QuizQuestion = {
  id: number
  question: string
  options: string[]
  correctAnswerIndex: number
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: 'Was ist das Hauptziel von Spec-Driven Development?',
    options: [
      'Möglichst schnell Code schreiben, auch ohne klare Anforderungen',
      'Anforderungen zuerst als klare, testbare Spezifikation festlegen',
      'Nur die UI zu dokumentieren und Backend-Details offen zu lassen',
      'Ausschließlich für große Enterprise-Projekte zu arbeiten',
    ],
    correctAnswerIndex: 1,
  },
  {
    id: 2,
    question: 'Welche Aussage passt am besten zu einer guten Spezifikation?',
    options: [
      'Sie ist vage formuliert, damit jedes Team frei interpretieren kann',
      'Sie beschreibt nur technische Details ohne fachlichen Kontext',
      'Sie enthält klare Regeln und überprüfbare Akzeptanzkriterien',
      'Sie wird nur einmal geschrieben und danach nie wieder aktualisiert',
    ],
    correctAnswerIndex: 2,
  },
  {
    id: 3,
    question: 'Wie hilft Spec-Driven Development Product Ownern und Entwicklern?',
    options: [
      'Es reduziert Abstimmung, weil jeder getrennt arbeitet',
      'Es schafft ein gemeinsames Verständnis vor der Implementierung',
      'Es ersetzt alle Tests durch Spezifikationen',
      'Es macht Reviews überflüssig',
    ],
    correctAnswerIndex: 1,
  },
]
