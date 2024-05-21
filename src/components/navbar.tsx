'use client'

import Image from 'next/image'
import { ModeToggle } from './mode-toggle'
import Link from 'next/link'
import { Separator } from './ui/separator'
import { Button } from './ui/button'
import { useState, useEffect } from 'react'
import { FiMenu, FiX } from 'react-icons/fi'
import { items } from '../lib/items'

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [randomPage, setRandomPage] = useState(getRandomPage())

  const toggleMenu = () => {
    setIsAnimating(true)
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsAnimating(true)
    setIsMenuOpen(false)
  }

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        isMenuOpen &&
        !(event.target as Element).closest('.menu-content') &&
        !(event.target as Element).closest('.menu-toggle')
      ) {
        closeMenu()
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [isMenuOpen])

  function getRandomPage() {
    const randomIndex = Math.floor(Math.random() * items.length)
    return items[randomIndex].pageToGo
  }

  const handleButtonClick = () => {
    const newRandomPage = getRandomPage()
    setRandomPage(newRandomPage)
  }

  return (
    <nav>
      <div className="flex justify-between items-center mx-4 md:mx-36 mb-1">
        <ul className="flex items-center">
          <li>
            <Link href="/">
              <div className="flex items-center">
                <Image
                  src="/megaHelmetWhite.svg"
                  alt="Megazord Helmet Logo"
                  width="55"
                  height="45"
                  className="invert dark:invert-0"
                />
              </div>
            </Link>
          </li>
        </ul>
        <div className="hidden md:flex gap-4">
          <Link href={randomPage}>
            <Button onClick={handleButtonClick}>Jogar Agora</Button>
          </Link>
          <ModeToggle />
        </div>
        <div className="flex items-center gap-4 md:hidden menu-toggle">
          <ModeToggle />
          <FiMenu className="text-2xl" onClick={toggleMenu} />
        </div>
      </div>
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
          <div
            className={`bg-white dark:bg-gray-800 w-64 p-4 menu-content relative ${
              isAnimating
                ? isMenuOpen
                  ? 'animate-fade-left animate-once duration-300'
                  : 'animate-fade-right animate-once duration-300'
                : ''
            }`}
            onAnimationEnd={() => setIsAnimating(false)}
          >
            <FiX
              className="absolute top-4 right-4 text-2xl cursor-pointer hover:text-primary"
              onClick={closeMenu}
            />
            <div className="flex flex-col mt-10">
              <Link href={randomPage}>
                <Button className="w-full" onClick={handleButtonClick}>
                  Jogar Agora
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
      <Separator />
    </nav>
  )
}
