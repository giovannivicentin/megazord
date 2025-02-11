import MathSpinner from '@/components/math-spinner'

function MathSpinnerPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-neutral-50 dark:bg-[unset]">
      <h1 className="text-3xl font-bold mb-6">Spinner de Matemática</h1>
      <MathSpinner />
    </div>
  )
}

export default MathSpinnerPage
