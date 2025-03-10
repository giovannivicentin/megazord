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
  const [history, setHistory] = useState<
    { board: Array<PuzzlePiece | null>; pieces: PuzzlePiece[] }[]
  >([])

  const [selectedPiece, setSelectedPiece] = useState<PuzzlePiece | null>(null)

  function initializeGame() {
    const initialPieces: PuzzlePiece[] = []
    for (let row = 0; row < PUZZLE_SIZE; row++) {
      for (let col = 0; col < PUZZLE_SIZE; col++) {
        initialPieces.push({ id: row * PUZZLE_SIZE + col, row, col })
      }
    }
    setPieces(shuffle(initialPieces))
    setBoard(Array(PUZZLE_SIZE * PUZZLE_SIZE).fill(null))
    setSolved(false)
    setHistory([])
    setSelectedPiece(null)
  }

  useEffect(() => {
    initializeGame()
  }, [])

  function handleDragStart(
    e: React.DragEvent<HTMLDivElement>,
    piece: PuzzlePiece,
    from: 'board' | 'pieces',
    index?: number,
  ) {
    e.dataTransfer.setData('pieceId', piece.id.toString())
    e.dataTransfer.setData('from', from)
    if (typeof index === 'number') {
      e.dataTransfer.setData('index', index.toString())
    }
  }

  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
  }

  function handleDrop(
    e: React.DragEvent<HTMLDivElement>,
    dropIndex: number | 'pieces',
  ) {
    e.preventDefault()
    const pieceId = Number(e.dataTransfer.getData('pieceId'))
    const from = e.dataTransfer.getData('from') as 'board' | 'pieces'
    const fromIndex = e.dataTransfer.getData('index')

    if (from === 'pieces' && dropIndex === 'pieces') return
    if (from === 'board' && dropIndex !== 'pieces') return

    let draggedPiece: PuzzlePiece | undefined

    if (from === 'pieces') {
      draggedPiece = pieces.find((p) => p.id === pieceId)
      if (!draggedPiece) return
    } else {
      if (!fromIndex) return
      draggedPiece = board[Number(fromIndex)] || undefined
      if (!draggedPiece) return
    }

    setHistory((prev) => [...prev, { board: [...board], pieces: [...pieces] }])

    if (dropIndex === 'pieces') {
      if (from === 'board') {
        const newBoard = [...board]
        newBoard[Number(fromIndex)] = null
        setBoard(newBoard)
      }
      setPieces((prev) => [...prev, draggedPiece!])
    } else {
      const newBoard = [...board]
      newBoard[dropIndex] = draggedPiece
      setBoard(newBoard)

      if (from === 'pieces') {
        setPieces((prev) => prev.filter((p) => p.id !== pieceId))
      } else {
        const oldBoard = [...board]
        oldBoard[Number(fromIndex)] = null
        setBoard(oldBoard)
        oldBoard[dropIndex] = draggedPiece
        setBoard(oldBoard)
      }

      checkSolved(newBoard)
    }
  }

  function handlePieceClick(piece: PuzzlePiece) {
    if (selectedPiece?.id === piece.id) {
      setSelectedPiece(null)
    } else {
      setSelectedPiece(piece)
    }
  }

  function handleBoardClick(index: number) {
    if (!selectedPiece) return

    if (board[index] !== null) return

    setHistory((prev) => [...prev, { board: [...board], pieces: [...pieces] }])

    const newBoard = [...board]
    newBoard[index] = selectedPiece
    setBoard(newBoard)

    setPieces((prev) => prev.filter((p) => p.id !== selectedPiece.id))

    checkSolved(newBoard)

    setSelectedPiece(null)
  }

  function checkSolved(currentBoard: Array<PuzzlePiece | null>) {
    const isComplete = currentBoard.every(
      (piece, index) => piece && piece.id === index,
    )
    setSolved(isComplete)
  }

  function handleUndoMove() {
    if (!history.length || solved) return
    const lastState = history[history.length - 1]
    setBoard(lastState.board)
    setPieces(lastState.pieces)
    setHistory((prev) => prev.slice(0, prev.length - 1))
  }

  return (
    <div className="flex flex-col items-center justify-center px-8">
      <h1 className="text-3xl font-bold">Quebra-Cabeça</h1>

      {!solved && (
        <div
          className="flex flex-wrap gap-2 my-8 p-2 border-2 border-gray-300"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, 'pieces')}
        >
          {pieces.map((piece) => (
            <div
              key={piece.id}
              draggable
              onDragStart={(e) => handleDragStart(e, piece, 'pieces')}
              onClick={() => handlePieceClick(piece)}
              className={`cursor-grab border-2 transition-all ${
                selectedPiece?.id === piece.id
                  ? 'border-white'
                  : 'border-blue-500 hover:border-blue-700'
              }`}
              style={{
                width: IMAGE_SIZE / PUZZLE_SIZE,
                height: IMAGE_SIZE / PUZZLE_SIZE,
                backgroundImage: "url('/puzzle-pieces/puzzleGameImage.png')",
                backgroundSize: `${IMAGE_SIZE}px ${IMAGE_SIZE}px`,
                backgroundPosition: `-${
                  piece.col * (IMAGE_SIZE / PUZZLE_SIZE)
                }px -${piece.row * (IMAGE_SIZE / PUZZLE_SIZE)}px`,
              }}
            />
          ))}
        </div>
      )}

      <div
        className={`grid grid-cols-${PUZZLE_SIZE} gap-1 border-2 border-gray-500 p-2`}
      >
        {board.map((piece, index) => (
          <div
            key={index}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, index)}
            onClick={() => handleBoardClick(index)}
            className="border-2 border-gray-300 flex items-center justify-center bg-transparent"
            style={{
              width: IMAGE_SIZE / PUZZLE_SIZE,
              height: IMAGE_SIZE / PUZZLE_SIZE,
              backgroundImage: piece
                ? "url('/puzzle-pieces/puzzleGameImage.png')"
                : 'none',
              backgroundSize: `${IMAGE_SIZE}px ${IMAGE_SIZE}px`,
              backgroundPosition: piece
                ? `-${
                    piece.col * (IMAGE_SIZE / PUZZLE_SIZE)
                  }px -${piece.row * (IMAGE_SIZE / PUZZLE_SIZE)}px`
                : 'none',
            }}
          >
            {piece && (
              <div
                draggable={!solved}
                onDragStart={(e) => handleDragStart(e, piece, 'board', index)}
                style={{ width: '100%', height: '100%' }}
              />
            )}
          </div>
        ))}
      </div>

      {solved && (
        <p className="text-green-500 font-bold mt-4">
          Parabéns! Você completou o quebra-cabeça!
        </p>
      )}

      <div className="flex gap-3 mt-3 items-center justify-center">
        <button
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none 
                     focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 
                     bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 w-40"
          onClick={() => window.location.reload()}
        >
          Reiniciar Partida
        </button>

        <button
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none 
                     focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 
                     border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 w-40"
          onClick={handleUndoMove}
          disabled={solved}
        >
          Desfazer Movimento
        </button>
      </div>
    </div>
  )
}
