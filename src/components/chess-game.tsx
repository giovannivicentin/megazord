'use client'

import dynamic from 'next/dynamic'
import React, { useState, useEffect } from 'react'
import { Chess, PieceSymbol } from 'chess.js'
import { Button } from './ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

const Chessboard = dynamic(() => import('chessboardjsx'), {
  ssr: false,
  loading: () => (
    <p className="animate-pulse animate-infinite animate-ease-linear flex items-center justify-center text-lg font-poppins">
      Carregando...
    </p>
  ),
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
    setPlayer(player === 'Brancas' ? 'Pretas' : 'Brancas')
  }

  return (
    <>
      <div className="flex items-center">
        <p className="my-2 text-lg text-center font-semibold">
          É a vez das {player}
        </p>{' '}
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
      </div>
      <div className="flex gap-3 mt-3 items-center justify-center">
        <Button className="w-40" onClick={() => window.location.reload()}>
          Reiniciar Partida
        </Button>
        <Button className="w-40" variant="outline" onClick={handleUndoMove}>
          Desfazer Movimento
        </Button>
      </div>
    </>
  )
}

export default ChessGame
