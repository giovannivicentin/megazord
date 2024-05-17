import Link from 'next/link'

export default function Home() {
  const items = [
    {
      name: 'Elementos da Tabela Periodica',
      pageToGo: '/elementos-da-tabela-periodica',
    },
    { name: 'Relógio de Sol', pageToGo: '/relogio-de-sol' },
    { name: 'Circuito Elétrico', pageToGo: '/circuito-eletrico' },
    { name: 'Catapulta', pageToGo: '/catapulta' },
    { name: 'Carrinho Movido a Balão', pageToGo: '/carrinho-movido-a-balao' },
    { name: 'Quebra Cabeça', pageToGo: '/quebra-cabeca' },
    { name: 'Quadro Branco', pageToGo: '/quadro-branco' },
    { name: 'Chess and Checkers', pageToGo: '/chess-and-checkers' },
    { name: 'Tic Tac Toe', pageToGo: '/tic-tac-toe' },
    { name: 'Math Spinner', pageToGo: '/math-spinner' },
  ]

  return (
    <main className="flex min-h-screen flex-col items-center justify-evenly">
      <div className="flex flex-col items-center text-center">
        <h1 className="font-poppins uppercase font-bold text-5xl mt-12">
          The Woodie Flowers Box
        </h1>
        <p className="font-openSans w-[55%] mt-1 text-muted-foreground">
          Uma ferramenta eficiente inspirada em Woodie Flowers que introduz
          crianças aos conceitos básicos do STEAM com atividades práticas e
          divertidas.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-5 md:grid-cols-5 mt-12 animate-fade-up animate-once duration-400">
        {items.map((item, index) => (
          <Link href={item.pageToGo} key={index}>
            <div className="bg-primary text-secondary rounded-sm p-10 w-44 h-64 flex items-center justify-center text-center">
              {item.name}
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}
