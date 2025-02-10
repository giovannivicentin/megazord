'use client'
import type React from 'react'
import { useRef, useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Palette, Undo, Eraser, Download } from 'lucide-react'

interface Point {
  x: number
  y: number
}

interface DrawingAction {
  points: Point[]
  color: string
  lineWidth: number
}

const colors = [
  { name: 'Foreground', value: 'hsl(var(--foreground))' },
  { name: 'Background', value: 'hsl(var(--background))' },
  { name: 'Primary', value: 'hsl(var(--primary))' },
  { name: 'Secondary', value: 'hsl(var(--secondary))' },
  { name: 'Accent', value: 'hsl(var(--accent))' },
  { name: 'Muted', value: 'hsl(var(--muted))' },
  { name: 'Popover', value: 'hsl(var(--popover))' },
  { name: 'Card', value: 'hsl(var(--card))' },
  { name: 'Destructive', value: 'hsl(var(--destructive))' },
]

const Whiteboard: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isDrawing, setIsDrawing] = useState<boolean>(false)
  const [lastPoint, setLastPoint] = useState<Point>({ x: 0, y: 0 })
  const [color, setColor] = useState<string>('hsl(var(--foreground))')
  const [lineWidth, setLineWidth] = useState<number>(4)
  const [drawingHistory, setDrawingHistory] = useState<DrawingAction[]>([])
  const [currentAction, setCurrentAction] = useState<DrawingAction>({
    points: [],
    color: 'hsl(var(--foreground))',
    lineWidth: 4,
  })

  const redrawCanvas = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawingHistory.forEach((action) => {
      if (action.points.length > 0) {
        ctx.strokeStyle = action.color
        ctx.lineWidth = action.lineWidth
        ctx.beginPath()
        ctx.moveTo(action.points[0].x, action.points[0].y)
        action.points.forEach((point) => {
          ctx.lineTo(point.x, point.y)
        })
        ctx.stroke()
      }
    })
  }, [drawingHistory])

  useEffect(() => {
    const resizeCanvas = () => {
      const canvas = canvasRef.current
      const container = containerRef.current
      if (!canvas || !container) return

      canvas.width = container.clientWidth
      canvas.height = container.clientHeight
      redrawCanvas()
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    return () => window.removeEventListener('resize', resizeCanvas)
  }, [redrawCanvas])

  const getPointerPosition = (
    e:
      | React.MouseEvent<HTMLCanvasElement>
      | React.TouchEvent<HTMLCanvasElement>,
  ) => {
    const canvas = canvasRef.current
    if (!canvas) {
      return { offsetX: 0, offsetY: 0 }
    }

    const rect = canvas.getBoundingClientRect()
    if ('touches' in e && e.touches.length > 0) {
      const touch = e.touches[0]
      return {
        offsetX: touch.clientX - rect.left,
        offsetY: touch.clientY - rect.top,
      }
    }

    const mouseEvent = e as React.MouseEvent<HTMLCanvasElement>
    return {
      offsetX: mouseEvent.clientX - rect.left,
      offsetY: mouseEvent.clientY - rect.top,
    }
  }

  const startDrawing = (
    e:
      | React.MouseEvent<HTMLCanvasElement>
      | React.TouchEvent<HTMLCanvasElement>,
  ) => {
    const { offsetX, offsetY } = getPointerPosition(e)
    setIsDrawing(true)
    setLastPoint({ x: offsetX, y: offsetY })
    setCurrentAction({ points: [{ x: offsetX, y: offsetY }], color, lineWidth })
  }

  const draw = (
    e:
      | React.MouseEvent<HTMLCanvasElement>
      | React.TouchEvent<HTMLCanvasElement>,
  ) => {
    if (!isDrawing) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const { offsetX, offsetY } = getPointerPosition(e)

    ctx.strokeStyle = color
    ctx.lineWidth = lineWidth
    ctx.beginPath()
    ctx.moveTo(lastPoint.x, lastPoint.y)
    ctx.lineTo(offsetX, offsetY)
    ctx.stroke()

    setLastPoint({ x: offsetX, y: offsetY })
    setCurrentAction((prev) => ({
      ...prev,
      points: [...prev.points, { x: offsetX, y: offsetY }],
    }))
  }

  const stopDrawing = () => {
    setIsDrawing(false)
    if (currentAction.points.length > 0) {
      setDrawingHistory((prev) => [...prev, currentAction])
    }
    setCurrentAction({ points: [], color, lineWidth })
  }

  const undo = () => {
    if (drawingHistory.length === 0) return

    setDrawingHistory((prev) => {
      const newHistory = prev.slice(0, -1)
      return newHistory
    })

    redrawCanvas()
  }

  const eraseAll = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    setDrawingHistory([])
  }

  const downloadCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const dataURL = canvas.toDataURL('image/png')
    const link = document.createElement('a')
    link.download = 'whiteboard.png'
    link.href = dataURL
    link.click()
  }

  return (
    <div className="flex flex-col w-full h-full max-w-5xl mx-auto p-4">
      <div className="mb-4 p-4 bg-background border border-border rounded-lg shadow-md w-full">
        <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-2 mb-4">
          {colors.map((c) => (
            <Button
              key={c.value}
              onClick={() => setColor(c.value)}
              variant={color === c.value ? 'default' : 'outline'}
              className={`w-8 h-8 rounded-full p-0 ${color === c.value ? 'ring-2 ring-offset-2 ring-primary' : ''}`}
              style={{ backgroundColor: c.value }}
              title={c.name}
            >
              {color === c.value && (
                <Palette className="h-4 w-4 text-primary-foreground" />
              )}
            </Button>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 mb-4">
          <span className="text-sm font-medium text-foreground">
            Line Width:
          </span>
          <Slider
            value={[lineWidth]}
            onValueChange={(value) => setLineWidth(value[0])}
            max={20}
            step={1}
            className="w-full sm:w-48"
          />
          <span className="text-sm font-medium text-foreground">
            {lineWidth}px
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            onClick={undo}
            variant="outline"
            className="flex items-center"
          >
            <Undo className="h-4 w-4 mr-2" />
            Undo
          </Button>
          <Button
            onClick={eraseAll}
            variant="outline"
            className="flex items-center"
          >
            <Eraser className="h-4 w-4 mr-2" />
            Erase All
          </Button>
          <Button
            onClick={downloadCanvas}
            variant="outline"
            className="flex items-center"
          >
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        </div>
      </div>

      <div ref={containerRef} className="flex-grow w-full relative">
        <canvas
          ref={canvasRef}
          className="bg-background border border-border rounded-lg shadow-lg absolute inset-0 w-full h-full"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />
      </div>
    </div>
  )
}

export default Whiteboard
