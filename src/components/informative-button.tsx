'use client'

import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { popup } from '../lib/popup-text'

export function GlobalInfoButton() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const currentItem = popup.find(
    (item) => item.pageToGo.replace('.tsx', '') === pathname,
  )

  if (!currentItem) return null

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="
          fixed bottom-4 right-4
          w-10 h-10
          rounded-full
          bg-blue-600
          text-white text-xl font-bold
          flex items-center justify-center
          hover:bg-blue-700
          transition-colors
          z-50
        "
      >
        i
      </button>

      {isOpen && (
        <div
          className="
            fixed inset-0 flex items-center justify-center
            bg-black bg-opacity-50
            z-50
          "
        >
          <div
            className="
              bg-white dark:bg-background border border-muted p-4 md:p-6
              rounded shadow-lg
              max-w-md w-11/12
              relative
            "
          >
            <h2 className="text-xl font-semibold mb-3">{currentItem.name}</h2>
            <p className="mb-4">{currentItem.text}</p>

            <button
              onClick={() => setIsOpen(false)}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 w-40 dark:text-white"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </>
  )
}
