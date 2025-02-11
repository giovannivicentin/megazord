import TicTacToe from '@/components/tic-tac-toe'

function TicTacToePage() {
  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-neutral-50 dark:bg-[unset]">
        <h1 className="text-3xl font-bold mb-6">Jogo da Velha</h1>
        <TicTacToe />
      </div>
    </>
  )
}

export default TicTacToePage
