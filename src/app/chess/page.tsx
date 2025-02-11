import ChessGame from '@/components/chess-game'

function ChessPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-neutral-50 dark:bg-[unset]">
      <h1 className="text-3xl font-bold mb-6">Xadrez</h1>
      <ChessGame />
    </div>
  )
}

export default ChessPage
