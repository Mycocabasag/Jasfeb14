"use client"

import type React from "react"
import { createContext, useContext, useRef, useEffect, useState } from "react"

interface AudioContextType {
  isPlaying: boolean
  togglePlay: () => void
}

const AudioContext = createContext<AudioContextType | undefined>(undefined)

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    audioRef.current = new Audio(
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/newmarilag-sYBXcPBFbwjvl7RxxFu5JbF5OtE8Gn.mp3",
    )
    audioRef.current.loop = true

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
      }
    }
  }, [])

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play().catch((error) => console.log("Audio playback failed:", error))
      }
      setIsPlaying(!isPlaying)
    }
  }

  return <AudioContext.Provider value={{ isPlaying, togglePlay }}>{children}</AudioContext.Provider>
}

export function useAudio() {
  const context = useContext(AudioContext)
  if (context === undefined) {
    throw new Error("useAudio must be used within an AudioProvider")
  }
  return context
}

