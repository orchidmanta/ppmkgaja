import React from 'react'
import { Trophy, Brain, BarChart3, Info } from 'lucide-react'
import { ElectionsProps, CandidateWithFinalScore } from '../types'

const LeaderboardTab: React.FC<ElectionsProps> = ({ positions, setSelectedCandidate, setCurrentView, handleWinnerClick }) => {
  // Calculate Final Score for candidates
  const calculateFinalScores = (candidates: any[]): CandidateWithFinalScore[] => {
    if (candidates.length === 0) return []
    
    const totalVotes = candidates.reduce((sum, candidate) => sum + candidate.totalVotes, 0)
    
    const candidatesWithScores = candidates.map(candidate => {
      const votePercentage = totalVotes > 0 ? (candidate.totalVotes / totalVotes) * 100 : 0
      const nfaScore = candidate.nfa?.overall || 0
      const finalScore = (0.6 * votePercentage) + (0.4 * nfaScore)
      
      return {
        ...candidate,
        finalScore: Math.round(finalScore * 10) / 10,
        votePercentage: Math.round(votePercentage * 10) / 10
      } as CandidateWithFinalScore
    })
    
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

  const handleCandidateClick = (candidate: CandidateWithFinalScore, position: any) => {
    if (candidate.rank === 1 && handleWinnerClick) {
      handleWinnerClick(candidate, position)
    } else {
      setSelectedCandidate && setSelectedCandidate(candidate)
      setCurrentView && setCurrentView('profile')
    }
  }

  return (
    <div className="space-y-6">
      {positions.map((position) => {
        const candidatesWithScores = calculateFinalScores(position.candidates)
        
        return (
          candidatesWithScores.length > 0 && (
            <div key={position.id} className="bg-gray-800 rounded-xl border border-gray-700 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white flex items-center space-x-2">
                  <Trophy className="w-6 h-6 text-yellow-400" />
                  <span>{position.title}</span>
                </h3>
                
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <Info className="w-4 h-4" />
                  <span>Final = 60% Votes + 40% NFA</span>
                </div>
              </div>
              
              <div className="space-y-4">
                {candidatesWithScores.map((candidate) => {
                  const rankBadge = getRankBadge(candidate.rank)
                  
                  return (
                    <div 
                      key={candidate.id} 
                      className={`flex items-center space-x-4 p-4 bg-gray-700 rounded-lg transition-colors cursor-pointer ${
                        candidate.rank === 1 
                          ? 'hover:bg-yellow-900/20 hover:border-yellow-500 border border-transparent' 
                          : 'hover:bg-gray-600'
                      }`}
                      onClick={() => handleCandidateClick(candidate, position)}
                    >
                      {/* Rank Badge */}
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${rankBadge.bg} ${rankBadge.text} ${candidate.rank === 1 ? 'animate-pulse' : ''}`}>
                        {rankBadge.emoji}
                      </div>
                      
                      {/* Avatar */}
                      <img
                        src={candidate.photo}
                        alt={candidate.fullName}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      
                      {/* Candidate Info */}
                      <div className="flex-1">
                        <h4 className="text-white font-semibold">{candidate.fullName}</h4>
                        <p className="text-gray-400 text-sm">{candidate.university}</p>
                        {candidate.rank === 1 && (
                          <p className="text-yellow-400 text-xs font-medium">👑 Click to celebrate!</p>
                        )}
                      </div>
                      
                      {/* Metrics */}
                      <div className="text-right space-y-1">
                        {/* Final Score */}
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-400 text-sm">Final:</span>
                          <span className={`text-xl font-bold ${getFinalScoreColor(candidate.finalScore)}`}>
                            {candidate.finalScore}
                          </span>
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
                        
                        {/* Votes */}
                        <div className="flex items-center space-x-2 text-sm">
                          <BarChart3 className="w-3 h-3 text-blue-400" />
                          <span className="text-gray-400">
                            {candidate.totalVotes} votes ({candidate.votePercentage}%)
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
              
              {/* Formula Explanation */}
              <div className="mt-4 p-3 bg-gray-600 rounded-lg">
                <p className="text-gray-300 text-sm">
                  <strong>Final Score Formula:</strong> 60% of vote percentage + 40% of NFA AI score. 
                  Rankings are determined by this hybrid scoring system combining democratic voting with AI evaluation.
                </p>
              </div>
            </div>
          )
        )
      })}
    </div>
  )
}

export default LeaderboardTab
