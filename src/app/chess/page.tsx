import ChessGame from '@/components/chess-game'

export default function ChessPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 bg-background dark:bg-[unset]">
      <h1 className="text-4xl md:text-5xl font-bold mb-8 text-gray-800 dark:text-white">
        Xadrez
      </h1>
      <ChessGame />
    </div>
  )
}
