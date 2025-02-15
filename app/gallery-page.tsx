"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import {
  Heart,
  Compass,
  Ruler,
  Building2,
  PenTool,
  Guitar,
  Music,
  Mic,
  Piano,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  Mail,
} from "lucide-react"

interface PhotoModal {
  src: string
  caption: string
  title: string
}

interface PhotoCollection {
  title: string
  containerImage: string
  photos: PhotoModal[]
}

const photoCollections: Record<string, PhotoCollection> = {
  marilag: {
    title: "My Beautiful Jastine",
    containerImage:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/marilagcontainer.jpg-0HZCbnU8dLddYtOTO4YsUqTVG5JAAS.jpeg",
    photos: [
      {
        src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pretty.jpg-Fdwz12f2CAXPMHEBc49GC2Ylz8gLS8.jpeg",
        caption: "Who wouldn't fall in love with that face?",
        title: "Enchanting Smile",
      },
      {
        src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/babyjas.jpg-LcihRuN03df4LDYwID7e17ItcBUIdi.jpeg",
        caption: "Just 3 cute babies!",
        title: "Time Capsule of Cuteness",
      },
      {
        src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pretty1.jpg-5twuVh6OjaqDNeOF3wlRCuoYPVdWPo.jpeg",
        caption: "Beautiful face, beautiful soul.",
        title: "Radiant Beauty",
      },
      {
        src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pretty2apec.jpg-wk6sT5ftOvpA6PnAaXtsVtFNHWYZOn.jpeg",
        caption: "I had a crush on this!",
        title: "Love at First Sight",
      },
    ],
  },
  nami: {
    title: "Kyotiieess",
    containerImage:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/namicontainer.jpg-JY0ez08S5meXych2vAIQPDHqULdnAl.jpeg",
    photos: [
      {
        src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/nam.jpg-Ix4YkksDyDzNu7nlatKyy5NsnfgDTG.jpeg",
        caption: "Not our dog, but we love her as our own furry daughter! 🐾",
        title: "Our Heart's Most Favorite",
      },
      {
        src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/beri.jpg-LOeysTcGfSn77lk9WiLSXUUWf1taLR.jpeg",
        caption: "Picture of a cute stuffed toy with the cutest woman! Double the cuteness!",
        title: "Berry the hipon",
      },
      {
        src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/lucky.jpg-iIBj0o0zWXlpIPCFwXb3gsC7AELXT6.jpeg",
        caption: "Another adorable moment with her! Who's lucky, the toy or me?",
        title: "Penguin, Nami's kakulay",
      },
    ],
  },
  us: {
    title: "Random love",
    containerImage:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/uscontainer.jpg-Zq9KqNW5yxUQsn3eRWPHeVIeqyiUDx.jpeg",
    photos: [
      {
        src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/us.jpg-D95NTvSYkR7XA2KNaNRYfUP0a3qPU7.jpeg",
        caption:
          "Our little family portrait - just us and our furry baby! Perfect happiness in one frame!💕INANGKIN SI NAMI GUYSSS HAHAHHAHAH",
        title: "Family Love",
      },
      {
        src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/moa.jpg-YzmVRtZ4w5uzuf3Rp7PdlrI7rmmo1b.jpeg",
        caption: "A date after a fight—making up never looked so good!",
        title: "Arcade Adventures",
      },
      {
        src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/studio.jpg-Koqhmb0ozx6hjOiuO7UTmAQcpHTChk.jpeg",
        caption: "Lovely face with a lovely voice—true artistry!",
        title: "Melodic Moments",
      },
      {
        src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/uscoffee.jpg-RETJEk9LRA887hwyiokPX8zgAliXkY.jpeg",
        caption: "Just a cute, pretty face—sweet as coffee!",
        title: "Coffee Date Chronicles",
      },
      {
        src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/usapec.jpg-hZbW3uTp5eNhSxv8isa4aMUud0o55W.jpeg",
        caption: "Nakuha si crush—mission accomplished!",
        title: "Mission: Love Success",
      },
    ],
  },
}

