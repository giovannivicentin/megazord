'use client'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { cn } from '@/lib/utils'
import { AlertCircle } from 'lucide-react'
import { useState } from 'react'
import { Button } from './ui/button'

const BOARD_SIZE = 8

type PiecePosition = {
  row: number
  col: number
} | null

type Piece = 'pretas' | 'vermelhas' | 'pretas-king' | 'vermelhas-king' | null

export function CheckersGame() {
  const initialBoard: Piece[][] = Array(BOARD_SIZE)
    .fill(null)
    .map((_, row) =>
      Array(BOARD_SIZE)
        .fill(null)
        .map((_, col) =>
          row < 3 && (row + col) % 2 !== 0
            ? 'pretas'
            : row > 4 && (row + col) % 2 !== 0
              ? 'vermelhas'
              : null,
        ),
    )

  const [board, setBoard] = useState<Piece[][]>(initialBoard)
  const [selectedPiece, setSelectedPiece] = useState<PiecePosition>(null)
  const [turn, setTurn] = useState<'vermelhas' | 'pretas'>('vermelhas')
  const [errorMessage, setErrorMessage] = useState('')

  const handleCellClick = (row: number, col: number) => {
    if (selectedPiece) {
      if (isValidMove(selectedPiece.row, selectedPiece.col, row, col)) {
        movePiece(selectedPiece.row, selectedPiece.col, row, col)
        setTurn(turn === 'vermelhas' ? 'pretas' : 'vermelhas')
        setErrorMessage('')
      } else {
        setErrorMessage('Movimento inválido!')
      }
      setSelectedPiece(null)
    } else if (board[row][col]?.includes(turn)) {
      setSelectedPiece({ row, col })
    }
  }

  const isValidMove = (
    fromRow: number,
    fromCol: number,
    toRow: number,
    toCol: number,
  ): boolean => {
    const piece = board[fromRow][fromCol]
    if (!piece || board[toRow][toCol] !== null) return false

    const isKing = piece.includes('king')
    const direction = piece.includes('vermelhas') ? -1 : 1
    const isSimpleMove =
      (toRow === fromRow + direction ||
        (isKing && toRow === fromRow - direction)) &&
      Math.abs(toCol - fromCol) === 1

    const isCaptureMove =
      (toRow === fromRow + 2 * direction ||
        (isKing && toRow === fromRow - 2 * direction)) &&
      Math.abs(toCol - fromCol) === 2 &&
      !!board[(fromRow + toRow) / 2][(fromCol + toCol) / 2] &&
      !board[(fromRow + toRow) / 2][(fromCol + toCol) / 2]?.includes(turn)

    return isSimpleMove || isCaptureMove
  }

  const movePiece = (
    fromRow: number,
    fromCol: number,
    toRow: number,
    toCol: number,
  ) => {
    const newBoard = board.map((row) => [...row])
    let piece = newBoard[fromRow][fromCol]

    if (piece?.includes('vermelhas') && toRow === 0) piece = 'vermelhas-king'
    if (piece?.includes('pretas') && toRow === BOARD_SIZE - 1)
      piece = 'pretas-king'

    newBoard[toRow][toCol] = piece
    newBoard[fromRow][fromCol] = null

    if (Math.abs(toRow - fromRow) === 2) {
      newBoard[(fromRow + toRow) / 2][(fromCol + toCol) / 2] = null
    }

    setBoard(newBoard)
  }

  const checkWinner = () => {
    const redPieces = board
      .flat()
      .filter((piece) => piece?.includes('vermelhas')).length
    const blackPieces = board
      .flat()
      .filter((piece) => piece?.includes('pretas')).length

    if (redPieces === 0) return 'As pretas venceram!'
    if (blackPieces === 0) return 'As vermelhas venceram!'
    return null
  }

  const winner = checkWinner()

  return (
    <div className="flex flex-col items-center mt-16 min-h-screen bg-transparent">
      <h1 className="text-gray-900 dark:text-white text-3xl font-bold mb-4">
        Jogo de Damas
      </h1>
      <div className="flex items-center">
        <p
          className={`my-2 text-lg text-center font-semibold text-gray-800 dark:text-white`}
        >
          É a vez das{' '}
          <span
            className={`font-bold ${turn === 'vermelhas' ? 'text-primary dark:text-white' : 'text-black dark:text-primary'} transition-colors duration-300`}
          >
            {turn}
          </span>
        </p>
      </div>
      {winner && (
        <h2 className="text-gray-900 dark:text-white text-2xl mb-4">
          {winner}
        </h2>
      )}
      {errorMessage && (
        <Alert
          className={cn(
            'fixed m-6 top-0 z-[100] flex w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col max-w-[210px] bg-secondary dark:bg-background dark:text-red-600 dark:border-2 dark:border-red-600',
          )}
          variant="destructive"
        >
          <AlertCircle className="h-5 w-5 text-red-600" />
          <AlertTitle>Erro</AlertTitle>
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}
      <div className="grid grid-cols-8 gap-0 border-2 border-black">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              onClick={() => handleCellClick(rowIndex, colIndex)}
              className={`w-16 h-16 flex items-center justify-center ${
                (rowIndex + colIndex) % 2 === 0 ? 'bg-gray-300' : 'bg-gray-700'
              } ${selectedPiece && selectedPiece.row === rowIndex && selectedPiece.col === colIndex ? 'border-4 border-yellow-500' : ''}`}
            >
              {cell && (
                <div
                  className={`w-12 h-12 rounded-full ${cell.includes('vermelhas') ? 'bg-red-500' : 'bg-black'} ${cell.includes('king') ? 'border-4 border-gold' : ''}`}
                ></div>
              )}
            </div>
          )),
        )}
      </div>
      <div className="flex gap-4 mt-4">
        <Button onClick={() => window.location.reload()}>
          Reiniciar Partida
        </Button>
      </div>
    </div>
  )
}
