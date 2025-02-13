'use client'

import { useState, useEffect, useCallback } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { cn } from '@/lib/utils'
import { AlertCircle } from 'lucide-react'
import { Button } from './ui/button'
import { GameBoard } from './checkers/game-board'
import { GameInfo } from './checkers/game-info'
import { MoveHistory } from './checkers/move-history'
import { Confetti } from './checkers/confetti'

const BOARD_SIZE = 10

type PiecePosition = {
  row: number
  col: number
} | null

type Piece = 'white' | 'black' | 'white-king' | 'black-king' | null

type GameState = {
  board: Piece[][]
  turn: 'white' | 'black'
  moveHistory: string[]
  mustCapture: boolean
  lastMovedPiece: PiecePosition
}

export function CheckersGame() {
  const initialBoard: Piece[][] = Array(BOARD_SIZE)
    .fill(null)
    .map((_, row) =>
      Array(BOARD_SIZE)
        .fill(null)
        .map((_, col) =>
          row < 4 && (row + col) % 2 !== 0
            ? 'black'
            : row > 5 && (row + col) % 2 !== 0
              ? 'white'
              : null,
        ),
    )

  const [gameStates, setGameStates] = useState<GameState[]>([
    {
      board: initialBoard,
      turn: 'white',
      moveHistory: [],
      mustCapture: false,
      lastMovedPiece: null,
    },
  ])
  const [currentStateIndex, setCurrentStateIndex] = useState(0)
  const [selectedPiece, setSelectedPiece] = useState<PiecePosition>(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [winner, setWinner] = useState<'white' | 'black' | null>(null)

  const currentState = gameStates[currentStateIndex] || {
    board: initialBoard,
    turn: 'white',
    moveHistory: [],
    mustCapture: false,
    lastMovedPiece: null,
  }

  const {
    board,
    turn,
    moveHistory = [],
    mustCapture,
    lastMovedPiece,
  } = currentState

  const checkWinner = useCallback(() => {
    const whitePieces = board
      .flat()
      .filter((piece) => piece?.includes('white')).length
    const blackPieces = board
      .flat()
      .filter((piece) => piece?.includes('black')).length

    if (whitePieces === 0) return 'black'
    if (blackPieces === 0) return 'white'
    return null
  }, [board])

  useEffect(() => {
    const newWinner = checkWinner()
    if (newWinner) {
      setWinner(newWinner)
    }
  }, [checkWinner])

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage('')
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [errorMessage])

  const isValidMove = (
    fromRow: number,
    fromCol: number,
    toRow: number,
    toCol: number,
  ): boolean => {
    const piece = board[fromRow][fromCol]
    if (!piece || board[toRow][toCol] !== null) return false
    if (!piece.includes(turn)) return false

    const isKing = piece.includes('king')
    const rowDiff = toRow - fromRow
    const colDiff = toCol - fromCol

    if (Math.abs(rowDiff) !== Math.abs(colDiff)) return false

    if (isKing) {
      return isValidKingMove(fromRow, fromCol, toRow, toCol)
    } else {
      return isValidRegularMove(fromRow, fromCol, toRow, toCol, piece)
    }
  }

  const isValidKingMove = (
    fromRow: number,
    fromCol: number,
    toRow: number,
    toCol: number,
  ): boolean => {
    const rowStep = toRow > fromRow ? 1 : -1
    const colStep = toCol > fromCol ? 1 : -1
    let row = fromRow + rowStep
    let col = fromCol + colStep
    let capturedPiece = null

    while (row !== toRow && col !== toCol) {
      if (board[row][col]) {
        if (capturedPiece || board[row][col]?.includes(turn)) return false
        capturedPiece = board[row][col]
      }
      row += rowStep
      col += colStep
    }

    return !mustCapture || !!capturedPiece
  }

  const isValidRegularMove = (
    fromRow: number,
    fromCol: number,
    toRow: number,
    toCol: number,
    piece: Piece,
  ): boolean => {
    const rowDiff = toRow - fromRow
    const colDiff = Math.abs(toCol - fromCol)

    if (colDiff > 2) return false

    if (colDiff === 1 && !mustCapture) {
      return piece?.includes('white') ? rowDiff < 0 : rowDiff > 0
    }

    if (colDiff === 2) {
      const midRow = (fromRow + toRow) / 2
      const midCol = (fromCol + toCol) / 2
      const capturedPiece = board[midRow][midCol]
      return !!capturedPiece && !capturedPiece.includes(turn)
    }

    return false
  }

  const movePiece = (
    fromRow: number,
    fromCol: number,
    toRow: number,
    toCol: number,
  ) => {
    const newBoard = board.map((row) => [...row])
    let piece = newBoard[fromRow][fromCol]

    if (piece?.includes('white') && toRow === 0) piece = 'white-king'
    if (piece?.includes('black') && toRow === BOARD_SIZE - 1)
      piece = 'black-king'

    newBoard[toRow][toCol] = piece
    newBoard[fromRow][fromCol] = null

    const rowDiff = toRow - fromRow
    const colDiff = toCol - fromCol
    let captured = false

    if (Math.abs(rowDiff) >= 2 && Math.abs(colDiff) >= 2) {
      const rowStep = rowDiff > 0 ? 1 : -1
      const colStep = colDiff > 0 ? 1 : -1
      let row = fromRow + rowStep
      let col = fromCol + colStep

      while (row !== toRow && col !== toCol) {
        if (newBoard[row][col]) {
          newBoard[row][col] = null
          captured = true
          break
        }
        row += rowStep
        col += colStep
      }
    }

    const newMoveHistory = [
      ...moveHistory,
      `${fromRow},${fromCol} para ${toRow},${toCol}`,
    ]
    const canCaptureAgain =
      captured && canCapture(toRow, toCol, newBoard, piece)
    const newTurn = canCaptureAgain
      ? turn
      : turn === 'white'
        ? 'black'
        : 'white'

    setGameStates((prevStates) => [
      ...prevStates.slice(0, currentStateIndex + 1),
      {
        board: newBoard,
        turn: newTurn,
        moveHistory: newMoveHistory,
        mustCapture: canCaptureAgain,
        lastMovedPiece: canCaptureAgain ? { row: toRow, col: toCol } : null,
      },
    ])
    setCurrentStateIndex((prevIndex) => prevIndex + 1)

    return { captured, canCaptureAgain }
  }

  const canCapture = (
    row: number,
    col: number,
    currentBoard: Piece[][] = board,
    piece: Piece = currentBoard[row][col],
  ): boolean => {
    if (!piece) return false

    const isKing = piece.includes('king')
    const directions = [-1, 1]

    for (const rowDir of directions) {
      for (const colDir of directions) {
        if (isKing) {
          let newRow = row + rowDir
          let newCol = col + colDir
          let foundOpponent = false

          while (
            newRow >= 0 &&
            newRow < BOARD_SIZE &&
            newCol >= 0 &&
            newCol < BOARD_SIZE
          ) {
            if (currentBoard[newRow][newCol]) {
              if (
                foundOpponent ||
                currentBoard[newRow][newCol]?.includes(piece.split('-')[0])
              )
                break
              foundOpponent = true
            } else if (foundOpponent) {
              return true
            }
            newRow += rowDir
            newCol += colDir
          }
        } else {
          const newRow = row + rowDir * 2
          const newCol = col + colDir * 2
          if (
            newRow >= 0 &&
            newRow < BOARD_SIZE &&
            newCol >= 0 &&
            newCol < BOARD_SIZE
          ) {
            const midRow = row + rowDir
            const midCol = col + colDir
            if (
              currentBoard[midRow][midCol] &&
              !currentBoard[midRow][midCol]?.includes(piece.split('-')[0]) &&
              !currentBoard[newRow][newCol]
            ) {
              return true
            }
          }
        }
      }
    }
    return false
  }

  const handleMove = (
    fromRow: number,
    fromCol: number,
    toRow: number,
    toCol: number,
  ) => {
    if (
      mustCapture &&
      lastMovedPiece &&
      (fromRow !== lastMovedPiece.row || fromCol !== lastMovedPiece.col)
    ) {
      setErrorMessage('Você deve continuar capturando com a mesma peça!')
      return
    }

    if (isValidMove(fromRow, fromCol, toRow, toCol)) {
      const moveResult = movePiece(fromRow, fromCol, toRow, toCol)
      if (moveResult.canCaptureAgain) {
        setSelectedPiece({ row: toRow, col: toCol })
        setErrorMessage(
          'Captura obrigatória! Continue capturando com a mesma peça.',
        )
      } else {
        setSelectedPiece(null)
      }
    } else {
      setErrorMessage('Movimento inválido!')
    }
  }

  const handleCellClick = (row: number, col: number) => {
    if (selectedPiece) {
      handleMove(selectedPiece.row, selectedPiece.col, row, col)
    } else if (
      board[row][col]?.includes(turn) &&
      (!mustCapture ||
        (lastMovedPiece &&
          lastMovedPiece.row === row &&
          lastMovedPiece.col === col))
    ) {
      setSelectedPiece({ row, col })
    }
  }

  const handleUndo = () => {
    if (currentStateIndex > 0) {
      setCurrentStateIndex((prevIndex) => prevIndex - 1)
      setSelectedPiece(null)
      setErrorMessage('')
      setWinner(null)
    }
  }

  const resetGame = () => {
    setGameStates([
      {
        board: initialBoard,
        turn: 'white',
        moveHistory: [],
        mustCapture: false,
        lastMovedPiece: null,
      },
    ])
    setCurrentStateIndex(0)
    setSelectedPiece(null)
    setErrorMessage('')
    setWinner(null)
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col lg:flex-row items-start justify-center gap-8 w-full max-w-7xl mx-auto p-4">
        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-bold mb-4">Damas</h1>
          <GameInfo turn={turn} mustCapture={mustCapture} />
          <GameBoard
            board={board}
            selectedPiece={selectedPiece}
            handleCellClick={handleCellClick}
            handleMove={handleMove}
            turn={turn}
            mustCapture={mustCapture}
            lastMovedPiece={lastMovedPiece}
          />
          <div className="flex gap-4 mt-4">
            <Button onClick={resetGame} className="text-white">
              Reiniciar Jogo
            </Button>
            <Button
              onClick={handleUndo}
              className="text-white"
              disabled={currentStateIndex === 0}
            >
              Desfazer Jogada
            </Button>
          </div>
        </div>
        <div className="w-full lg:w-64">
          <MoveHistory moves={moveHistory} />
        </div>
        {errorMessage && (
          <Alert
            className={cn(
              'fixed bottom-4 right-4 z-50 w-full max-w-xs',
              'bg-destructive text-destructive-foreground',
            )}
          >
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Erro</AlertTitle>
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}
        {winner && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white dark:bg-background p-8 rounded-lg text-center border border-muted">
              <h2 className="text-2xl font-bold mb-4">
                {winner === 'white' ? 'As peças brancas' : 'As peças pretas'}{' '}
                venceram!
              </h2>
              <Button onClick={resetGame} className="text-white">
                Jogar Novamente
              </Button>
            </div>
          </div>
        )}
        {winner && <Confetti />}
      </div>
    </DndProvider>
  )
}
