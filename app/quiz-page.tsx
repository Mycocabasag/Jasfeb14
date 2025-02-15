"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { motion, AnimatePresence } from "framer-motion"
import { Heart } from "lucide-react"
import { useAudio } from "./audio-context"

const architectureQuestions = [
  {
    question: "Which tool is used to draw straight lines in architectural drawings?",
    options: ["Protractor", "T-Square", "Ruler", "Set Square"],
    correctAnswer: "T-Square",
  },
  {
    question: "What is the traditional material for tracing paper used in architectural sketches?",
    options: ["Canvas", "Plastic", "Linen", "Cardboard"],
    correctAnswer: "Linen",
  },
  {
    question: "What is the name of the surface where architects draft their designs?",
    options: ["Workbench", "Easel", "Drawing Table", "Clipboard"],
    correctAnswer: "Drawing Table",
  },
  {
    question: "Which tool is essential for drawing perfect circles in architecture?",
    options: ["Ruler", "Compass", "Caliper", "Divider"],
    correctAnswer: "Compass",
  },
  {
    question: "What do architects use to remove pencil marks from drawings?",
    options: ["Brush", "Eraser", "Sandpaper", "Marker"],
    correctAnswer: "Eraser",
  },
]

const loveQuestions = [
  {
    question:
      "You'd better start running, Jastine, because once I catch you, do you really think you can escape my love? 😏🔥",
    options: [
      "Not a chance. Can't escape. 😏",
      "I can just click 'Quit' at the top right lol.😂",
      "Negative. Can't escape. 🚀",
      "Yeah… nah. Can't escape. 🤷‍♀️",
    ],
    correctAnswer: "Not a chance. Can't escape. 😏",
  },
  {
    question: "Every night that we're on a call, what usually happens? 😴☎️",
    options: [
      "He fall asleep first while I'm still doing my plates. As usual. 🙄",
      "I just randomly get mad, but when I'm asked why, I just say 'ewan.' 🤣",
      "We both just exist in silence, scrolling TikTok, presence is enough. 😌",
      "All of the above, because this is literally our routine. 🤣",
    ],
    correctAnswer: "All of the above, because this is literally our routine. 🤣",
  },
  {
    question: "Every time we eat unli wings, what ALWAYS happens? 🍗😂",
    options: [
      "We orders like we're in a food challenge, but struggles halfway. 😭",
      "I laugh at him for not finishing, but end up getting mad. 🙄",
      "We like all flavors, that's why we order a lot, but I still end up giving him my leftovers. 😏",
      "All of the above, because every unli session turns into a debate. 🤣",
    ],
    correctAnswer: "All of the above, because every unli session turns into a debate. 🤣",
  },
  {
    question: "When I randomly get mad, how does he react? 😡",
    options: [
      "He asks 'what's wrong?' knowing damn well I'll say 'ewan.' 🤡",
      "He tries to 'suyo' me, but I make it extra hard for him. 😈",
      "He sends food or memes, hoping I forgive him through laughter. 😭",
      "All of the above, because he's stuck in a never-ending 'suyo' cycle. 🤣",
    ],
    correctAnswer: "All of the above, because he's stuck in a never-ending 'suyo' cycle. 🤣",
  },
  {
    question: "How do our study nights usually go? 📚📱",
    options: [
      "I'm sitting, focused on my plates. He's lying down, probably half-asleep. 😴",
      "I'm stressed with deadlines, he's just vibing with his phone. 📱",
      "I'm working hard, he randomly says 'hmmm' so I think he's still awake. 😏",
      "All of the above, because this is literally our routine. 🤣",
    ],
    correctAnswer: "All of the above, because this is literally our routine. 🤣",
  },
]