const architectureIcons = [
  { icon: Compass, message: "You're the compass that guides my heart's design! 📐" },
  { icon: Ruler, message: "Measuring my love for you? It's off the scale! 📏" },
  { icon: Building2, message: "Our love is like your plates design - structured beautiful! 🏛️" },
  { icon: PenTool, message: "You sketch buildings, but you've drawn me into my life! ✨" },
]

const musicIcons = [
  { icon: Guitar, message: "You're the melody to my harmony! 🎸" },
  { icon: Music, message: "Our love song is my favorite tune! 🎵" },
  { icon: Mic, message: "You make my heart sing! 🎤" },
  { icon: Piano, message: "Like your 2nd voice skill, we're in harmony! 🎹" },
]

export default function GalleryPage() {
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null)
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)
  const [showQuitDialog, setShowQuitDialog] = useState(false)
  const [quitPunchlineIndex, setQuitPunchlineIndex] = useState(0)
  const [centeredMessage, setCenteredMessage] = useState<string | null>(null)
  const [xClickCount, setXClickCount] = useState(0)
  const [showDefaultXMessage, setShowDefaultXMessage] = useState(false)
  const [showLetter, setShowLetter] = useState(false)

  const quitPunchlines = [
    "Sorry lab, bawal na mag quit. Just like in architecture, there's no escape from perfection! You're stuck with me forever, like a well-designed foundation! 🏗️💕",
    "Wag ka makulit! Bawal ka na umalis sakin!😤💖",
    "Nice try, but my love is like a well-designed foundation - unshakeable! You can't escape this architectural masterpiece of love! 🏛️💝",
    "Trying to escape? Not with these love-reinforced walls! You're trapped in my heart's blueprint forever! 🧱❤️",
    "Exit denied! Our love story is a skyscraper - it only goes up from here! No way but up, just like your beautiful designs! 🏙️💕",
  ]

  const handleNext = () => {
    if (!selectedCollection) return
    const collection = photoCollections[selectedCollection]
    setCurrentPhotoIndex((prev) => (prev + 1) % collection.photos.length)
  }

  const handlePrevious = () => {
    if (!selectedCollection) return
    const collection = photoCollections[selectedCollection]
    setCurrentPhotoIndex((prev) => (prev - 1 + collection.photos.length) % collection.photos.length)
  }

  const handleIconClick = (message: string) => {
    setCenteredMessage(message)
    setTimeout(() => {
      setCenteredMessage((prev) => {
        if (prev === message) {
          return null
        }
        return prev
      })
    }, 3000)
  }

  const handleQuitAttempt = () => {
    setXClickCount((prev) => prev + 1)
    setShowQuitDialog(true)
    setQuitPunchlineIndex(xClickCount % quitPunchlines.length)
  }

  const handleOpenLetter = () => {
    setShowLetter(true)
  }

  const handleCloseLetter = () => {
    setShowLetter(false)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      if (xClickCount === 0) {
        setShowDefaultXMessage(true)
      }
    }, 10000)

    return () => clearTimeout(timer)
  }, [xClickCount])

  useEffect(() => {
    const createMeteor = () => {
      const meteor = document.createElement("div")
      meteor.className = "meteor"
      meteor.style.left = `${Math.random() * 100}%`
      meteor.style.top = "0"
      meteor.style.animationDuration = `${Math.random() * 1 + 0.5}s`
      meteor.style.position = "fixed"
      meteor.style.zIndex = "10"
      document.body.appendChild(meteor)

      setTimeout(() => {
        document.body.removeChild(meteor)
      }, 1000)
    }

    const meteorInterval = setInterval(() => {
      if (Math.random() < 0.3) {
        // 30% chance every second
        createMeteor()
      }
    }, 1000)

    return () => clearInterval(meteorInterval)
  }, [])

  const currentPhoto = selectedCollection ? photoCollections[selectedCollection].photos[currentPhotoIndex] : null

  return (
    <div className="relative min-h-screen bg-black p-4 overflow-hidden">
      {/* Twinkling Stars Background */}
      <div className="fixed inset-0 z-0">
        {Array.from({ length: 100 }).map((_, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute rounded-full bg-white"
            initial={{ opacity: 0.2, scale: 1 }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
            }}
          />
        ))}
      </div>

      {/* Quit Button */}
      <Button
        variant="ghost"
        className="fixed top-2 right-2 sm:top-4 sm:right-4 text-pink-500 hover:text-pink-600 z-50 rounded-full"
        onClick={handleQuitAttempt}
      >
        Quit
      </Button>

      {/* Top Icons */}
      <div className="fixed top-2 sm:top-4 left-0 right-0 flex justify-center gap-4 sm:gap-8 p-4 z-40">
        {architectureIcons.map((icon, index) => (
          <motion.button
            key={`arch-${index}`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => handleIconClick(icon.message)}
            className="p-1.5 rounded-full hover:bg-pink-500/10"
          >
            <icon.icon className="w-4 h-4 sm:w-5 sm:h-5 text-pink-500" />
          </motion.button>
        ))}
      </div>

      {/* Collection Buttons with Images */}
      <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto absolute inset-0 z-10 justify-center items-center p-4 my-12 md:my-24">
        {Object.entries(photoCollections).map(([key, collection]) => (
          <motion.button
            key={key}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="relative w-full md:w-1/3 aspect-[4/3] rounded-lg overflow-hidden group"
            onClick={() => {
              setSelectedCollection(key)
              setCurrentPhotoIndex(0)
            }}
          >
            <Image
              src={collection.containerImage || "/placeholder.svg"}
              alt={collection.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105 rounded-xl"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent transition-opacity duration-300 group-hover:opacity-80" />
            <div className="absolute bottom-0 left-0 right-0 p-3">
              <h3 className="text-base sm:text-lg font-semibold text-center mb-1 text-white">{collection.title}</h3>
              <p className="text-xs sm:text-sm text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white">
                Click to view gallery
              </p>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Bottom Icons with Envelope */}
      <div className="fixed bottom-0 left-0 right-0 flex justify-center gap-8 p-4 z-40">
        {musicIcons.slice(0, 2).map((icon, index) => (
          <motion.button
            key={`music-${index}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => handleIconClick(icon.message)}
            className="p-1.5 rounded-full hover:bg-purple-500/10"
          >
            <icon.icon className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500" />
          </motion.button>
        ))}

        {/* Envelope Icon */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ delay: 0.2 }}
          onClick={handleOpenLetter}
          className="p-1.5 rounded-full hover:bg-pink-500/10"
        >
          <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-pink-500" />
        </motion.button>

        {musicIcons.slice(2).map((icon, index) => (
          <motion.button
            key={`music-${index + 2}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ delay: (index + 3) * 0.1 }}
            onClick={() => handleIconClick(icon.message)}
            className="p-1.5 rounded-full hover:bg-purple-500/10"
          >
            <icon.icon className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500" />
          </motion.button>
        ))}
      </div>

      {/* Centered Message Popup */}
      <AnimatePresence>
        {centeredMessage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 0 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -50 }}
            transition={{ duration: 0.5, exit: { duration: 2 } }}
            className="fixed inset-0 flex items-center justify-center z-50 p-3"
          >
            <div className="bg-pink-500/80 backdrop-blur-sm text-white p-4 rounded-lg shadow-lg max-w-xs text-center text-sm">
              {centeredMessage}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Photo Modal */}
      <Dialog
        open={!!selectedCollection}
        onOpenChange={() => {
          setSelectedCollection(null)
          setCurrentPhotoIndex(0)
        }}
        className="rounded-xl"
      >
        <DialogContent
          className="max-w-3xl bg-black/80 backdrop-blur-sm border-none rounded-xl"
          aria-describedby="photo-dialog-description"
        >
          <Button
            variant="ghost"
            onClick={() => {
              setSelectedCollection(null)
              setCurrentPhotoIndex(0)
            }}
            className="absolute top-2 left-2 text-pink-500 hover:text-pink-400 bg-transparent rounded-full"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          {currentPhoto && (
            <motion.div
              key={currentPhotoIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="relative text-center"
            >
              <div className="absolute top-1/2 left-4 transform -translate-y-1/2 z-50">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation()
                    handlePrevious()
                  }}
                  className="text-pink-500 hover:text-pink-400 bg-transparent rounded-full"
                >
                  <ChevronLeft className="h-8 w-8" />
                </Button>
              </div>

              <div className="absolute top-1/2 right-4 transform -translate-y-1/2 z-50">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleNext()
                  }}
                  className="text-pink-500 hover:text-pink-400 bg-transparent rounded-full"
                >
                  <ChevronRight className="h-8 w-8" />
                </Button>
              </div>

              <h2 className="text-lg sm:text-xl font-semibold text-pink-300 mb-3">{currentPhoto.title}</h2>
              <motion.div
                className="relative w-full h-[300px] sm:h-[400px] mb-3"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Image
                  src={currentPhoto.src || "/placeholder.svg"}
                  alt={currentPhoto.title}
                  fill
                  className="object-contain"
                  priority
                />
              </motion.div>
              <p className="text-pink-200 text-xs sm:text-sm mb-2">{currentPhoto.caption}</p>

              {selectedCollection && (
                <div className="flex justify-center gap-1 mt-3">
                  {Array.from({ length: photoCollections[selectedCollection].photos.length }).map((_, index) => (
                    <motion.button
                      key={index}
                      className={`w-1.5 h-1.5 rounded-full ${
                        index === currentPhotoIndex ? "bg-pink-500" : "bg-pink-500/30"
                      }`}
                      whileHover={{ scale: 1.2 }}
                      onClick={() => setCurrentPhotoIndex(index)}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          )}
          <div id="photo-dialog-description" className="sr-only">
            Photo gallery viewer
          </div>
        </DialogContent>
      </Dialog>

      {/* Quit Dialog */}
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
            Oppss!💖
          </Button>
        </DialogContent>
      </Dialog>

      {/* Love Letter Pop-up */}
      <Dialog open={showLetter} onOpenChange={handleCloseLetter} className="rounded-xl">
        <DialogContent className="max-w-lg bg-[#f0e6d2] border-none mx-2 sm:mx-0 rounded-xl">
          <DialogHeader>
            <DialogTitle className="sr-only">Love Letter</DialogTitle>
          </DialogHeader>
          <div className="p-6 text-gray-800">
            <div className="font-script text-xl sm:text-2xl leading-relaxed space-y-4">
              <p>To: Jastine</p>
              <p className="text-base sm:text-lg">
                Di na ako marunong magsulat ng love letter, HAHAHA. Kaya ito na lang ginawa kong way to express my love
                for u. Ang dami ko pang gustong idagdag sana, kaso parang ayaw mo na akong kausapin kagabi sa call, di
                ka na kumikibo guysss HAHAHA. Pero mas okay na din yon, coz I don't even need to say anything, cause if
                I start, it'll be like a never-ending letter. I got too many words to describe u, my beautiful girl. Ur
                always so cute, just like your family's adorable dog, Nami, no matter what. Just remember that I'm
                always here for u whenever u need me, as long as I can. Love u so much!
              </p>
              <p>
                Love,
                <br />
                Myco
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <style jsx global>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        .romantic-transition {
          animation: heartbeat 1.5s ease-in-out infinite;
        }
        .meteor {
          position: fixed;
          width: 2px;
          height: 90px;
          background: linear-gradient(to bottom, rgba(255, 255, 255, 0), #ffffff);
          transform: rotate(-45deg);
          animation-name: meteor;
          animation-timing-function: linear;
          pointer-events: none;
        }
        @keyframes meteor {
          0% {
            transform: translateY(0) translateX(0) rotate(-45deg);
            opacity: 1;
          }
          100% {
            transform: translateY(1000px) translateX(1000px) rotate(-45deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}

