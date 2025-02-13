'use client'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { cn } from '@/lib/utils'
import { Chess, type PieceSymbol } from 'chess.js'
import { AlertCircle } from 'lucide-react'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { Button } from './ui/button'

const Chessboard = dynamic(() => import('chessboardjsx'), {
  ssr: false,
  loading: () => (
    <div className="animate-pulse flex items-center justify-center w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] bg-gray-300 dark:bg-gray-700 rounded-lg">
      <p className="text-lg font-poppins text-gray-600 dark:text-gray-400">
        Carregando...
      </p>
    </div>
  ),
})

function ChessGame() {
  const [game] = useState(new Chess())
  const [fen, setFen] = useState('start')
  const [errorMessage, setErrorMessage] = useState('')
  const [player, setPlayer] = useState('Brancas')
  const [correctMoveSound, setCorrectMoveSound] = useState<
    HTMLAudioElement | undefined
  >()
  const [boardWidth, setBoardWidth] = useState(300)

  useEffect(() => {
    const audio = new Audio('/sounds/move-chess.mp3')
    setCorrectMoveSound(audio)

    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setBoardWidth(600)
      } else if (window.innerWidth >= 768) {
        setBoardWidth(600)
      } else if (window.innerWidth >= 400) {
        setBoardWidth(400)
      } else {
        setBoardWidth(350)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    try {
      const initialFen = game.fen()
      setFen(initialFen)
    } catch (error) {
      console.error('Failed to initialize game:', error)
    }
  }, [game])

  const handleMove = (move: {
    from: string
    to: string
    promotion?: PieceSymbol
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
      correctMoveSound?.play()
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
    <div className="flex flex-col items-center max-w-4xl w-full">
      <div className="mb-4 text-center">
        <p className="text-lg md:text-xl font-semibold text-gray-800 dark:text-white">
          É a vez das{' '}
          <span
            className={`font-bold ${
              player === 'Brancas'
                ? 'text-primary dark:text-white'
                : 'text-black dark:text-primary'
            } transition-colors duration-300`}
          >
            {player}
          </span>
        </p>
      </div>

      {errorMessage && (
        <Alert
          className={cn(
            'fixed bottom-4 left-4 right-4 z-[100] flex items-center p-4 max-w-md mx-auto bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100 rounded-lg',
          )}
          variant="destructive"
        >
          <AlertCircle className="h-5 w-5 mr-2" />
          <div>
            <AlertTitle className="font-semibold">Erro</AlertTitle>
            <AlertDescription>{errorMessage}</AlertDescription>
          </div>
        </Alert>
      )}

      <div className="mb-6">
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

      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
        <Button
          className="w-full sm:w-1/2"
          onClick={() => window.location.reload()}
        >
          Reiniciar Partida
        </Button>
        <Button
          className="w-full sm:w-1/2"
          variant="outline"
          onClick={handleUndoMove}
        >
          Desfazer Movimento
        </Button>
      </div>
    </div>
  )
}

export default ChessGame
