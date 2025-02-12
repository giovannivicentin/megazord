interface MoveHistoryProps {
  moves: string[]
}

export function MoveHistory({ moves }: MoveHistoryProps) {
  return (
    <div className="bg-white dark:bg-background p-4 rounded-lg max-h-[50vh] shadow-md border border-muted lg:max-h-[80vh] overflow-scroll">
      <h2 className="text-xl font-bold mb-2">Histórico de Jogadas</h2>
      <ul className="list-decimal list-inside">
        {moves.map((move, index) => (
          <li key={index} className="mb-1">
            {move}
          </li>
        ))}
      </ul>
    </div>
  )
}
