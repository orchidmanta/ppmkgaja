import React, { useState } from 'react'
import { Users, Trophy, BarChart3, Calendar, ArrowRight, UserPlus, Brain } from 'lucide-react'
import { ElectionsProps } from './types'
import AGMApplicationPopup from './AGMApplicationPopup'

const ElectionsHome: React.FC<ElectionsProps> = ({
  positions,
  setCurrentView,
  setSelectedPosition,
  setActiveTab,
  getPositionProgress,
  canVoteForPosition
}) => {
  const [showApplicationPopup, setShowApplicationPopup] = useState(false)

  const handlePositionClick = (position: any) => {
    setSelectedPosition(position)
    setActiveTab('overview')
    setCurrentView('position')
  }

  const handleViewLeaderboard = () => {
    setActiveTab('leaderboard')
    setCurrentView('position')
    // Set a position with candidates to show leaderboard
    const positionWithCandidates = positions.find(pos => pos.candidates.length > 0)
    if (positionWithCandidates) {
      setSelectedPosition(positionWithCandidates)
    }
  }

  const handleStartEvaluating = () => {
    const firstPosition = positions.find(p => p.candidates.length > 0)
    if (firstPosition) {
      setSelectedPosition(firstPosition)
      setActiveTab('overview')
      setCurrentView('position')
    }
  }

  const totalCandidates = positions.reduce((sum, pos) => sum + pos.candidates.length, 0)
  const completedPositions = positions.filter(pos => canVoteForPosition(pos)).length
  const averageProgress = positions.length > 0 
    ? positions.reduce((sum, pos) => sum + getPositionProgress(pos), 0) / positions.length 
    : 0

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">
          PPMK AGM Elections 2025
        </h1>
        <p className="text-xl text-gray-300 mb-8">
          Shape the future of Malaysian students in Korea
        </p>
        
        {/* Action Buttons - All Active */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => setShowApplicationPopup(true)}
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 font-medium flex items-center space-x-2 shadow-lg"
          >
            <UserPlus className="w-5 h-5" />
            <span>AGM Application</span>
          </button>

          <button
            onClick={handleViewLeaderboard}
            className="px-8 py-3 bg-gradient-to-r from-yellow-600 to-orange-600 text-white rounded-lg hover:from-yellow-700 hover:to-orange-700 transition-all duration-200 font-medium flex items-center space-x-2 shadow-lg"
          >
            <Trophy className="w-5 h-5" />
            <span>View Live Rankings</span>
          </button>

          <button
            onClick={handleStartEvaluating}
            className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 font-medium flex items-center space-x-2 shadow-lg"
          >
            <BarChart3 className="w-5 h-5" />
            <span>Start Evaluating</span>
          </button>
          
          <div className="flex items-center space-x-2 text-gray-400 text-sm">
            <Brain className="w-4 h-4" />
            <span>All features active simultaneously</span>
          </div>
        </div>
      </div>

      {/* All Features Active Notice */}
      <div className="bg-gradient-to-r from-green-900/30 to-blue-900/30 border border-green-500/30 rounded-xl p-6 mb-8">
        <div className="text-center">
          <h3 className="text-xl font-bold text-white mb-2">🚀 All Features Active</h3>
          <p className="text-green-300 text-sm mb-4">
            AGM Application, Live Rankings, and Candidate Evaluation are all available simultaneously for testing
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => setShowApplicationPopup(true)}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm"
            >
              Apply Now
            </button>
            <button
              onClick={handleViewLeaderboard}
              className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors text-sm"
            >
              View Rankings
            </button>
            <button
              onClick={handleStartEvaluating}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
            >
              Evaluate Candidates
            </button>
          </div>
        </div>
      </div>

      {/* Quick Access to Live Rankings */}
      <div className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 border border-yellow-500/30 rounded-xl p-6 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Trophy className="w-8 h-8 text-yellow-400" />
            <div>
              <h3 className="text-xl font-bold text-white">🔥 Live Position Rankings</h3>
              <p className="text-yellow-300 text-sm">Real-time Final Score-based leadership rankings</p>
            </div>
          </div>
          <button
            onClick={handleViewLeaderboard}
            className="px-6 py-3 bg-yellow-500 text-black rounded-lg hover:bg-yellow-400 transition-colors font-bold flex items-center space-x-2"
          >
            <BarChart3 className="w-5 h-5" />
            <span>VIEW RANKINGS</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
        
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-yellow-400">{positions.filter(p => p.candidates.length > 0).length}</div>
            <div className="text-xs text-yellow-300">Active Races</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-yellow-400">{totalCandidates}</div>
            <div className="text-xs text-yellow-300">Total Candidates</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-yellow-400">LIVE</div>
            <div className="text-xs text-yellow-300">Real-Time Updates</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-yellow-400">60/40</div>
            <div className="text-xs text-yellow-300">Votes/NFA Split</div>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
          <div className="flex items-center space-x-3 mb-2">
            <Users className="w-6 h-6 text-blue-400" />
            <span className="text-gray-400">Total Positions</span>
          </div>
          <div className="text-3xl font-bold text-white">{positions.length}</div>
        </div>

        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
          <div className="flex items-center space-x-3 mb-2">
            <Trophy className="w-6 h-6 text-yellow-400" />
            <span className="text-gray-400">Candidates</span>
          </div>
          <div className="text-3xl font-bold text-white">{totalCandidates}</div>
        </div>

        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
          <div className="flex items-center space-x-3 mb-2">
            <BarChart3 className="w-6 h-6 text-green-400" />
            <span className="text-gray-400">Your Progress</span>
          </div>
          <div className="text-3xl font-bold text-white">{Math.round(averageProgress)}%</div>
        </div>

        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
          <div className="flex items-center space-x-3 mb-2">
            <Calendar className="w-6 h-6 text-purple-400" />
            <span className="text-gray-400">Ready to Vote</span>
          </div>
          <div className="text-3xl font-bold text-white">{completedPositions}</div>
        </div>
      </div>

      {/* Positions Grid - All Clickable */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-6">Available Positions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {positions.map((position) => {
            const progress = getPositionProgress(position)
            const canVote = canVoteForPosition(position)
            
            return (
              <div
                key={position.id}
                onClick={() => handlePositionClick(position)}
                className="bg-gray-800 rounded-xl border border-gray-700 p-6 hover:border-purple-500 transition-all duration-200 cursor-pointer group"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">
                    {position.title}
                  </h3>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-purple-400 transition-colors" />
                </div>
                
                <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                  {position.description}
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Candidates</span>
                    <span className="text-white font-semibold">{position.candidates.length}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Your Progress</span>
                    <span className="text-white font-semibold">{Math.round(progress)}%</span>
                  </div>
                  
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  
                  {position.candidates.length > 0 && (
                    <div className="flex items-center space-x-2 text-green-400 text-sm">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span>Ready to evaluate</span>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Call to Action - All Features Active */}
      <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 border border-purple-500/30 rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Ready to Make Your Voice Heard?</h2>
        <p className="text-gray-300 mb-6">
          All features are active! Apply as a candidate, view live rankings, and evaluate candidates simultaneously.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => setShowApplicationPopup(true)}
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 font-medium flex items-center justify-center space-x-2"
          >
            <UserPlus className="w-5 h-5" />
            <span>Apply as Candidate</span>
          </button>
          
          <button
            onClick={handleViewLeaderboard}
            className="px-8 py-3 bg-gradient-to-r from-yellow-600 to-orange-600 text-white rounded-lg hover:from-yellow-700 hover:to-orange-700 transition-all duration-200 font-medium flex items-center justify-center space-x-2"
          >
            <Trophy className="w-5 h-5" />
            <span>View Live Rankings</span>
          </button>
          
          <button
            onClick={handleStartEvaluating}
            className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 font-medium flex items-center justify-center space-x-2"
          >
            <BarChart3 className="w-5 h-5" />
            <span>Start Evaluating</span>
          </button>
        </div>
      </div>

      {/* AGM Application Popup */}
      <AGMApplicationPopup 
        isOpen={showApplicationPopup}
        onClose={() => setShowApplicationPopup(false)}
      />
    </div>
  )
}

export default ElectionsHome
