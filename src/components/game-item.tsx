import Image from 'next/image'
import Link from 'next/link'

interface GameItemProps {
  name: string
  pageToGo: string
  imageUrl: string
}

export function GameItem({ name, pageToGo, imageUrl }: GameItemProps) {
  return (
    <Link href={pageToGo} className="block group">
      <div className="bg-background border border-primary/20 hover:border-primary text-primary-foreground rounded-lg overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg flex flex-col h-full">
        <div className="relative w-full pt-[100%]">
          <Image
            src={imageUrl || '/placeholder.svg'}
            alt={name}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-4 flex-grow flex items-center justify-center">
          <h3 className="font-semibold text-lg text-center line-clamp-2 min-h-[3.5rem] flex items-center justify-center text-primary">
            {name}
          </h3>
        </div>
      </div>
    </Link>
  )
}
