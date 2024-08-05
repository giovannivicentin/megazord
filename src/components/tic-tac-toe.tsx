'use client'

import { useTheme } from 'next-themes'
import Image from 'next/image'
import { useState } from 'react'

const initialData = ['', '', '', '', '', '', '', '', '']

export function TicTacToeGame() {
  const [data, setData] = useState<string[]>(initialData)
  const [count, setCount] = useState(0)
  const [lock, setLock] = useState(false)
  const [winner, setWinner] = useState<string | null>(null)

  const toggle = (num: number) => {
    if (lock || data[num] !== '') {
      return
    }

    const newData = [...data]
    newData[num] = count % 2 === 0 ? 'x' : 'o'

    setData(newData)
    setCount(count + 1)
    checkWin(newData)
  }

  const checkWin = (currentData: string[]) => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]

    for (const combination of winningCombinations) {
      const [a, b, c] = combination
      if (
        currentData[a] &&
        currentData[a] === currentData[b] &&
        currentData[a] === currentData[c]
      ) {
        won(currentData[a])
        return
      }
    }
  }

  const won = (winner: string) => {
    setLock(true)
    setWinner(winner)
  }

  const reset = () => {
    setLock(false)
    setData(initialData)
    setCount(0)
    setWinner(null)
  }

  const { theme } = useTheme()

  const isDarkMode = theme === 'dark'

  return (
    <div className="text-center">
      <h1 className="mt-12 mb-12 text-6xl text-black dark:text-white flex justify-center items-center">
        {winner ? (
          <>
            Vencedor:
            <Image
              src={`/${winner === 'x' ? (isDarkMode ? 'whiteX' : 'blackX') : 'blueCircle'}.png`}
              alt={`${winner === 'x' ? 'Cross' : 'Circle'} Icon`}
              width={70}
              height={70}
            />
          </>
        ) : (
          'Tic Tac Toe Game'
        )}
      </h1>
      <div className="h-1/2 w-5/12 flex m-auto flex-wrap justify-center">
        {data.map((value, index) => (
          <div
            key={index}
            className="flex h-44 w-44 bg-brand-color-600 border-4 border-brand-color-700 border-solid rounded-md cursor-pointer justify-center items-center"
            onClick={() => toggle(index)}
          >
            {value === 'x' && (
              <Image
                src="/whiteX.png"
                alt="Cross Icon"
                width={100}
                height={100}
              />
            )}
            {value === 'o' && (
              <Image
                src="/blueCircle.png"
                alt="Circle Icon"
                width={100}
                height={100}
              />
            )}
          </div>
        ))}
      </div>
      <button
        className="w-64 h-24 border-none outline-none cursor-pointer rounded-3xl bg-primary text-2xl mt-6 mb-8 hover:bg-primary/90"
        onClick={reset}
      >
        Reiniciar
      </button>
    </div>
  )
}
