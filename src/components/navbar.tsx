import Image from 'next/image'
import { ModeToggle } from './mode-toggle'
import Link from 'next/link'
import { Separator } from './ui/separator'

export function Navbar() {
  return (
    <nav>
      <div className="flex justify-between items-center mx-16">
        <ul className="flex items-center">
          <li>
            <Link href="/">
              <div className="flex items-center">
                <Image
                  src="/megaHelmetWhite.png"
                  alt="Megazord Helmet Logo"
                  width="70"
                  height="60"
                  className="mb-3 invert dark:invert-0"
                ></Image>
                <div className='flex flex-col items-center'>
                  <Image
                    src="/megazordWhite.png"
                    alt="Megazord Phrase Logo"
                    width="100"
                    height="50"
                    className="invert dark:invert-0"
                  ></Image>
                  <Image
                    src="/hashBlack.png"
                    alt="Megazord Phrase Logo"
                    width="40"
                    height="25"
                    className="dark:invert"
                  ></Image>

                </div>

              </div>
            </Link>
          </li>
          <li></li>
          <li></li>
        </ul>
        <ModeToggle />
      </div>
      <Separator />
    </nav>
  )
}
