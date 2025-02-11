'use client'

import { calculateWinner, getAIMove } from '@/utils/game-logic'
import { useState, useEffect, useCallback } from 'react'
import { Board } from './board'
import { GameModeSelection } from './game-mode-selection'
import { TypewriterText } from './type-writter-text'
import { WinningLine } from './winning-line'

export default function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [isXNext, setIsXNext] = useState(true)
  const [showWinningLine, setShowWinningLine] = useState(false)
  const [gameMode, setGameMode] = useState<'local' | 'ai' | null>(null)

  const winInfo = calculateWinner(board)
  const winner = winInfo ? winInfo.winner : null
  const winningLine = winInfo ? winInfo.line : null
  const isGameOver = winner || board.every(Boolean)

  // 1. UseCallback para memorizar a função handleMove
  const handleMove = useCallback(
    (i: number) => {
      // Se houver vencedor ou a casa já estiver preenchida, sair
      if (winner || board[i]) return

      const newBoard = board.slice()
      newBoard[i] = isXNext ? 'x' : 'o'
      setBoard(newBoard)
      setIsXNext(!isXNext)
      setShowWinningLine(false)
    },
    // 2. Dependências da função
    [winner, board, isXNext],
  )

  // Agora podemos colocar handleMove na lista de dependências
  useEffect(() => {
    if (gameMode === 'ai' && !isXNext && !isGameOver) {
      const timer = setTimeout(() => {
        const aiMove = getAIMove(board)
        handleMove(aiMove)
      }, 1300)

      return () => clearTimeout(timer)
    }
  }, [isXNext, isGameOver, board, gameMode, handleMove])

  useEffect(() => {
    if (winningLine) {
      const timer = setTimeout(() => setShowWinningLine(true), 50)
      return () => clearTimeout(timer)
    }
  }, [winningLine])

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setIsXNext(true)
    setShowWinningLine(false)
    setGameMode(null)
  }

  let status
  if (winner) {
    status =
      winner === 'x'
        ? gameMode === 'ai'
          ? 'você venceu!'
          : 'jogador x venceu!'
        : gameMode === 'ai'
          ? 'ia venceu!'
          : 'jogador o venceu!'
  } else if (isGameOver) {
    status = 'empate!'
  } else if (isXNext) {
    status = gameMode === 'ai' ? 'sua vez' : 'vez do jogador x'
  } else {
    status = gameMode === 'ai' ? 'ia está pensando...' : 'vez do jogador o'
  }

  return (
    <div className="flex flex-col w-full justify-center items-center">
      {!gameMode ? (
        <GameModeSelection onSelectMode={setGameMode} />
      ) : (
        <>
          <div className="relative w-72 h-72">
            <Board
              squares={board}
              onClick={isXNext || gameMode === 'local' ? handleMove : () => {}}
            />
            {showWinningLine && winningLine && (
              <WinningLine start={winningLine[0]} end={winningLine[2]} />
            )}
          </div>
          <div className="mt-4 h-16 flex flex-col items-center justify-center">
            <div className="text-xl font-semibold text-primary lowercase">
              <TypewriterText text={status} />
            </div>
            {isGameOver && (
              <button
                onClick={resetGame}
                className="mt-2 cursor-pointer text-lg text-muted-foreground hover:text-primary transition-colors lowercase"
              >
                <TypewriterText text="jogar novamente" delay={100} />
              </button>
            )}
          </div>
        </>
      )}
    </div>
  )
}
