'use client'

import { useEffect, useState } from 'react'
import ReactConfetti from 'react-confetti'

export function Confetti() {
  const [windowDimension, setWindowDimension] = useState({
    width: 0,
    height: 0,
  })

  useEffect(() => {
    const detectSize = () => {
      setWindowDimension({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    detectSize()
    window.addEventListener('resize', detectSize)
    return () => {
      window.removeEventListener('resize', detectSize)
    }
  }, [])

  return (
    <ReactConfetti
      width={windowDimension.width}
      height={windowDimension.height}
      recycle={false}
      numberOfPieces={200}
    />
  )
}
