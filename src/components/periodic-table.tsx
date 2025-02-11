'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

const generateDeck = () => {
  const memoryCards = [
    'aluminium',
    'fluorine',
    'helium',
    'mercury',
    'plutonium',
    'potassium',
    'radium',
    'sulfur',
  ]

  const deck = [...memoryCards, ...memoryCards]
  return deck.sort(() => Math.random() - 0.5)
}

export default function PeriodicTable() {
  const [cards, setCards] = useState<string[]>(generateDeck())
  const [flipped, setFlipped] = useState<number[]>([])
  const [solved, setSolved] = useState<number[]>([])

  useEffect(() => {
    const checkForMatch = () => {
      const [first, second] = flipped

      if (cards[first] === cards[second]) {
        setSolved([...solved, ...flipped])
      }
      setFlipped([])
    }

    if (flipped.length === 2) {
      setTimeout(() => {
        checkForMatch()
      }, 1000)
    }
  }, [cards, flipped, solved])

  const handleClick = (index: number) => {
    if (!flipped.includes(index) && flipped.length < 2) {
      setFlipped([...flipped, index])
    }
  }

  const gameOver = solved.length === cards.length

  const resetGame = () => {
    setCards(generateDeck())
    setFlipped([])
    setSolved([])
  }

  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-8">Elementos da Tabela Periódica</h1>
      {gameOver && <h2 className="p-5 text-3xl">Você Venceu!</h2>}
      <div className="grid grid-cols-4 gap-5 mt-5">
        {cards.map((card, index) => (
          <div
            className={`flex justify-center text-4xl font-bold text-black items-center rounded-lg w-36 bg-primary h-36 transform cursor-pointer transition-transform duration-300 ${flipped.includes(index) || solved.includes(index) ? 'rotate-180' : ''}`}
            key={index}
            onClick={() => handleClick(index)}
          >
            {flipped.includes(index) || solved.includes(index) ? (
              <Image
                className="rotate-180 rounded-lg"
                src={`/memory-cards/${card}.png`}
                fill
                alt="Memory Card"
              />
            ) : (
              '?'
            )}
          </div>
        ))}
      </div>
      <button
        onClick={resetGame}
        className="w-64 h-14 lg:h-20 text-white border-none outline-none cursor-pointer rounded-lg bg-primary text-xl lg:text-2xl mt-10 mb-8 hover:bg-primary/90"
      >
        Reiniciar
      </button>
    </div>
  )
}
