import { useDrag } from 'react-dnd'
import { cn } from '@/lib/utils'

interface CheckersPieceProps {
  type: 'white' | 'black' | 'white-king' | 'black-king'
  row: number
  col: number
  canDrag: boolean
}

export function CheckersPiece({ type, row, col, canDrag }: CheckersPieceProps) {
  const [{ isDragging }, drag] = useDrag({
    type: 'piece',
    item: { type, row, col },
    canDrag: () => canDrag,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  })

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div
        ref={drag as unknown as React.Ref<HTMLDivElement>}
        className={cn(
          'w-6 h-6 sm:w-10 sm:h-10 rounded-full',
          type.includes('white') ? 'bg-white' : 'bg-black',
          type.includes('king') && 'ring-2 ring-yellow-300',
          isDragging && 'opacity-50',
          canDrag ? 'cursor-move' : 'cursor-not-allowed',
        )}
      />
    </div>
  )
}
