'use client'
import { MouseEvent, useCallback, useEffect, useRef, useState } from 'react'

interface DrawingAction {
  path: { x: number; y: number }[]
  style: {
    color: string
    lineWidth: number
  }
}

export default function WhiteboardCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null)
  const [drawing, setDrawing] = useState(false)
  const [currentColor, setCurrentColor] = useState('black')
  const [lineWidth, setLineWidth] = useState(3)
  const [drawingActions, setDrawingActions] = useState<DrawingAction[]>([])
  const [currentPath, setCurrentPath] = useState<{ x: number; y: number }[]>([])
  const [currentStyle, setCurrentStyle] = useState({
    color: 'black',
    lineWidth: 3,
  })

  const reDrawPreviousData = useCallback(
    (ctx: CanvasRenderingContext2D) => {
      drawingActions.forEach(({ path, style }) => {
        ctx.beginPath()
        ctx.strokeStyle = style.color
        ctx.lineWidth = style.lineWidth
        ctx.moveTo(path[0].x, path[0].y)
        path.forEach((point) => {
          ctx.lineTo(point.x, point.y)
        })
        ctx.stroke()
      })
    },
    [drawingActions],
  )
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        const canvas = canvasRef.current
        const parentDiv = canvas.parentElement

        if (parentDiv) {
          canvas.width = parentDiv.offsetWidth
          canvas.height = parentDiv.offsetWidth * (500 / 900)

          const ctx = canvas.getContext('2d')
          if (ctx) {
            setContext(ctx)
            reDrawPreviousData(ctx)
          }
        }
      }
    }

    requestAnimationFrame(handleResize)

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [reDrawPreviousData])

  const startDrawing = (e: MouseEvent<HTMLCanvasElement>) => {
    if (context) {
      context.beginPath()
      context.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
      setDrawing(true)
    }
  }

  const draw = (e: MouseEvent<HTMLCanvasElement>) => {
    if (!drawing || !context) return

    context.strokeStyle = currentStyle.color
    context.lineWidth = currentStyle.lineWidth
    context.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
    context.stroke()
    setCurrentPath((prevPath) => [
      ...prevPath,
      { x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY },
    ])
  }

  const endDrawing = () => {
    if (context) {
      setDrawing(false)
      context.closePath()
      if (currentPath.length > 0) {
        setDrawingActions((prevActions) => [
          ...prevActions,
          { path: currentPath, style: currentStyle },
        ])
      }
      setCurrentPath([])
    }
  }

  const changeColor = (color: string) => {
    setCurrentColor(color)
    setCurrentStyle((prevStyle) => ({ ...prevStyle, color }))
  }

  const changeWidth = (width: number) => {
    setLineWidth(width)
    setCurrentStyle((prevStyle) => ({ ...prevStyle, lineWidth: width }))
  }

  const undoDrawing = () => {
    if (drawingActions.length > 0) {
      const newActions = drawingActions.slice(0, -1)
      setDrawingActions(newActions)
      const newContext = canvasRef.current?.getContext('2d')
      if (newContext) {
        newContext.clearRect(
          0,
          0,
          canvasRef.current!.width,
          canvasRef.current!.height,
        )
        newActions.forEach(({ path, style }) => {
          newContext.beginPath()
          newContext.strokeStyle = style.color
          newContext.lineWidth = style.lineWidth
          newContext.moveTo(path[0].x, path[0].y)
          path.forEach((point) => {
            newContext.lineTo(point.x, point.y)
          })
          newContext.stroke()
        })
      }
    }
  }

  const clearDrawing = () => {
    setDrawingActions([])
    setCurrentPath([])
    const newContext = canvasRef.current?.getContext('2d')
    if (newContext) {
      newContext.clearRect(
        0,
        0,
        canvasRef.current!.width,
        canvasRef.current!.height,
      )
    }
  }

  return (
    <div className="flex flex-col items-center justify-center max-w-md sm:max-w-xl md:max-w-3xl xl:max-w-4xl">
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={endDrawing}
        onMouseOut={endDrawing}
        className="border rounded-sm border-gray-400 w-full"
      />
      <div className="flex my-4 gap-4 items-center">
        <div className="flex justify-center space-x-4 border p-3 rounded-md bg-neutral-200 dark:bg-muted shadow-md">
          {['red', 'blue', 'yellow', 'green', 'orange', 'black', 'white'].map(
            (color) => (
              <div
                key={color}
                className={`w-8 h-8 rounded-full cursor-pointer ${
                  currentColor === color
                    ? 'border-4 border-black dark:border-white'
                    : ''
                }`}
                style={{ backgroundColor: color }}
                onClick={() => changeColor(color)}
              />
            ),
          )}
        </div>
        <div className="flex-grow" />
        <label htmlFor="lineWidthRange" className="mr-2">
          Tamanho da Linha:
        </label>
        <input
          id="lineWidthRange"
          type="range"
          min="1"
          max="10"
          value={lineWidth}
          onChange={(e) => changeWidth(parseInt(e.target.value))}
          title="Line Width"
        />
      </div>
      <div className="flex gap-3 mt-3 items-center justify-center">
        <button
          className="bg-primary text-primary-foreground shadow hover:bg-primary/90 px-4 py-2 mr-2 rounded-md"
          onClick={undoDrawing}
        >
          Desfazer
        </button>
        <button
          className="bg-red-500 text-primary-foreground shadow hover:bg-red-500/90 px-4 py-2 mr-2 rounded-md"
          onClick={clearDrawing}
        >
          Limpar
        </button>
      </div>
    </div>
  )
}
