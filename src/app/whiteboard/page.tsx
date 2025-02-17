'use client'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Download, Eraser, Palette, Undo } from 'lucide-react'
import type React from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'

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
  { name: 'Black', value: '#000000' },
  { name: 'White', value: '#FFFFFF' },
  { name: 'Red', value: '#FF0000' },
  { name: 'Green', value: '#00FF00' },
  { name: 'Blue', value: '#0000FF' },
  { name: 'Yellow', value: '#FFFF00' },
  { name: 'Cyan', value: '#00FFFF' },
  { name: 'Magenta', value: '#FF00FF' },
  { name: 'Orange', value: '#FFA500' },
  { name: 'Purple', value: '#800080' },
  { name: 'Pink', value: '#FFC0CB' },
  { name: 'Brown', value: '#A52A2A' },
]

const WhiteboardPage: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isDrawing, setIsDrawing] = useState<boolean>(false)
  const [lastPoint, setLastPoint] = useState<Point>({ x: 0, y: 0 })
  const [color, setColor] = useState<string>('#000000')
  const [lineWidth, setLineWidth] = useState<number>(4)
  const [drawingHistory, setDrawingHistory] = useState<DrawingAction[]>([])
  const [currentAction, setCurrentAction] = useState<DrawingAction>({
    points: [],
    color: '#000000',
    lineWidth: 4,
  })

  useEffect(() => {
    const handleTouchMove = (e: TouchEvent) => {
      if (isDrawing) {
        e.preventDefault()
      }
    }

    document.addEventListener('touchmove', handleTouchMove, { passive: false })

    return () => {
      document.removeEventListener('touchmove', handleTouchMove)
    }
  }, [isDrawing])

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
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-neutral-50 dark:bg-[unset]">
      <h1 className="text-3xl font-bold my-8">Quadro Branco</h1>

      <div
        ref={containerRef}
        className="w-full max-w-3xl aspect-video relative mb-6"
      >
        <canvas
          ref={canvasRef}
          className="bg-background border border-muted-foreground rounded-lg shadow-md absolute inset-0 w-full h-full"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />
      </div>

      <div className="p-4 bg-background border-muted-foreground rounded-lg shadow-lg w-full max-w-3xl">
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 mb-4 place-items-center">
          {colors.map((c) => (
            <Button
              key={c.value}
              onClick={() => setColor(c.value)}
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                color === c.value ? 'ring-2 ring-offset-2 ring-blue-500' : ''
              }`}
              style={{ backgroundColor: c.value }}
              title={c.name}
            >
              {color === c.value && <Palette className="h-4 w-4 text-white" />}
            </Button>
          ))}
        </div>
        <div className="sm:flex flex-row-reverse items-center justify-between block">
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 mb-4 pt-4">
            <span className="text-sm font-medium ">Largura:</span>
            <Slider
              value={[lineWidth]}
              onValueChange={(value) => setLineWidth(value[0])}
              max={20}
              step={1}
              className="w-full sm:w-48"
            />
            <span className="text-sm font-medium">{lineWidth}px</span>
          </div>
          <div className="flex flex-wrap gap-2 items-center justify-center sm:justify-normal">
            <Button
              onClick={undo}
              variant="outline"
              className="flex items-center"
            >
              <Undo className="h-4 w-4 mr-2" />
              Desfazer
            </Button>
            <Button
              onClick={eraseAll}
              variant="outline"
              className="flex items-center"
            >
              <Eraser className="h-4 w-4 mr-2" />
              Apagar Tudo
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
      </div>

      <p className="text-muted-foreground my-4 text-center text-sm max-w-3xl">
        Desenhe com o mouse ou com o dedo (no celular). Use a paleta de cores e
        o controle deslizante de largura de linha para personalizar seu desenho.
      </p>
    </div>
  )
}

export default WhiteboardPage
