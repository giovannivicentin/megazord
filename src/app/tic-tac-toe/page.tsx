import TicTacToe from '@/components/tic-tac-toe'

function TicTacToePage() {
  return (
    <>
      <div className="flex min-h-screen flex-col items-center px-4 pt-8 dark:bg-[unset]">
        <h1 className="text-3xl font-bold mb-28">Jogo da Velha</h1>
        <TicTacToe />
      </div>
    </>
  )
}

export default TicTacToePage
