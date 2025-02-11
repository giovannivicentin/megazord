import MathSpinner from '@/components/math-spinner'

function MathSpinnerPage() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 px-4 pt-8 dark:bg-[unset]">
      <h1 className="text-3xl font-bold mb-8">Spinner de Matemática</h1>
      <MathSpinner />
    </div>
  )
}

export default MathSpinnerPage
