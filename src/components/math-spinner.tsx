'use client'

import { useState } from 'react'

function SimpleMathSpinner() {
  const [number1, setNumber1] = useState<number>(0)
  const [number2, setNumber2] = useState<number>(0)
  const [number3, setNumber3] = useState<number>(0)
  const [number4, setNumber4] = useState<number>(0)
  const [totalSum, setTotalSum] = useState<number>(0)
  const [totalSub, setTotalSub] = useState<number>(0)

  const handleInputChange =
    (setter: React.Dispatch<React.SetStateAction<number>>) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setter(Number(e.target.value))
    }

  const sumCalculate = () => {
    setTotalSum(number1 + number2)
  }

  const subCalculate = () => {
    setTotalSub(number3 - number4)
  }

  return (
    <>
      <div className="flex flex-row gap-10 mt-8 items-center">
        <div className="w-full max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
          <div className="flex flex-col items-center gap-4">
            <h2 className="text-black font-bold text-2xl">Soma</h2>
            <div className="flex items-center gap-2 w-full">
              <input
                type="number"
                placeholder="0"
                value={number1}
                onChange={handleInputChange(setNumber1)}
                className="w-full text-center text-xl p-2 border border-gray-300 rounded"
              />
              <span className="text-2xl text-blue-500">+</span>
              <input
                type="number"
                placeholder="0"
                value={number2}
                onChange={handleInputChange(setNumber2)}
                className="w-full text-center text-xl p-2 border border-gray-300 rounded"
              />
            </div>
            <button
              onClick={sumCalculate}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white text-xl font-bold py-2 px-4 rounded transition duration-200"
            >
              Calcular
            </button>
            <div className="text-center">
              <h2 className="text-3xl font-bold text-black">
                O resultado da soma é {totalSum}
              </h2>
            </div>
          </div>
        </div>
        <div className="w-full max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
          <div className="flex flex-col items-center gap-4">
            <h2 className="text-black font-bold text-2xl">Subtração</h2>
            <div className="flex items-center gap-2 w-full">
              <input
                type="number"
                placeholder="0"
                value={number3}
                onChange={handleInputChange(setNumber3)}
                className="w-full text-center text-xl p-2 border border-gray-300 rounded"
              />
              <span className="text-2xl text-blue-500">-</span>
              <input
                type="number"
                placeholder="0"
                value={number4}
                onChange={handleInputChange(setNumber4)}
                className="w-full text-center text-xl p-2 border border-gray-300 rounded"
              />
            </div>
            <button
              onClick={subCalculate}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white text-xl font-bold py-2 px-4 rounded transition duration-200"
            >
              Calcular
            </button>
            <div className="text-center">
              <h2 className="text-3xl font-bold text-black">
                O resultado da subtração é {totalSub}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SimpleMathSpinner
