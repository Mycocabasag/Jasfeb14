"use client"

import { useState } from "react"
import QuizPage from "./quiz-page"
import GalleryPage from "./gallery-page"
import { AudioProvider } from "./audio-context"

export default function Page() {
  const [quizCompleted, setQuizCompleted] = useState(false)

  return (
    <AudioProvider>
      <main className="min-h-screen bg-black">
        {!quizCompleted ? <QuizPage onComplete={() => setQuizCompleted(true)} /> : <GalleryPage />}
      </main>
    </AudioProvider>
  )
}

