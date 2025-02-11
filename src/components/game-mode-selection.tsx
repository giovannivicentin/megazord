'use client'

import { useState } from 'react'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'

import { Users, BotIcon as Robot } from 'lucide-react'
import { TypewriterText } from './type-writter-text'

interface GameModeSelectionProps {
  onSelectMode: (mode: 'local' | 'ai') => void
}

export function GameModeSelection({ onSelectMode }: GameModeSelectionProps) {
  const [selectedMode, setSelectedMode] = useState<'local' | 'ai'>('ai')

  return (
    <Card className="w-full max-w-md mx-auto border-muted shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-primary text-center">
          <TypewriterText text="Selecione o modo de jogo" />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <Button
            variant="outline"
            className={`h-28 flex flex-col items-center justify-center space-y-2 transition-colors ${
              selectedMode === 'local'
                ? 'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground'
                : 'hover:bg-secondary hover:text-secondary-foreground'
            }`}
            onClick={() => setSelectedMode('local')}
          >
            <Users className="w-6 h-6" />
            <span className="text-sm font-medium">Jogo Local</span>
          </Button>
          <Button
            variant="outline"
            className={`h-28 flex flex-col items-center justify-center space-y-2 transition-colors ${
              selectedMode === 'ai'
                ? 'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground'
                : 'hover:bg-secondary hover:text-secondary-foreground'
            }`}
            onClick={() => setSelectedMode('ai')}
          >
            <Robot className="w-6 h-6" />
            <span className="text-sm font-medium">Jogar contra IA</span>
          </Button>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full text-base font-medium bg-primary text-primary-foreground hover:bg-primary/90"
          onClick={() => onSelectMode(selectedMode)}
        >
          Iniciar Jogo
        </Button>
      </CardFooter>
    </Card>
  )
}
