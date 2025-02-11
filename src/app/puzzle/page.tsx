import { PuzzleGame } from '@/components/puzzle'

function PuzzlePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-neutral-50 dark:bg-[unset]">
      <PuzzleGame />
    </div>
  )
}

export default PuzzlePage
