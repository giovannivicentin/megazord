import ChessGame from '@/components/chess-game'

function ChessPage() {
  return (
    <div className="min-h-screen flex flex-col items-center px-4 pt-8">
      <h1 className="text-3xl font-bold mb-8">Xadrez</h1>
      <ChessGame />
    </div>
  )
}

export default ChessPage
