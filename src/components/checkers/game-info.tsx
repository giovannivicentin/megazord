interface GameInfoProps {
  turn: 'white' | 'black'
  mustCapture: boolean
}

export function GameInfo({ turn, mustCapture }: GameInfoProps) {
  return (
    <div className="mb-4 text-center">
      <p className="text-lg font-semibold">
        Vez das peças:{' '}
        <span
          className={
            turn === 'white'
              ? 'text-white bg-gray-700 p-1.5 rounded-lg'
              : 'text-black bg-gray-300 p-1.5 rounded-lg'
          }
        >
          {turn === 'white' ? 'Brancas' : 'Pretas'}
        </span>
      </p>
      {mustCapture && (
        <p className="text-sm text-red-600 font-medium mt-1">
          Captura obrigatória!
        </p>
      )}
    </div>
  )
}
