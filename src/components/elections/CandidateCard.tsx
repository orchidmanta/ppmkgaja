import React from 'react'
import { Star, BarChart3, CheckCircle, Brain } from 'lucide-react'
import { Candidate, ElectionsProps } from './types'

interface CandidateCardProps extends ElectionsProps {
  candidate: Candidate
}

const CandidateCard: React.FC<CandidateCardProps> = ({ 
  candidate, 
  selectedPosition,
  selectedVote,
  userRatings,
  setCurrentView,
  setSelectedCandidate,
  setSelectedVote,
  canVoteForPosition
}) => {
  const userRating = userRatings.find(r => r.candidateId === candidate.id)
  const isRated = !!userRating

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A+': case 'A': return 'text-green-400 bg-green-900/20 border-green-500/30'
      case 'A-': case 'B+': return 'text-blue-400 bg-blue-900/20 border-blue-500/30'
      case 'B': case 'B-': return 'text-yellow-400 bg-yellow-900/20 border-yellow-500/30'
      case 'C+': case 'C': return 'text-orange-400 bg-orange-900/20 border-orange-500/30'
      default: return 'text-red-400 bg-red-900/20 border-red-500/30'
    }
  }

  const renderNFAScore = () => {
    if (!candidate.nfa) return null

    return (
      <div className="mt-4 p-4 bg-gray-700 rounded-lg border border-gray-600">
        <div className="flex items-center space-x-2 mb-3">
          <Brain className="w-5 h-5 text-purple-400" />
          <span className="text-white font-semibold">NFA AI Evaluation</span>
          <div className={`px-2 py-1 rounded text-sm font-bold border ${getGradeColor(candidate.nfa.grade)}`}>
            {candidate.nfa.grade}
          </div>
          <span className="text-gray-400">({candidate.nfa.overall}/100)</span>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
          <div className="text-center">
            <div className="text-sm text-gray-400">Events</div>
            <div className="text-white font-semibold">{candidate.nfa.subscores.events}</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-400">Leadership</div>
            <div className="text-white font-semibold">{candidate.nfa.subscores.leadership}</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-400">Reputation</div>
            <div className="text-white font-semibold">{candidate.nfa.subscores.reputation}</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-400">Agenda</div>
            <div className="text-white font-semibold">{candidate.nfa.subscores.agendaFeasibility}</div>
          </div>
        </div>
        
        <p className="text-gray-300 text-sm">{candidate.nfa.summary}</p>
      </div>
    )
  }

  return (
    <div
      className={`bg-gray-800 rounded-xl border p-6 transition-colors cursor-pointer ${
        selectedVote === candidate.id 
          ? 'border-green-500 bg-green-900/20' 
          : 'border-gray-700 hover:border-purple-500'
      }`}
      onClick={() => {
        if (selectedPosition && canVoteForPosition(selectedPosition)) {
          setSelectedVote(selectedVote === candidate.id ? null : candidate.id)
        }
      }}
    >
      <div className="text-center mb-4">
        <img
          src={candidate.photo}
          alt={candidate.fullName}
          className="w-20 h-20 rounded-full object-cover mx-auto mb-3"
        />
        <h3 className="text-lg font-bold text-white">{candidate.fullName}</h3>
        <p className="text-gray-400">{candidate.year} • {candidate.major}</p>
        <p className="text-gray-500 text-sm">{candidate.university}</p>
      </div>

      <div className="mb-4">
        <p className="text-purple-400 font-semibold text-center italic">"{candidate.slogan}"</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {candidate.badges.slice(0, 3).map((badge, index) => (
          <span
            key={index}
            className={`px-2 py-1 ${badge.color} text-white text-xs rounded-full flex items-center space-x-1`}
          >
            <span>{badge.icon}</span>
            <span>{badge.name}</span>
          </span>
        ))}
        {candidate.badges.length > 3 && (
          <span className="px-2 py-1 bg-gray-600 text-white text-xs rounded-full">
            +{candidate.badges.length - 3} more
          </span>
        )}
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
          <span className="text-white font-semibold">{candidate.averageRating}</span>
        </div>
        <div className="flex items-center space-x-2">
          <BarChart3 className="w-4 h-4 text-blue-400" />
          <span className="text-gray-400 text-sm">{candidate.totalVotes} votes</span>
        </div>
      </div>

      {renderNFAScore()}

      <div className="space-y-2 mt-4">
        <button
          onClick={(e) => {
            e.stopPropagation()
            setSelectedCandidate(candidate)
            setCurrentView('profile')
          }}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          View Full Profile
        </button>
        
        {isRated ? (
          <div className="flex items-center justify-center space-x-2 text-green-400">
            <CheckCircle className="w-4 h-4" />
            <span className="text-sm">Rated</span>
          </div>
        ) : (
          <button
            onClick={(e) => {
              e.stopPropagation()
              setSelectedCandidate(candidate)
              setCurrentView('rating')
            }}
            className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Rate Now
          </button>
        )}
      </div>
    </div>
  )
}

export default CandidateCard
