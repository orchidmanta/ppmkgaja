import React from 'react'
import { ArrowLeft, Users } from 'lucide-react'
import CandidateCard from './CandidateCard'
import { ElectionsProps } from './types'

const PositionView: React.FC<ElectionsProps> = (props) => {
  const { 
    selectedPosition, 
    setCurrentView, 
    getPositionProgress, 
    canVoteForPosition, 
    submitVote, 
    selectedVote 
  } = props

  if (!selectedPosition) return null

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center space-x-4 mb-8">
        <button
          onClick={() => setCurrentView('home')}
          className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Elections</span>
        </button>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">{selectedPosition.title}</h1>
        <p className="text-gray-400">{selectedPosition.description}</p>
        
        {selectedPosition.candidates.length > 0 && (
          <div className="mt-4">
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">Rating Progress</span>
                  <span className="text-sm text-gray-400">{Math.round(getPositionProgress(selectedPosition))}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-purple-500 h-2 rounded-full transition-all"
                    style={{ width: `${getPositionProgress(selectedPosition)}%` }}
                  />
                </div>
              </div>
              
              {canVoteForPosition(selectedPosition) && (
                <button
                  onClick={submitVote}
                  disabled={!selectedVote}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Submit Vote
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {selectedPosition.candidates.length === 0 ? (
        <div className="text-center py-12">
          <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-400 mb-2">No candidates yet</h3>
          <p className="text-gray-500">Candidates for this position will be announced soon</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {selectedPosition.candidates.map((candidate) => (
            <CandidateCard key={candidate.id} candidate={candidate} {...props} />
          ))}
        </div>
      )}
    </div>
  )
}

export default PositionView
