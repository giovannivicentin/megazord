import { useState } from 'react'
import { popup } from '../lib/popup-text'

interface InfoButtonProps {
  gameName: string
}

export function InfoButton({ gameName }: InfoButtonProps) {
  const [isOpen, setIsOpen] = useState(false)

  const currentItem = popup.find((item) => item.name === gameName)

  if (!currentItem) return null

  return (
    <div className="relative mt-6">
      <button
        onClick={() => setIsOpen(true)}
        className="text-white bg-blue-600 rounded-full w-8 h-8 flex items-center justify-center
                   hover:bg-blue-700 transition-colors"
      >
        i
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white max-w-md w-11/12 md:w-2/3 p-6 rounded shadow-lg relative">
            <h2 className="text-xl font-semibold mb-3">{currentItem.name}</h2>
            <p className="mb-4">{currentItem.text}</p>

            <button
              onClick={() => setIsOpen(false)}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 w-40"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
