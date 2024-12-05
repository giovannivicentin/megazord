'use client'

import { useState } from 'react'

function SimpleMathSpinner() {
  const [number1, setNumber1] = useState<number>(0)
  const [number2, setNumber2] = useState<number>(0)
  const [total, setTotal] = useState<number>(0)

  const handleInputChange =
    (setter: React.Dispatch<React.SetStateAction<number>>) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setter(Number(e.target.value))
    }

  const calculate = () => {
    setTotal(number1 + number2)
  }

  return (
    <div className="w-full max-w-sm mx-auto bg-white shadow-md rounded-lg p-6">
      <div className="flex flex-col items-center gap-4">
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
          onClick={calculate}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white text-xl font-bold py-2 px-4 rounded transition duration-200"
        >
          Calculate
        </button>
        <div className="text-center">
          <h2 className="text-3xl font-bold text-black">{total}</h2>
        </div>
      </div>
    </div>
  )
}

export default SimpleMathSpinner
