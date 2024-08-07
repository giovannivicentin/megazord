import Link from 'next/link'
import { items } from '../lib/items'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-evenly mx-4 md:mx-0">
      <div className="flex flex-col items-center text-center">
        <h1 className="font-poppins uppercase font-bold text-3xl md:text-5xl mt-12">
          The Woodie Flowers Box
        </h1>
        <p className="font-openSans text-sm md:text-base mx-4 md:mx-0 md:w-[55%] mt-1 text-muted-foreground">
          Uma ferramenta eficiente inspirada no Woodie Flowers que introduz
          crianças aos conceitos básicos do STEAM com atividades práticas e
          divertidas.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-2 lg:gap-5 lg:grid-cols-5 mt-12 animate-fade-up animate-once duration-400">
        {items.map((item, index) => (
          <Link href={item.pageToGo} key={index}>
            <div className="bg-primary text-secondary rounded-sm p-10 lg:w-44 h-48 lg:h-64 flex items-center justify-center text-center">
              {item.name}
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}
