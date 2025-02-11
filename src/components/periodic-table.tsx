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
    <div className="text-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto lg:w-3/5 xl:w-1/2">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-8">
        Elementos da Tabela Periódica
      </h1>
      {gameOver && (
        <h2 className="p-3 sm:p-5 text-2xl sm:text-3xl">Você Venceu!</h2>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3 md:gap-5 mt-3 sm:mt-5">
        {cards.map((card, index) => (
          <div
            className={`flex justify-center text-2xl sm:text-3xl md:text-4xl font-bold text-white items-center rounded-lg w-full aspect-square bg-primary transform cursor-pointer transition-transform duration-300 ${flipped.includes(index) || solved.includes(index) ? 'rotate-180' : ''}`}
            key={index}
            onClick={() => handleClick(index)}
          >
            {flipped.includes(index) || solved.includes(index) ? (
              <div className="relative w-full h-full">
                <Image
                  className="rotate-180 rounded-lg"
                  src={`/memory-cards/${card}.png`}
                  fill
                  alt="Memory Card"
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                />
              </div>
            ) : (
              '?'
            )}
          </div>
        ))}
      </div>
      <button
        onClick={resetGame}
        className="w-full sm:w-64 h-12 sm:h-14 lg:h-16 text-white border-none outline-none cursor-pointer rounded-lg bg-primary text-lg sm:text-xl lg:text-2xl mt-6 sm:mt-8 mb-6 sm:mb-8 hover:bg-primary/90"
      >
        Reiniciar
      </button>
    </div>
  )
}
