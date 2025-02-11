'use client'

import { Loader, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

import { Button } from './ui/button'

export function ModeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleToggle = () => {
    if (resolvedTheme === 'dark') {
      setTheme('light')
    } else {
      setTheme('dark')
    }
  }

  const displayIcon = () => {
    if (!mounted) {
      return (
        <Loader className="h-6 w-6 animate-spin md:h-5 md:w-5 3xl:h-6 3xl:w-6 4xl:h-7 4xl:w-7" />
      )
    }

    if (theme === 'system') {
      return resolvedTheme === 'dark' ? (
        <>
          <Sun className="h-6 w-6 text-primary dark:text-white md:h-5 md:w-5 3xl:h-6 3xl:w-6 4xl:h-7 4xl:w-7" />
          <span className="sr-only">Sun Icon</span>
        </>
      ) : (
        <>
          <Moon className="h-6 w-6 text-primary dark:text-white md:h-5 md:w-5 3xl:h-6 3xl:w-6 4xl:h-7 4xl:w-7" />
          <span className="sr-only">Moon Icon</span>
        </>
      )
    }
    return theme === 'dark' ? (
      <>
        <Sun className="h-6 w-6 text-primary dark:text-white md:h-5 md:w-5 3xl:h-6 3xl:w-6 4xl:h-7 4xl:w-7" />
        <span className="sr-only">Sun Icon</span>
      </>
    ) : (
      <>
        <Moon className="h-6 w-6 text-primary dark:text-white md:h-5 md:w-5 3xl:h-6 3xl:w-6 4xl:h-7 4xl:w-7" />
        <span className="sr-only">Moon Icon</span>
      </>
    )
  }

  return (
    <Button
      variant="ghost"
      aria-label="Button to change theme"
      size="icon"
      className="hover:text-muted-foreground"
      onClick={handleToggle}
    >
      {displayIcon()}
    </Button>
  )
}
