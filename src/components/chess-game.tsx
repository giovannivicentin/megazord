'use client'
import dynamic from 'next/dynamic'
import React, { useState, useEffect } from 'react'
import { IoIosReturnLeft } from 'react-icons/io'
import { Chess, PieceSymbol } from 'chess.ts'
import { Button } from './ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

const Chessboard = dynamic(() => import('chessboardjsx'), {
  ssr: false,
})

function ChessGame() {
  const [game] = useState(new Chess())
  const [fen, setFen] = useState('start')
  const [errorMessage, setErrorMessage] = useState('')
  const [player, setPlayer] = useState('Brancas')

  useEffect(() => {
    setFen(game.fen())
  }, [game])

  const boardWidth =
    typeof window !== 'undefined' && window.innerWidth > 600 ? 500 : 350

  const handleMove = (move: {
    from: string
    to: string
    promotion?: PieceSymbol | undefined
  }) => {
    try {
      const result = game.move({
        from: move.from,
        to: move.to,
        promotion: move.promotion as PieceSymbol,
      })
      if (result === null) {
        throw new Error('Movimento inválido')
      }
      setFen(game.fen())
      setPlayer(player === 'Brancas' ? 'Pretas' : 'Brancas')
      setErrorMessage('')
    } catch (error) {
      setErrorMessage('Movimento inválido')
    }
  }

  const handleUndoMove = () => {
    game.undo()
    setFen(game.fen())
    setPlayer(player === 'brancas' ? 'pretas' : 'brancas')
  }

  return (
    <>
      <div className="flex items-center">
        <p className="my-2 text-lg text-center">É a vez das {player}</p>{' '}
        {errorMessage && (
          <Alert
            className={cn(
              'fixed m-6 top-0 z-[100] flex w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col max-w-[210px] bg-secondary text-red-600',
            )}
            variant="destructive"
          >
            <AlertCircle className="h-5 w-5 text-red-600" />
            <AlertTitle>Erro</AlertTitle>
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}
      </div>
      <div>
        <Chessboard
          width={boardWidth}
          position={fen}
          onDrop={({ sourceSquare, targetSquare }) =>
            handleMove({
              from: sourceSquare,
              to: targetSquare,
              promotion: 'q',
            })
          }
        />
        <div className="flex gap-2 justify-end mt-2">
          <Button variant="outline" onClick={handleUndoMove}>
            Desfazer Movimento
            <IoIosReturnLeft className="text-2xl" />
          </Button>
        </div>
      </div>
    </>
  )
}

export default ChessGame
