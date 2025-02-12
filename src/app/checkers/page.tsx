import { CheckersGame } from '@/components/checkers-game'

function CheckersPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[unset] py-8 flex flex-col">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CheckersGame />
      </div>
    </div>
  )
}

export default CheckersPage
