'use client'

import { useEffect, useState } from 'react'

interface WinningLineProps {
  start: number
  end: number
}

export function WinningLine({ start, end }: WinningLineProps) {
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 50)
    return () => clearTimeout(timer)
  }, [])

  const getCoordinates = (index: number) => {
    const col = index % 3
    const row = Math.floor(index / 3)
    return { x: col * 100 + 50, y: row * 100 + 50 }
  }

  const startCoord = getCoordinates(start)
  const endCoord = getCoordinates(end)

  const lineLength = Math.sqrt(
    Math.pow(endCoord.x - startCoord.x, 2) +
      Math.pow(endCoord.y - startCoord.y, 2),
  )

  return (
    <svg className="absolute inset-0 h-full w-full">
      <line
        x1={startCoord.x}
        y1={startCoord.y}
        x2={endCoord.x}
        y2={endCoord.y}
        stroke="currentColor"
        className="text-primary"
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray={lineLength}
        strokeDashoffset={animate ? 0 : lineLength}
        style={{ transition: 'stroke-dashoffset 700ms ease-out' }}
      />
    </svg>
  )
}
