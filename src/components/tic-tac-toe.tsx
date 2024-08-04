'use client'

import React, { useState } from 'react'
import Image from 'next/image'

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

  return (
    <div className="text-center">
      <h1 className="mt-[3.125rem] mb-[3.125rem] text-[3.75rem] text-white flex justify-center items-center">
        {winner ? (
          <>
            Vencedor:
            <Image
              src={`/${winner === 'x' ? 'whiteX' : 'blueCircle'}.png`}
              alt={`${winner === 'x' ? 'Cross' : 'Circle'} Icon`}
              width={70}
              height={70}
              className="ml-4"
            />
          </>
        ) : (
          'Tic Tac Toe Game'
        )}
      </h1>
      <div className="h-[37.50rem] w-[35.25rem] flex m-auto flex-wrap">
        {data.map((value, index) => (
          <div
            key={index}
            className="flex h-[11.25rem] w-[11.25rem] bg-[#1f3540] border-[0.25rem] border-[#0f1b21] border-solid rounded-[0.75rem] cursor-pointer justify-center items-center"
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
        className="w-[15.63rem] h-[6.25rem] border-none outline-none cursor-pointer rounded-[3.13rem] bg-primary text-[1.63rem] mt-[1.56rem] mb-[3.13rem]"
        onClick={reset}
      >
        Reset
      </button>
    </div>
  )
}
