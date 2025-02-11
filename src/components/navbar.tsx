'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Menu } from 'lucide-react'
import { items } from '../lib/items'
import { ModeToggle } from './mode-toggle'
import { Button } from './ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Separator } from './ui/separator'

export function Navbar() {
  const [randomPage, setRandomPage] = useState(getRandomPage())

  function getRandomPage() {
    const randomIndex = Math.floor(Math.random() * items.length)
    return items[randomIndex].pageToGo
  }

  const handleButtonClick = () => {
    const newRandomPage = getRandomPage()
    setRandomPage(newRandomPage)
  }

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/megaHelmetWhite.svg"
              alt="Megazord Helmet Logo"
              width="46"
              height="40"
              className="invert dark:invert-0"
            />
            <span className="hidden text-lg font-bold sm:inline-block">
              Megazord
            </span>
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <Button asChild className="hidden md:inline-flex text-white">
            <Link href={randomPage} onClick={handleButtonClick}>
              Jogar Agora
            </Link>
          </Button>
          <ModeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col space-y-4 mt-4">
                <Button asChild className="w-full">
                  <Link href={randomPage} onClick={handleButtonClick}>
                    Jogar Agora
                  </Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <Separator />
    </nav>
  )
}
