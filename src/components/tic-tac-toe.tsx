'use client'

import React, { useState } from 'react'
// import Image from 'next/image'

const data = ['', '', '', '', '', '', '', '', '']

export function TicTacToeGame() {
  let [count, setCount] = useState(0)
  const [lock] = useState(false)

  const toggle = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    num: number,
  ) => {
    if (lock) {
      return 0
    }
    if (count % 2 === 0) {
      // e.target. = <Image src="/whiteX.png" alt="Cross Icon" />
      data[num] = 'x'
      setCount(++count)
    } else {
      // e.target.innerHTML = <Image src="/blueCircle.png" alt="Circle Icon" />
      data[num] = 'o'
      setCount(++count)
    }
  }

  return (
    <div className="text-center">
      <h1 className="mt-[3.125rem] text-[3.75rem] text-white flex justify-center items-center">
        Tic Tac Toe Game
      </h1>
      <div className="h-[37.50rem] w-[35.25rem] flex m-auto">
        <div className="row1">
          <div
            className="flex h-[11.25rem] w-[11.25rem] bg-[#1f3540] border-[0.25rem] border-[#0f1b21] border-solid rounded-[0.75rem] cursor-pointer"
            onClick={(e) => {
              toggle(e, 0)
            }}
          ></div>
          <div
            className="flex h-[11.25rem] w-[11.25rem] bg-[#1f3540] border-[0.25rem] border-[#0f1b21] border-solid rounded-[0.75rem] cursor-pointer"
            onClick={(e) => {
              toggle(e, 1)
            }}
          ></div>
          <div
            className="flex h-[11.25rem] w-[11.25rem] bg-[#1f3540] border-[0.25rem] border-[#0f1b21] border-solid rounded-[0.75rem] cursor-pointer"
            onClick={(e) => {
              toggle(e, 2)
            }}
          ></div>
        </div>
        <div className="row2">
          <div
            className="flex h-[11.25rem] w-[11.25rem] bg-[#1f3540] border-[0.25rem] border-[#0f1b21] border-solid rounded-[0.75rem] cursor-pointer"
            onClick={(e) => {
              toggle(e, 3)
            }}
          ></div>
          <div
            className="flex h-[11.25rem] w-[11.25rem] bg-[#1f3540] border-[0.25rem] border-[#0f1b21] border-solid rounded-[0.75rem] cursor-pointer"
            onClick={(e) => {
              toggle(e, 4)
            }}
          ></div>
          <div
            className="flex h-[11.25rem] w-[11.25rem] bg-[#1f3540] border-[0.25rem] border-[#0f1b21] border-solid rounded-[0.75rem] cursor-pointer"
            onClick={(e) => {
              toggle(e, 5)
            }}
          ></div>
        </div>
        <div className="row3">
          <div
            className="flex h-[11.25rem] w-[11.25rem] bg-[#1f3540] border-[0.25rem] border-[#0f1b21] border-solid rounded-[0.75rem] cursor-pointer"
            onClick={(e) => {
              toggle(e, 6)
            }}
          ></div>
          <div
            className="flex h-[11.25rem] w-[11.25rem] bg-[#1f3540] border-[0.25rem] border-[#0f1b21] border-solid rounded-[0.75rem] cursor-pointer"
            onClick={(e) => {
              toggle(e, 7)
            }}
          ></div>
          <div
            className="flex h-[11.25rem] w-[11.25rem] bg-[#1f3540] border-[0.25rem] border-[#0f1b21] border-solid rounded-[0.75rem] cursor-pointer"
            onClick={(e) => {
              toggle(e, 8)
            }}
          ></div>
        </div>
      </div>
      <button className="w-[15.63rem] h-[6.25rem] border-none outline-none cursor-pointer rounded-[3.13rem] bg-primary text-[1.63rem] mt-[1.56rem] mb-[3.13rem]">
        Reset
      </button>
    </div>
  )
}
