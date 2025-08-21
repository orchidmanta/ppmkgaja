import React, { useState, useEffect } from 'react'
import { Trophy, Brain, BarChart3, Info, Crown, Medal, Award, Clock, Zap } from 'lucide-react'
import { ElectionsProps, CandidateWithFinalScore } from '../types'

const LeaderboardTab: React.FC<ElectionsProps> = ({ positions, setSelectedCandidate, setCurrentView, handleWinnerClick }) => {
  const [lastUpdate, setLastUpdate] = useState(new Date())
  const [isUpdating, setIsUpdating] = useState(false)

  // Simulate real-time updates every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIsUpdating(true)
      setTimeout(() => {
        setLastUpdate(new Date())
        setIsUpdating(false)
      }, 1000)
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  // Calculate Final Score for candidates with real-time updates
  const calculateFinalScores = (candidates: any[]): CandidateWithFinalScore[] => {
    if (candidates.length === 0) return []
    
    const totalVotes = candidates.reduce((sum, candidate) => sum + candidate.totalVotes, 0)
    
    const candidatesWithScores = candidates.map(candidate => {
      const votePercentage = totalVotes > 0 ? (candidate.totalVotes / totalVotes) * 100 : 0
      const nfaScore = candidate.nfa?.overall || 0
      // Real-time Final Score calculation: 60% votes + 40% NFA
      const finalScore = (0.6 * votePercentage) + (0.4 * nfaScore)
      
      return {
        ...candidate,
        finalScore: Math.round(finalScore * 10) / 10,
        votePercentage: Math.round(votePercentage * 10) / 10
      } as CandidateWithFinalScore
    })
    
    // Real-time ranking based on Final Score
    const sortedCandidates = candidatesWithScores
      .sort((a, b) => b.finalScore - a.finalScore)
      .map((candidate, index) => ({
        ...candidate,
        rank: index + 1
      }))
    
    return sortedCandidates
  }

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A+': case 'A': return 'text-green-400 bg-green-900/20 border-green-500/30'
      case 'A-': case 'B+': return 'text-blue-400 bg-blue-900/20 border-blue-500/30'
      case 'B': case 'B-': return 'text-yellow-400 bg-yellow-900/20 border-yellow-500/30'
      case 'C+': case 'C': return 'text-orange-400 bg-orange-900/20 border-orange-500/30'
      default: return 'text-red-400 bg-red-900/20 border-red-500/30'
    }
  }

  const getFinalScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-400'
    if (score >= 70) return 'text-blue-400'
    if (score >= 55) return 'text-yellow-400'
    if (score >= 40) return 'text-orange-400'
    return 'text-red-400'
  }

  const getRankBadge = (rank: number) => {
    switch (rank) {
      case 1: return { emoji: '🥇', bg: 'bg-yellow-500', text: 'text-black' }
      case 2: return { emoji: '🥈', bg: 'bg-gray-400', text: 'text-black' }
      case 3: return { emoji: '🥉', bg: 'bg-orange-600', text: 'text-white' }
      default: return { emoji: rank.toString(), bg: 'bg-gray-600', text: 'text-white' }
    }
  }

  const getPositionIcon = (positionId: string) => {
    switch (positionId) {
      case 'president': return { icon: Crown, color: 'text-yellow-400' }
      case 'co-president': return { icon: Medal, color: 'text-blue-400' }
      case 'exco-academic': return { icon: Award, color: 'text-purple-400' }
      case 'exco-housing': return { icon: Trophy, color: 'text-green-400' }
      case 'exco-welfare': return { icon: Trophy, color: 'text-pink-400' }
      default: return { icon: Trophy, color: 'text-gray-400' }
    }
  }

  const handleCandidateClick = (candidate: CandidateWithFinalScore, position: any) => {
    if (candidate.rank === 1 && handleWinnerClick) {
      handleWinnerClick(candidate, position)
    } else {
      setSelectedCandidate && setSelectedCandidate(candidate)
      setCurrentView && setCurrentView('profile')
    }
  }

  // Separate positions with and without candidates
  const positionsWithCandidates = positions.filter(pos => pos.candidates.length > 0)
  const positionsWithoutCandidates = positions.filter(pos => pos.candidates.length === 0)

  // Election Timeline (keeping structure but ignoring practicality)
  const electionPhases = [
    { phase: 'Application Period', status: 'completed', date: 'Dec 1-15, 2024' },
    { phase: 'Campaign Period', status: 'active', date: 'Dec 16-30, 2024' },
    { phase: 'Voting Period', status: 'upcoming', date: 'Jan 1-7, 2025' },
    { phase: 'Results Announcement', status: 'upcoming', date: 'Jan 8, 2025' }
  ]

  return (
    <div className="space-y-8">
      {/* Real-Time Header with Live Updates */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-xl border border-gray-600 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
            <Trophy className="w-6 h-6 text-yellow-400" />
            <span>Live AGM Position Rankings</span>
            <div className={`flex items-center space-x-1 ${isUpdating ? 'animate-pulse' : ''}`}>
              <Zap className="w-4 h-4 text-green-400" />
              <span className="text-xs text-green-400 font-medium">LIVE</span>
            </div>
          </h2>
          
          <div className="text-right">
            <div className="flex items-center space-x-2 text-sm text-gray-400 mb-1">
              <Info className="w-4 h-4" />
              <span>Final Score = 60% Votes + 40% NFA AI</span>
            </div>
            <div className="flex items-center space-x-2 text-xs text-gray-500">
              <Clock className="w-3 h-3" />
              <span>Last updated: {lastUpdate.toLocaleTimeString()}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <p className="text-gray-300 text-sm">
            Real-time rankings based on hybrid scoring system. Rankings update automatically as votes and evaluations change.
            Click on the #1 candidate to celebrate their leadership! 🎉
          </p>
          
          {/* Election Timeline Status */}
          <div className="flex items-center space-x-4 text-xs">
            {electionPhases.map((phase, index) => (
              <div key={index} className="flex items-center space-x-1">
                <div className={`w-2 h-2 rounded-full ${
                  phase.status === 'completed' ? 'bg-green-400' :
                  phase.status === 'active' ? 'bg-yellow-400 animate-pulse' :
                  'bg-gray-500'
                }`} />
                <span className={`${
                  phase.status === 'active' ? 'text-yellow-400 font-medium' : 'text-gray-400'
                }`}>
                  {phase.phase}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Real-Time Position Rankings */}
      {positionsWithCandidates.map((position) => {
        const candidatesWithScores = calculateFinalScores(position.candidates)
        const positionIconData = getPositionIcon(position.id)
        const PositionIcon = positionIconData.icon
        const currentLeader = candidatesWithScores[0]
        
        return (
          <div key={position.id} className="bg-gray-800 rounded-xl border border-gray-700 p-6 relative overflow-hidden">
            {/* Real-time update indicator */}
            {isUpdating && (
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse" />
            )}
            
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <PositionIcon className={`w-6 h-6 ${positionIconData.color}`} />
                <div>
                  <h3 className="text-xl font-bold text-white flex items-center space-x-2">
                    <span>{position.title}</span>
                    <span className="text-sm text-gray-400 font-normal">
                      ({candidatesWithScores.length} candidate{candidatesWithScores.length !== 1 ? 's' : ''})
                    </span>
                  </h3>
                  {currentLeader && (
                    <p className="text-sm text-yellow-400 font-medium">
                      🏆 Current Leader: {currentLeader.fullName} (Final Score: {currentLeader.finalScore})
                    </p>
                  )}
                </div>
              </div>
              
              {/* Live Ranking Indicator */}
              <div className="flex items-center space-x-2 bg-green-900/20 border border-green-500/30 rounded-lg px-3 py-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-green-400 text-xs font-medium">LIVE RANKING</span>
              </div>
            </div>
            
            <div className="space-y-4">
              {candidatesWithScores.map((candidate, index) => {
                const rankBadge = getRankBadge(candidate.rank)
                const isLeader = candidate.rank === 1
                const rankChange = index === 0 ? '↗️' : index === candidatesWithScores.length - 1 ? '↘️' : '→'
                
                return (
                  <div 
                    key={candidate.id} 
                    className={`flex items-center space-x-4 p-4 rounded-lg transition-all duration-300 cursor-pointer relative ${
                      isLeader 
                        ? 'bg-gradient-to-r from-yellow-900/20 to-orange-900/20 hover:from-yellow-900/30 hover:to-orange-900/30 border border-yellow-500/30 ring-2 ring-yellow-500/20' 
                        : 'bg-gray-700 hover:bg-gray-600'
                    }`}
                    onClick={() => handleCandidateClick(candidate, position)}
                  >
                    {/* Real-time rank change indicator */}
                    <div className="absolute -top-1 -right-1 text-xs">
                      {rankChange}
                    </div>
                    
                    {/* Rank Badge with Animation */}
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm ${rankBadge.bg} ${rankBadge.text} ${
                      isLeader ? 'animate-pulse shadow-lg shadow-yellow-500/30 ring-2 ring-yellow-400/50' : ''
                    }`}>
                      {rankBadge.emoji}
                    </div>
                    
                    {/* Avatar */}
                    <img
                      src={candidate.photo}
                      alt={candidate.fullName}
                      className={`w-14 h-14 rounded-full object-cover ${
                        isLeader ? 'ring-2 ring-yellow-400/50' : ''
                      }`}
                    />
                    
                    {/* Candidate Info */}
                    <div className="flex-1">
                      <h4 className="text-white font-semibold flex items-center space-x-2">
                        <span>{candidate.fullName}</span>
                        {isLeader && (
                          <div className="flex items-center space-x-1">
                            <span className="text-yellow-400 text-xs font-bold">👑 LEADING</span>
                            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-ping" />
                          </div>
                        )}
                      </h4>
                      <p className="text-gray-400 text-sm">{candidate.university}</p>
                      <p className="text-gray-500 text-xs">{candidate.year} • {candidate.major}</p>
                      {isLeader && (
                        <p className="text-yellow-400 text-xs font-medium mt-1 animate-pulse">
                          🎉 Click to celebrate this leader!
                        </p>
                      )}
                    </div>
                    
                    {/* Real-Time Metrics */}
                    <div className="text-right space-y-1">
                      {/* Final Score with Live Update */}
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-400 text-sm">Final:</span>
                        <span className={`text-2xl font-bold ${getFinalScoreColor(candidate.finalScore)} ${
                          isUpdating ? 'animate-pulse' : ''
                        }`}>
                          {candidate.finalScore}
                        </span>
                        {isLeader && <span className="text-yellow-400 text-xs">🔥</span>}
                      </div>
                      
                      {/* NFA Grade & Score */}
                      <div className="flex items-center space-x-2">
                        <Brain className="w-3 h-3 text-purple-400" />
                        {candidate.nfa && (
                          <div className={`px-2 py-0.5 rounded text-xs font-bold border ${getGradeColor(candidate.nfa.grade)}`}>
                            {candidate.nfa.grade} {candidate.nfa.overall}
                          </div>
                        )}
                      </div>
                      
                      {/* Live Vote Count */}
                      <div className="flex items-center space-x-2 text-sm">
                        <BarChart3 className="w-3 h-3 text-blue-400" />
                        <span className={`text-gray-400 ${isUpdating ? 'animate-pulse' : ''}`}>
                          {candidate.totalVotes} votes ({candidate.votePercentage}%)
                        </span>
                      </div>
                      
                      {/* Rank Position */}
                      <div className="text-xs text-gray-500">
                        Rank #{candidate.rank} of {candidatesWithScores.length}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
            
            {/* Position Summary with Live Stats */}
            <div className="mt-6 p-4 bg-gray-600 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">
                    <strong>{position.title}:</strong> {position.description}
                  </p>
                </div>
                <div className="text-right text-xs text-gray-400">
                  <div>Total Votes: {candidatesWithScores.reduce((sum, c) => sum + c.totalVotes, 0)}</div>
                  <div>Avg Final Score: {Math.round(candidatesWithScores.reduce((sum, c) => sum + c.finalScore, 0) / candidatesWithScores.length * 10) / 10}</div>
                </div>
              </div>
            </div>
          </div>
        )
      })}

      {/* Open Positions (Timeline Maintained) */}
      {positionsWithoutCandidates.length > 0 && (
        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
            <Trophy className="w-6 h-6 text-gray-400" />
            <span>Open Positions</span>
            <span className="text-sm text-orange-400">(Application Period: Dec 1-15, 2024)</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {positionsWithoutCandidates.map((position) => {
              const positionIconData = getPositionIcon(position.id)
              const PositionIcon = positionIconData.icon
              
              return (
                <div key={position.id} className="bg-gray-700 rounded-lg p-4 border-2 border-dashed border-gray-600">
                  <div className="flex items-center space-x-3 mb-2">
                    <PositionIcon className={`w-5 h-5 ${positionIconData.color}`} />
                    <h4 className="text-white font-semibold">{position.title}</h4>
                  </div>
                  <p className="text-gray-400 text-sm mb-3">{position.description}</p>
                  <div className="flex items-center space-x-2 text-gray-500 text-sm">
                    <span>🔍 No candidates yet</span>
                  </div>
                  <div className="mt-2 text-xs text-gray-500">
                    Be the first to apply for this position!
                  </div>
                </div>
              )
            })}
          </div>
          
          <div className="mt-4 p-3 bg-blue-900/20 border border-blue-500/30 rounded-lg">
            <p className="text-blue-300 text-sm flex items-center space-x-2">
              <Info className="w-4 h-4" />
              <span>
                These positions are still open for applications. Use the AGM Application button to apply with AI role recommendation!
              </span>
            </p>
          </div>
        </div>
      )}

      {/* Live Election Statistics */}
      <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 border border-purple-500/30 rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
          <BarChart3 className="w-6 h-6 text-purple-400" />
          <span>Live Election Statistics</span>
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className={`text-2xl font-bold text-white ${isUpdating ? 'animate-pulse' : ''}`}>
              {positions.length}
            </div>
            <div className="text-sm text-gray-400">Total Positions</div>
          </div>
          
          <div className="text-center">
            <div className={`text-2xl font-bold text-green-400 ${isUpdating ? 'animate-pulse' : ''}`}>
              {positionsWithCandidates.length}
            </div>
            <div className="text-sm text-gray-400">Active Races</div>
          </div>
          
          <div className="text-center">
            <div className={`text-2xl font-bold text-yellow-400 ${isUpdating ? 'animate-pulse' : ''}`}>
              {positions.reduce((sum, pos) => sum + pos.candidates.length, 0)}
            </div>
            <div className="text-sm text-gray-400">Total Candidates</div>
          </div>
          
          <div className="text-center">
            <div className={`text-2xl font-bold text-blue-400 ${isUpdating ? 'animate-pulse' : ''}`}>
              {positions.reduce((sum, pos) => sum + pos.candidates.reduce((voteSum, candidate) => voteSum + candidate.totalVotes, 0), 0)}
            </div>
            <div className="text-sm text-gray-400">Total Votes Cast</div>
          </div>
        </div>
        
        {/* Timeline Status */}
        <div className="mt-6 pt-4 border-t border-gray-600">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Election Timeline:</span>
            <div className="flex items-center space-x-4">
              {electionPhases.map((phase, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${
                    phase.status === 'completed' ? 'bg-green-400' :
                    phase.status === 'active' ? 'bg-yellow-400 animate-pulse' :
                    'bg-gray-500'
                  }`} />
                  <span className={`text-xs ${
                    phase.status === 'active' ? 'text-yellow-400 font-medium' : 'text-gray-400'
                  }`}>
                    {phase.phase}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LeaderboardTab
