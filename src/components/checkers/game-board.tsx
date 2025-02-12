import { useDrop } from 'react-dnd'
import { cn } from '@/lib/utils'
import { CheckersPiece } from './checkers-piece'

type Piece = 'white' | 'black' | 'white-king' | 'black-king' | null

interface GameBoardProps {
  board: Piece[][]
  selectedPiece: { row: number; col: number } | null
  handleCellClick: (row: number, col: number) => void
  handleMove: (
    fromRow: number,
    fromCol: number,
    toRow: number,
    toCol: number,
  ) => void
  turn: 'white' | 'black'
  mustCapture: boolean
  lastMovedPiece: { row: number; col: number } | null
}

export function GameBoard({
  board,
  selectedPiece,
  handleCellClick,
  handleMove,
  turn,
  mustCapture,
  lastMovedPiece,
}: GameBoardProps) {
  return (
    <div className="grid grid-cols-10 gap-0 border-2 border-black">
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <BoardCell
            key={`${rowIndex}-${colIndex}`}
            row={rowIndex}
            col={colIndex}
            piece={cell}
            isSelected={
              selectedPiece?.row === rowIndex && selectedPiece?.col === colIndex
            }
            handleCellClick={handleCellClick}
            handleMove={handleMove}
            canDrag={
              (!!cell?.includes(turn) &&
                (!mustCapture ||
                  (lastMovedPiece &&
                    lastMovedPiece.row === rowIndex &&
                    lastMovedPiece.col === colIndex))) ||
              false
            }
          />
        )),
      )}
    </div>
  )
}

interface BoardCellProps {
  row: number
  col: number
  piece: Piece
  isSelected: boolean
  handleCellClick: (row: number, col: number) => void
  handleMove: (
    fromRow: number,
    fromCol: number,
    toRow: number,
    toCol: number,
  ) => void
  canDrag: boolean
}

function BoardCell({
  row,
  col,
  piece,
  isSelected,
  handleCellClick,
  handleMove,
  canDrag,
}: BoardCellProps) {
  const [{ isOver }, drop] = useDrop({
    accept: 'piece',
    drop: (item: { row: number; col: number }) => {
      handleMove(item.row, item.col, row, col)
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  })

  return (
    <div
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      ref={drop}
      onClick={() => handleCellClick(row, col)}
      className={cn(
        'w-8 h-8 sm:w-12 sm:h-12 flex items-center justify-center',
        (row + col) % 2 === 0 ? 'bg-gray-300' : 'bg-gray-700',
        isSelected && 'ring-2 ring-yellow-500',
        isOver && 'ring-2 ring-green-500',
      )}
    >
      {piece && (
        <CheckersPiece type={piece} row={row} col={col} canDrag={canDrag} />
      )}
    </div>
  )
}
