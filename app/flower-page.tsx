"use client"

import { useState } from "react"
import { AnimatedFlower } from "@/components/animated-flower"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronDown, ChevronUp, Palette } from "lucide-react"

const colorPresets = [
  {
    name: "Ocean Blue",
    colors: {
      primary: "#a7ffee",
      secondary: "#54b8aa",
      accent: "#39c6d6",
      stem: "#14757a",
      grass: "#159faa",
      longGrass: "#1aaa15",
    },
  },
  {
    name: "Sunset Pink",
    colors: {
      primary: "#ffb3e6",
      secondary: "#ff66d9",
      accent: "#ff1acc",
      stem: "#cc0099",
      grass: "#ff3399",
      longGrass: "#e6005c",
    },
  },
  {
    name: "Spring Green",
    colors: {
      primary: "#b3ffb3",
      secondary: "#66ff66",
      accent: "#1aff1a",
      stem: "#009900",
      grass: "#00cc00",
      longGrass: "#00ff00",
    },
  },
  {
    name: "Purple Dream",
    colors: {
      primary: "#d9b3ff",
      secondary: "#b366ff",
      accent: "#8c1aff",
      stem: "#6600cc",
      grass: "#7f00ff",
      longGrass: "#9933ff",
    },
  },
  {
    name: "Golden Sunset",
    colors: {
      primary: "#ffe6b3",
      secondary: "#ffcc66",
      accent: "#ffb31a",
      stem: "#cc8800",
      grass: "#ff9900",
      longGrass: "#ffaa00",
    },
  },
  {
    name: "Cherry Blossom",
    colors: {
      primary: "#ffcccb",
      secondary: "#ff9999",
      accent: "#ff6666",
      stem: "#8b4513",
      grass: "#90ee90",
      longGrass: "#32cd32",
    },
  },
]

export default function FlowerPage() {
  const [selectedColors, setSelectedColors] = useState(colorPresets[0].colors)
  const [isVisible, setIsVisible] = useState(true)
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Flower Animation */}
      {isVisible && <AnimatedFlower colors={selectedColors} />}

      {/* Control Panel - Collapsible */}
      <Card className="absolute top-4 left-4 right-4 md:right-auto md:w-80 bg-black/90 backdrop-blur-sm border-white/30 text-white z-50 transition-all duration-300">
        <CardHeader className="cursor-pointer select-none pb-2" onClick={() => setIsExpanded(!isExpanded)}>
          <CardTitle className="text-lg font-semibold flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Palette className="w-5 h-5" />
              <span className="hidden sm:inline">Flower Colors</span>
              <span className="sm:hidden">Colors</span>
            </div>
            {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </CardTitle>
        </CardHeader>

        {isExpanded && (
          <CardContent className="space-y-3 pt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-2">
              {colorPresets.map((preset) => (
                <Button
                  key={preset.name}
                  variant={selectedColors === preset.colors ? "default" : "outline"}
                  className="w-full justify-start text-sm h-9 bg-transparent hover:bg-white/10 border-white/20"
                  onClick={() => setSelectedColors(preset.colors)}
                >
                  <div
                    className="w-3 h-3 rounded-full mr-2 border border-white/30 flex-shrink-0"
                    style={{ backgroundColor: preset.colors.primary }}
                  />
                  <span className="truncate">{preset.name}</span>
                </Button>
              ))}
            </div>

            <div className="pt-2 border-t border-white/20">
              <Button
                variant="outline"
                className="w-full bg-transparent hover:bg-white/10 border-white/20 h-9"
                onClick={() => setIsVisible(!isVisible)}
              >
                {isVisible ? "Hide Garden" : "Show Garden"}
              </Button>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Quick Toggle Button - Always visible */}
      <Button
        variant="outline"
        size="sm"
        className="absolute top-4 right-4 md:right-auto md:left-[22rem] bg-black/90 backdrop-blur-sm border-white/30 text-white hover:bg-white/10 z-50"
        onClick={() => setIsVisible(!isVisible)}
      >
        {isVisible ? "🙈" : "🌸"}
      </Button>

      {/* Music Controls */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-black/70 rounded-full px-4 py-2 border border-white/20">
        <audio id="flower-music" src="/placeholder.mp3" autoPlay loop preload="auto" />
        <Button
          variant="default"
          size="sm"
          onClick={() => {
            const audio = document.getElementById("flower-music") as HTMLAudioElement
            if (audio.paused) {
              audio.play()
            } else {
              audio.pause()
            }
          }}
        >
          🎵 Play/Pause
        </Button>
      </div>
    </div>
  )
}
