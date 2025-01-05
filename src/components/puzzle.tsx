'use client'
import { shuffle } from 'lodash'
import { useEffect, useState } from 'react'

interface PuzzlePiece {
  id: number
  row: number
  col: number
}

const PUZZLE_SIZE = 3
const IMAGE_SIZE = 300

export function PuzzleGame() {
  const [pieces, setPieces] = useState<PuzzlePiece[]>([])
  const [board, setBoard] = useState<Array<PuzzlePiece | null>>(
    Array(PUZZLE_SIZE * PUZZLE_SIZE).fill(null),
  )
  const [solved, setSolved] = useState(false)

  const initializeGame = () => {
    const initialPieces: PuzzlePiece[] = []
    for (let row = 0; row < PUZZLE_SIZE; row++) {
      for (let col = 0; col < PUZZLE_SIZE; col++) {
        initialPieces.push({ id: row * PUZZLE_SIZE + col, row, col })
      }
    }
    setPieces(shuffle(initialPieces))
    setBoard(Array(PUZZLE_SIZE * PUZZLE_SIZE).fill(null))
    setSolved(false)
  }

  useEffect(() => {
    initializeGame()
  }, [])

  const handlePieceClick = (piece: PuzzlePiece) => {
    const emptyIndex = board.findIndex((piece) => piece === null)
    if (emptyIndex !== -1) {
      const newBoard = [...board]
      newBoard[emptyIndex] = piece
      setBoard(newBoard)
      setPieces((prev) => prev.filter((p) => p.id !== piece.id))
      checkSolved(newBoard)
    }
  }

  const handleUndoMove = () => {
    const lastPieceIndex = board.findLastIndex((piece) => piece !== null)
    if (lastPieceIndex !== -1) {
      const pieceToReturn = board[lastPieceIndex]
      const newBoard = [...board]
      newBoard[lastPieceIndex] = null
      setBoard(newBoard)
      if (pieceToReturn) {
        setPieces((prev) => [...prev, pieceToReturn])
      }
    }
  }

  const checkSolved = (currentBoard: Array<PuzzlePiece | null>) => {
    const isComplete = currentBoard.every(
      (piece, index) => piece && piece.id === index,
    )
    setSolved(isComplete)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-transparent">
      <h1 className="text-2xl font-bold mb-4">Quebra-Cabeça</h1>

      <div className="flex flex-wrap gap-2 my-8">
        {pieces.map((piece) => (
          <div
            key={piece.id}
            onClick={() => handlePieceClick(piece)}
            className="cursor-pointer border-2 border-blue-500 hover:border-blue-700 transition-all"
            style={{
              width: IMAGE_SIZE / PUZZLE_SIZE,
              height: IMAGE_SIZE / PUZZLE_SIZE,
              backgroundImage: "url('/puzzle-pieces/puzzleGameImage.png')",
              backgroundSize: `${IMAGE_SIZE}px ${IMAGE_SIZE}px`,
              backgroundPosition: `-${piece.col * (IMAGE_SIZE / PUZZLE_SIZE)}px -${piece.row * (IMAGE_SIZE / PUZZLE_SIZE)}px`,
            }}
          />
        ))}
      </div>

      <div
        className={`grid grid-cols-${PUZZLE_SIZE} gap-1 border-2 border-gray-500 p-2`}
      >
        {board.map((piece, index) => (
          <div
            key={index}
            className="w-24 h-24 border-2 border-gray-300 flex items-center justify-center bg-transparent"
            style={{
              backgroundImage: piece
                ? "url('/puzzle-pieces/puzzleGameImage.png')"
                : 'none',
              backgroundSize: `${IMAGE_SIZE}px ${IMAGE_SIZE}px`,
              backgroundPosition: piece
                ? `-${piece.col * (IMAGE_SIZE / PUZZLE_SIZE)}px -${piece.row * (IMAGE_SIZE / PUZZLE_SIZE)}px`
                : 'none',
            }}
          />
        ))}
      </div>

      {solved && (
        <p className="text-green-500 font-bold mt-4">
          Parabéns! Você completou o quebra-cabeça!
        </p>
      )}

      <div className="flex gap-3 mt-3 items-center justify-center">
        <button
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 w-40"
          onClick={() => window.location.reload()}
        >
          Reiniciar Partida
        </button>

        <button
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 w-40"
          onClick={handleUndoMove}
        >
          Desfazer Movimento
        </button>
      </div>
    </div>
  )
}
