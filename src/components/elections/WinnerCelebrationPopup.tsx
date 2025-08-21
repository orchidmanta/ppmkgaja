import React, { useEffect, useState } from 'react'
import { X, Trophy, Crown, Star, Sparkles } from 'lucide-react'
import { Candidate, Position } from './types'

interface WinnerCelebrationPopupProps {
  candidate: Candidate
  position: Position
  onClose: () => void
}

const WinnerCelebrationPopup: React.FC<WinnerCelebrationPopupProps> = ({
  candidate,
  position,
  onClose
}) => {
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    setShowConfetti(true)
    const timer = setTimeout(() => setShowConfetti(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  const getPositionTitle = () => {
    switch (position.id) {
      case 'president': return 'PPMK President'
      case 'co-president': return 'PPMK Co-President'
      case 'exco-academic': return 'PPMK EXCO Academic'
      case 'exco-housing': return 'PPMK EXCO Housing'
      case 'exco-welfare': return 'PPMK EXCO Student Welfare'
      default: return `PPMK ${position.title}`
    }
  }

  const confettiPieces = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 3,
    duration: 3 + Math.random() * 2,
    color: ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'][Math.floor(Math.random() * 6)]
  }))

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {confettiPieces.map((piece) => (
            <div
              key={piece.id}
              className="absolute w-3 h-3 opacity-90"
              style={{
                left: `${piece.left}%`,
                backgroundColor: piece.color,
                animation: `confetti-fall ${piece.duration}s linear ${piece.delay}s infinite`,
                transform: 'rotate(45deg)'
              }}
            />
          ))}
        </div>
      )}

      {/* Popup Content */}
      <div className="bg-gray-800 rounded-2xl border border-gray-700 p-8 max-w-2xl w-full mx-4 relative overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Background Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-transparent to-purple-500/10 pointer-events-none" />

        {/* Content */}
        <div className="relative text-center">
          {/* Crown and Trophy Icons */}
          <div className="flex justify-center items-center space-x-4 mb-6">
            <Crown className="w-12 h-12 text-yellow-400 animate-bounce" />
            <Trophy className="w-16 h-16 text-yellow-500 animate-pulse" />
            <Crown className="w-12 h-12 text-yellow-400 animate-bounce" style={{ animationDelay: '0.5s' }} />
          </div>

          {/* Winner Announcement */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2 animate-pulse">
              🎉 CONGRATULATIONS! 🎉
            </h1>
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Sparkles className="w-6 h-6 text-yellow-400" />
              <h2 className="text-2xl font-bold text-yellow-400">
                Our {getPositionTitle()} is
              </h2>
              <Sparkles className="w-6 h-6 text-yellow-400" />
            </div>
          </div>

          {/* Candidate Info */}
          <div className="bg-gray-700 rounded-xl p-6 mb-6 border-2 border-yellow-500/30">
            <img
              src={candidate.photo}
              alt={candidate.fullName}
              className="w-32 h-32 rounded-full object-cover mx-auto mb-4 border-4 border-yellow-400 shadow-lg"
            />
            
            <h3 className="text-3xl font-bold text-white mb-2">{candidate.fullName}</h3>
            <p className="text-gray-300 mb-2">{candidate.year} • {candidate.major}</p>
            <p className="text-gray-400 text-sm mb-4">{candidate.university}</p>
            
            <div className="bg-purple-900/30 rounded-lg p-4 mb-4">
              <p className="text-purple-300 font-semibold italic text-lg">"{candidate.slogan}"</p>
            </div>

            {/* Winner Stats */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-gray-600 rounded-lg p-3">
                <div className="flex items-center justify-center space-x-1 mb-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="text-yellow-400 font-bold">{candidate.averageRating}</span>
                </div>
                <p className="text-gray-400 text-xs">Rating</p>
              </div>
              <div className="bg-gray-600 rounded-lg p-3">
                <div className="text-blue-400 font-bold text-lg">{candidate.totalVotes}</div>
                <p className="text-gray-400 text-xs">Votes</p>
              </div>
              <div className="bg-gray-600 rounded-lg p-3">
                <div className="text-purple-400 font-bold text-lg">{candidate.nfa?.grade || 'N/A'}</div>
                <p className="text-gray-400 text-xs">NFA Grade</p>
              </div>
            </div>
          </div>

          {/* Celebration Message */}
          <div className="bg-gradient-to-r from-yellow-500/20 to-purple-500/20 rounded-lg p-4 mb-6">
            <p className="text-white text-lg font-medium">
              🌟 Ready to lead PPMK to new heights! 🌟
            </p>
            <p className="text-gray-300 text-sm mt-2">
              Thank you to all candidates and voters for making this democratic process possible.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={onClose}
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
            >
              View Full Profile
            </button>
            <button
              onClick={onClose}
              className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
            >
              Back to Elections
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes confetti-fall {
          0% {
            transform: translateY(-100vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}

export default WinnerCelebrationPopup
