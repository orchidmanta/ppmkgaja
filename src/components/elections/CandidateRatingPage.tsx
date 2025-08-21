import React from 'react'
import { 
  ArrowLeft, 
  Calendar, 
  GraduationCap, 
  User, 
  Star, 
  BarChart3, 
  Send 
} from 'lucide-react'
import { ElectionsProps, Rating } from './types'

const CandidateRatingPage: React.FC<ElectionsProps> = ({
  selectedCandidate,
  selectedPosition,
  userRatings,
  currentRating,
  currentComment,
  setCurrentView,
  setSelectedCandidate,
  setCurrentComment,
  handleRatingChange,
  isRatingComplete,
  submitRating
}) => {
  if (!selectedCandidate) return null

  const userRating = userRatings.find(r => r.candidateId === selectedCandidate.id)

  const skillLabels = {
    communication: 'Communication',
    leadership: 'Leadership',
    problemSolving: 'Problem Solving',
    participation: 'Participation',
    integrity: 'Integrity'
  }

  const renderStarRating = (value: number, onChange?: (value: number) => void, readonly = false) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            disabled={readonly}
            onClick={() => onChange && onChange(star)}
            className={`${readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110'} transition-transform`}
          >
            <Star
              className={`w-5 h-5 ${
                star <= value
                  ? 'text-yellow-400 fill-yellow-400'
                  : 'text-gray-400'
              }`}
            />
          </button>
        ))}
      </div>
    )
  }

  const goBack = () => {
    if (selectedPosition) {
      setCurrentView('position')
    } else {
      setCurrentView('home')
    }
    setSelectedCandidate(null)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center space-x-4 mb-8">
        <button
          onClick={goBack}
          className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to {selectedPosition ? selectedPosition.title : 'Elections'}</span>
        </button>
      </div>

      <div className="bg-gray-800 rounded-xl border border-gray-700 p-8">
        {/* Candidate Header */}
        <div className="flex items-start space-x-6 mb-8">
          <img
            src={selectedCandidate.photo}
            alt={selectedCandidate.fullName}
            className="w-24 h-24 rounded-full object-cover"
          />
          
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-white mb-2">{selectedCandidate.fullName}</h1>
            <div className="flex items-center space-x-4 text-gray-400 mb-4">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>{selectedCandidate.year}</span>
              </div>
              <div className="flex items-center space-x-2">
                <GraduationCap className="w-4 h-4" />
                <span>{selectedCandidate.major}</span>
              </div>
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>{selectedCandidate.university}</span>
              </div>
            </div>
            
            <div className="mb-4">
              <p className="text-purple-400 font-semibold italic">"{selectedCandidate.slogan}"</p>
            </div>

            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="text-white font-semibold">{selectedCandidate.averageRating}</span>
                <span className="text-gray-400 text-sm">average rating</span>
              </div>
              <div className="flex items-center space-x-2">
                <BarChart3 className="w-4 h-4 text-blue-400" />
                <span className="text-white font-semibold">{selectedCandidate.totalVotes}</span>
                <span className="text-gray-400 text-sm">votes</span>
              </div>
            </div>
          </div>
        </div>

        {/* Rating Section */}
        {!userRating ? (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Rate This Candidate</h2>
            <div className="bg-gray-700 rounded-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-6">
                {Object.entries(skillLabels).map(([skill, label]) => (
                  <div key={skill} className="text-center">
                    <p className="text-gray-300 mb-3 font-medium">{label}</p>
                    {renderStarRating(
                      currentRating[skill as keyof Rating],
                      (value) => handleRatingChange(skill as keyof Rating, value)
                    )}
                  </div>
                ))}
              </div>

              <div className="mb-6">
                <label className="block text-gray-300 mb-3 font-medium">Public Comment (Optional)</label>
                <textarea
                  value={currentComment}
                  onChange={(e) => setCurrentComment(e.target.value)}
                  placeholder="Share your thoughts about this candidate..."
                  className="w-full px-4 py-3 bg-gray-600 border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  rows={4}
                />
                <p className="text-gray-400 text-sm mt-2">Your comment will be public. Please be respectful and constructive.</p>
              </div>

              <button
                onClick={submitRating}
                disabled={!isRatingComplete()}
                className="flex items-center space-x-2 px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                <Send className="w-5 h-5" />
                <span>Submit Rating</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-8">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-white fill-white" />
              </div>
              <h3 className="text-xl font-bold text-green-400 mb-2">Rating Submitted!</h3>
              <p className="text-gray-300">Thank you for rating {selectedCandidate.fullName}. Your feedback helps other students make informed decisions.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CandidateRatingPage
