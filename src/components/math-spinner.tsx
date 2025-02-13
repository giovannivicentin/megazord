'use client'

import { Button } from '@/components/ui/button'
import { useState } from 'react'

type Operator = '+' | '-' | '*' | '/'

const EASY_OPERATORS: Operator[] = ['+', '-']
const MEDIUM_OPERATORS: Operator[] = ['+', '-', '*']
const HARD_OPERATORS: Operator[] = ['+', '-', '*', '/']

interface Question {
  num1: number
  num2: number
  operator: Operator
  correctAnswer: number
}

function calculateAnswer(num1: number, num2: number, operator: Operator) {
  switch (operator) {
    case '+':
      return num1 + num2
    case '-':
      return num1 - num2
    case '*':
      return num1 * num2
    case '/':
      return num1 / num2
    default:
      return 0
  }
}

function generateQuestions(
  operators: Operator[],
  rangeMax: number,
  totalQuestions: number,
) {
  const questions: Question[] = []
  const usedCombinations = new Set<string>()

  while (questions.length < totalQuestions) {
    const operator = operators[Math.floor(Math.random() * operators.length)]
    let num1 = Math.floor(Math.random() * rangeMax) + 1
    let num2 = Math.floor(Math.random() * rangeMax) + 1

    if (operator === '-' && num2 > num1) {
      ;[num1, num2] = [num2, num1]
    }

    if (operator === '/') {
      while (num1 % num2 !== 0) {
        num1 = Math.floor(Math.random() * rangeMax) + 1
        num2 = Math.floor(Math.random() * rangeMax) + 1
      }
    }

    const combo = `${num1}-${operator}-${num2}`
    if (!usedCombinations.has(combo)) {
      usedCombinations.add(combo)
      questions.push({
        num1,
        num2,
        operator,
        correctAnswer: calculateAnswer(num1, num2, operator),
      })
    }
  }

  return questions
}

export default function CalculadoraInfantil() {
  const [level, setLevel] = useState<'fácil' | 'médio' | 'difícil' | null>(null)
  const [questions, setQuestions] = useState<Question[]>([])
  const [userAnswers, setUserAnswers] = useState<string[]>([])
  const [results, setResults] = useState<(boolean | null)[]>([])

  const handleSelectLevel = (selectedLevel: 'fácil' | 'médio' | 'difícil') => {
    setLevel(selectedLevel)
    let operators: Operator[] = []
    let rangeMax = 10
    let totalQuestions = 6
    switch (selectedLevel) {
      case 'fácil':
        operators = EASY_OPERATORS
        rangeMax = 10
        totalQuestions = 6
        break
      case 'médio':
        operators = MEDIUM_OPERATORS
        rangeMax = 20
        totalQuestions = 8
        break
      case 'difícil':
        operators = HARD_OPERATORS
        rangeMax = 25
        totalQuestions = 8
        break
    }
    const generated = generateQuestions(operators, rangeMax, totalQuestions)
    setQuestions(generated)
    setUserAnswers(Array(totalQuestions).fill(''))
    setResults(Array(totalQuestions).fill(null))
  }

  const handleChangeAnswer = (index: number, value: string) => {
    const newAnswers = [...userAnswers]
    newAnswers[index] = value
    setUserAnswers(newAnswers)
  }

  const handleVerify = () => {
    const newResults = questions.map((q, i) => {
      const userValue = Number.parseFloat(userAnswers[i])
      return userValue === q.correctAnswer
    })
    setResults(newResults)
  }

  const handleReset = () => {
    if (level) {
      handleSelectLevel(level)
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-4 sm:p-6 space-y-6 bg-white dark:bg-background shadow-lg rounded-md text-black dark:text-white border border-muted">
      <h1 className="text-2xl sm:text-3xl font-bold text-center">
        Jogo de Cálculo
      </h1>

      <div className="text-center space-y-4">
        <h2 className="text-lg sm:text-xl font-semibold">
          Selecione um nível de dificuldade:
        </h2>
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
          <Button
            onClick={() => handleSelectLevel('fácil')}
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded text-sm sm:text-base"
          >
            Fácil
          </Button>
          <Button
            onClick={() => handleSelectLevel('médio')}
            className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded text-sm sm:text-base"
          >
            Médio
          </Button>
          <Button
            onClick={() => handleSelectLevel('difícil')}
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded text-sm sm:text-base"
          >
            Difícil
          </Button>
        </div>
      </div>

      {level && (
        <div className="space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold text-center">
            Nível: {level.toUpperCase()}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {questions.map((question, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2"
              >
                <label
                  htmlFor={`question-${index}`}
                  className="text-base sm:text-lg font-semibold whitespace-nowrap"
                >
                  {question.num1} {question.operator} {question.num2} =
                </label>
                <div className="flex items-center space-x-2 w-full">
                  <input
                    id={`question-${index}`}
                    type="number"
                    placeholder="Resposta"
                    value={userAnswers[index]}
                    onChange={(e) => handleChangeAnswer(index, e.target.value)}
                    className="no-spinner border p-2 rounded w-full text-sm sm:text-base bg-muted border-muted-foreground"
                    min={0}
                    step="1"
                  />
                  {results[index] !== null && (
                    <span
                      className={`text-lg ${results[index] ? 'text-green-600' : 'text-red-600'}`}
                    >
                      {results[index] ? '✓' : '✗'}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              onClick={handleVerify}
              className="inline-flex items-center dark:text-white justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 w-40"
            >
              Verificar
            </Button>
            <Button
              onClick={handleReset}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background text-black dark:text-white shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 w-40"
            >
              Reiniciar
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
