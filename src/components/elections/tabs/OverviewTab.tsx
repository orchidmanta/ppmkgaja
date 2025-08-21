import React from 'react'
import { Users, ChevronRight, Star, Trophy, Eye } from 'lucide-react'
import { ElectionsProps } from '../types'

const OverviewTab: React.FC<ElectionsProps> = ({ 
  selectedPosition,
  setCurrentView, 
  setSelectedCandidate
}) => {
  if (!selectedPosition || selectedPosition.candidates.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="bg-gray-800 rounded-xl border border-gray-700 p-8">
          <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">No Candidates Yet</h3>
          <p className="text-gray-400">
            This position doesn't have any candidates registered yet. Check back later or consider applying!
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">
          Candidates for {selectedPosition.title}
        </h2>
        <div className="text-sm text-gray-400">
          {selectedPosition.candidates.length} candidate{selectedPosition.candidates.length !== 1 ? 's' : ''}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {selectedPosition.candidates.map((candidate) => (
          <div
            key={candidate.id}
            className="bg-gray-800 rounded-xl border border-gray-700 p-6 hover:border-purple-500 transition-all duration-200"
          >
            <div className="flex items-start space-x-6">
              <img
                src={candidate.photo}
                alt={candidate.fullName}
                className="w-20 h-20 rounded-full object-cover"
              />
              
              <div className="flex-1">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">{candidate.fullName}</h3>
                    <p className="text-purple-400 font-medium italic">"{candidate.slogan}"</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-white font-semibold">{candidate.averageRating}</span>
                    <span className="text-gray-400 text-sm">({candidate.totalRatings})</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-gray-400 mb-4">
                  <span>{candidate.year}</span>
                  <span>•</span>
                  <span>{candidate.major}</span>
                  <span>•</span>
                  <span>{candidate.university}</span>
                </div>

                {/* NFA Score Display */}
                {candidate.nfa && (
                  <div className="mb-4 p-3 bg-gray-700 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-300">NFA Score</span>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded text-xs font-bold ${
                          candidate.nfa.grade.startsWith('A') ? 'bg-green-600 text-white' :
                          candidate.nfa.grade.startsWith('B') ? 'bg-blue-600 text-white' :
                          'bg-yellow-600 text-white'
                        }`}>
                          {candidate.nfa.grade}
                        </span>
                        <span className="text-white font-bold">{candidate.nfa.overall}/100</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-400">{candidate.nfa.summary}</p>
                  </div>
                )}

                {/* Badges */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {candidate.badges.slice(0, 3).map((badge, index) => (
                    <span
                      key={index}
                      className={`px-3 py-1 ${badge.color} text-white text-xs rounded-full flex items-center space-x-1`}
                    >
                      <span>{badge.icon}</span>
                      <span>{badge.name}</span>
                    </span>
                  ))}
                  {candidate.badges.length > 3 && (
                    <span className="px-3 py-1 bg-gray-600 text-white text-xs rounded-full">
                      +{candidate.badges.length - 3} more
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <button
                    onClick={() => {
                      setSelectedCandidate(candidate)
                      setCurrentView('profile')
                    }}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                  >
                    <Eye className="w-4 h-4" />
                    <span>View Profile</span>
                  </button>
                  
                  <button
                    onClick={() => {
                      setSelectedCandidate(candidate)
                      setCurrentView('rating')
                    }}
                    className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm"
                  >
                    <Star className="w-4 h-4" />
                    <span>Rate Candidate</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default OverviewTab