const flirtyPunchlines = {
  0: "Just like a failed design submission... but our love story? That's a masterpiece! 💝",
  1: "One right answer—just like how there's only one you for me! 😘",
  2: "Two right answers! Like how we're two perfectly aligned structural beams! 💕",
  3: "Three correct! You're as precise as your technical drawings! 📐",
  4: "Four right! Our love is as solid as reinforced concrete! 🏛️",
  5: "Perfect score! You've mastered architecture AND my heart! 💖",
  6: "Wow! 6/5? You're defying the laws of architecture and love! You're my impossible structure come true! 🌟🏗️💘",
}

interface QuizPageProps {
  onComplete: () => void
}

export default function QuizPage({ onComplete }: QuizPageProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [showScore, setShowScore] = useState(false)
  const [magicalMode, setMagicalMode] = useState(false)
  const [showQuitDialog, setShowQuitDialog] = useState(false)
  const [quitPunchlineIndex, setQuitPunchlineIndex] = useState(0)
  const { isPlaying, togglePlay } = useAudio()
  const [selectedArchQuestion] = useState(() => {
    const randomIndex = Math.floor(Math.random() * architectureQuestions.length)
    return architectureQuestions[randomIndex]
  })
  const [xClickCount, setXClickCount] = useState(0)
  const [showDefaultXMessage, setShowDefaultXMessage] = useState(false)

  const quitPunchlines = [
    "Sorry lab, bawal na mag quit. Just like in architecture, there's no escape from perfection! You're stuck with me forever, like a well-designed foundation! 🏗️💕",
    "Wag ka makulit! Bawal ka na umalis sakin!😤💖",
    "Nice try, but my love is like a well-designed foundation - unshakeable! You can't escape this architectural masterpiece of love! 🏛️💝",
    "Trying to escape? Not with these love-reinforced walls! You're trapped in my heart's blueprint forever! 🧱❤️",
    "Exit denied! Our love story is a skyscraper - it only goes up from here! No way but up, just like your beautiful designs! 🏙️💕",
  ]

  useEffect(() => {
    const timer = setTimeout(() => {
      if (xClickCount === 0) {
        setShowDefaultXMessage(true)
      }
    }, 10000)

    return () => clearTimeout(timer)
  }, [xClickCount])

  const getCurrentQuestion = () => {
    if (currentQuestion === 0) return selectedArchQuestion
    const loveQuestionIndex = currentQuestion - 1
    return loveQuestionIndex < loveQuestions.length ? loveQuestions[loveQuestionIndex] : null
  }

  useEffect(() => {
    if (magicalMode && !isPlaying) {
      togglePlay()
    }
  }, [magicalMode, isPlaying, togglePlay])

  const handleAnswer = (selectedAnswer: string) => {
    const question = getCurrentQuestion()
    if (!question) return

    if (selectedAnswer === question.correctAnswer) {
      setScore(score + 1)
    }

    if (currentQuestion === 0) {
      setMagicalMode(true)
    }

    // Check for the specific option and trigger quit dialog
    if (selectedAnswer === "I can just click 'Quit' at the top right lol.😂") {
      handleQuitAttempt()
      return
    }

    const nextQuestion = currentQuestion + 1
    if (nextQuestion < 6) {
      setCurrentQuestion(nextQuestion)
    } else {
      setShowScore(true)
    }
  }

  const handleQuitAttempt = () => {
    setXClickCount((prev) => prev + 1)
    setShowQuitDialog(true)
    setQuitPunchlineIndex(xClickCount % quitPunchlines.length)
  }

  const currentQuestion_ = getCurrentQuestion()
  if (!currentQuestion_) return null

  return (
    <div className="relative min-h-screen flex items-center justify-center p-8 sm:p-12 transition-all duration-1000">
      <div className="fixed inset-0 bg-black">
        {magicalMode && (
          <>
            {Array.from({ length: 100 }).map((_, i) => (
              <div
                key={`star-${i}`}
                className="absolute rounded-full bg-white"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  width: `${Math.random() * 2 + 1}px`,
                  height: `${Math.random() * 2 + 1}px`,
                  animation: `twinkle ${Math.random() * 3 + 2}s infinite ${Math.random() * 2}s`,
                }}
              />
            ))}
          </>
        )}
      </div>

      {currentQuestion > 0 && (
        <Button
          variant="ghost"
          className="fixed top-2 right-2 sm:top-4 sm:right-4 text-pink-500 hover:text-pink-600 z-50 rounded-full"
          onClick={handleQuitAttempt}
        >
          Quit
        </Button>
      )}

      <AnimatePresence mode="wait">
        {!showScore ? (
          <motion.div
            key="question"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-2xl mx-auto sm:mx-4 z-10"
          >
            <div
              className={`p-4 sm:p-6 rounded-xl ${
                magicalMode
                  ? "bg-opacity-5 bg-white backdrop-blur-sm shadow-lg shadow-pink-500/10"
                  : "bg-white/5 backdrop-blur-sm"
              }`}
            >
              <div
                className={`text-base sm:text-lg font-medium mb-4 sm:mb-6 ${magicalMode ? "text-pink-300" : "text-gray-200"}`}
              >
                {currentQuestion_.question}
              </div>
              <div className="grid gap-3 sm:gap-4">
                {currentQuestion_.options.map((option, index) => (
                  <Button
                    key={index}
                    onClick={() => handleAnswer(option)}
                    className={`w-full text-left p-3 sm:p-4 text-sm sm:text-base break-words whitespace-normal h-auto min-h-12 rounded-full ${
                      magicalMode
                        ? "bg-pink-500/10 hover:bg-pink-500/20 text-pink-100"
                        : "bg-white/10 hover:bg-white/20 text-gray-200"
                    }`}
                    variant="ghost"
                  >
                    {option}
                  </Button>
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="score"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center z-10 mx-2 sm:mx-4 w-full max-w-2xl"
          >
            <div className="p-4 sm:p-6 rounded-xl bg-opacity-5 bg-white backdrop-blur-sm shadow-lg shadow-pink-500/10">
              <h2 className="text-2xl sm:text-3xl font-bold text-pink-300 mb-3 sm:mb-4">Score: {score}/5</h2>
              <p className="text-pink-200 text-base sm:text-lg mb-4 sm:mb-6">
                {flirtyPunchlines[score as keyof typeof flirtyPunchlines]}
              </p>
              <div className="flex justify-center mb-4">
                <Heart className="w-12 h-12 sm:w-16 sm:h-16 text-pink-500 animate-pulse" />
              </div>
              <Button
                onClick={onComplete}
                className="bg-pink-500/80 hover:bg-pink-600/80 text-white text-base sm:text-lg rounded-full px-6 py-2"
              >
                Continue
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Dialog open={showQuitDialog} onOpenChange={setShowQuitDialog} className="rounded-xl">
        <DialogContent
          className="bg-pink-50/90 backdrop-blur-sm border-none mx-2 sm:mx-0 max-w-[95vw] sm:max-w-md rounded-xl"
          aria-describedby="quit-dialog-description"
        >
          <DialogHeader>
            <DialogTitle className="text-center text-pink-600 flex items-center justify-center gap-2 text-sm sm:text-base">
              <Heart className="w-3 h-3 sm:w-4 sm:h-4" />
              Nice try, but...
            </DialogTitle>
          </DialogHeader>
          <div id="quit-dialog-description" className="text-center text-gray-700 p-2 sm:p-3 text-xs sm:text-sm">
            {showDefaultXMessage && xClickCount === 0
              ? "Sorry lab, but just like in architecture, there's no escape from perfection! You're stuck with me forever, just like a well-designed foundation! 🏗️💕"
              : quitPunchlines[quitPunchlineIndex]}
          </div>
          <Button
            onClick={() => setShowQuitDialog(false)}
            className="bg-pink-500/80 hover:bg-pink-600/80 text-white text-xs sm:text-sm rounded-full"
          >
            Kkk fine 💖
          </Button>
        </DialogContent>
      </Dialog>

      <style jsx global>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
    </div>
  )
}

