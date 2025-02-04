import { items } from '../lib/items'
import { GameItem } from '../components/game-item'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start py-8 px-4 md:px-8 lg:px-16">
      <div className="w-full max-w-4xl mx-auto text-center mb-12">
        <h1 className="font-poppins uppercase font-bold text-3xl md:text-4xl lg:text-5xl mb-4 text-primary">
          The Woodie Flowers Box
        </h1>
        <p className="font-openSans text-base md:text-lg mx-auto max-w-2xl text-muted-foreground">
          Uma ferramenta eficiente inspirada no Woodie Flowers que introduz
          crianças aos conceitos básicos do STEAM com atividades práticas e
          divertidas.
        </p>
      </div>
      <div className="w-full max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-up animate-once duration-400">
        {items.map((item, index) => (
          <GameItem
            key={index}
            name={item.name}
            pageToGo={item.pageToGo}
            imageUrl={
              item.imageUrl ||
              `/placeholder.svg?height=300&width=400&text=${encodeURIComponent(item.name)}`
            }
          />
        ))}
      </div>
    </main>
  )
}
