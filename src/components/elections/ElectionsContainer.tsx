import React, { useState, useEffect } from 'react'
import Sidebar from '../Sidebar'
import ElectionsHome from './ElectionsHome'
import PositionView from './PositionView'
import CandidateProfilePage from './CandidateProfilePage'
import CandidateRatingPage from './CandidateRatingPage'
import WinnerCelebrationPopup from './WinnerCelebrationPopup'
import { computeNFA } from '../../utils/nfa'
import { mockPositions, mockComments } from '../../data/mockElectionsData'
import { Position, Candidate, UserRating, Rating, Comment, NFAResult } from './types'

const ElectionsContainer: React.FC = () => {
  const [currentView, setCurrentView] = useState<'home' | 'position' | 'profile' | 'rating'>('home')
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(null)
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null)
  const [activeTab, setActiveTab] = useState<'overview' | 'my-ratings' | 'leaderboard'>('overview')
  const [userRatings, setUserRatings] = useState<UserRating[]>([])
  const [currentRating, setCurrentRating] = useState<Rating>({
    communication: 0,
    leadership: 0,
    problemSolving: 0,
    participation: 0,
    integrity: 0
  })
  const [currentComment, setCurrentComment] = useState('')
  const [selectedVote, setSelectedVote] = useState<string | null>(null)
  const [showWinnerPopup, setShowWinnerPopup] = useState(false)
  const [winnerData, setWinnerData] = useState<{ candidate: Candidate; position: Position } | null>(null)

  // Use imported mock data instead of hardcoded data
  const [comments] = useState<Comment[]>(mockComments)
  const [positions, setPositions] = useState<Position[]>(mockPositions)

  // Compute NFA scores for all candidates on component mount
  useEffect(() => {
    setPositions(prevPositions => 
      prevPositions.map(position => ({
        ...position,
        candidates: position.candidates.map(candidate => {
          if (!candidate.nfa) {
            const badgeStrings = candidate.badges.map(badge => badge.name)
            
            const candidateComments = comments
              .filter(c => c.candidateId === candidate.id)
              .map(c => ({
                user: c.username,
                text: c.comment,
                createdAt: c.timestamp
              }))
            
            const nfa = computeNFA({
              fullName: candidate.fullName,
              badges: badgeStrings,
              forumStats: candidate.forumStats,
              averageRating: candidate.averageRating,
              totalRatings: candidate.totalRatings,
              agenda: candidate.agenda,
              agendaFeasibilityNotes: candidate.agendaFeasibilityNotes,
              comments: candidateComments
            })
            
            return { ...candidate, nfa }
          }
          return candidate
        })
      }))
    )
  }, [comments])

  const profanityFilter = (text: string): string => {
    const badWords = ['stupid', 'idiot', 'hate', 'sucks', 'terrible', 'awful']
    let filtered = text
    badWords.forEach(word => {
      const regex = new RegExp(word, 'gi')
      filtered = filtered.replace(regex, '*'.repeat(word.length))
    })
    return filtered
  }

  const handleRatingChange = (skill: keyof Rating, value: number) => {
    setCurrentRating(prev => ({
      ...prev,
      [skill]: value
    }))
  }

  const isRatingComplete = () => {
    return Object.values(currentRating).every(rating => rating > 0)
  }

  const getPositionProgress = (position: Position) => {
    const ratedCandidates = position.candidates.filter(candidate => 
      userRatings.some(rating => rating.candidateId === candidate.id)
    )
    return position.candidates.length > 0 ? (ratedCandidates.length / position.candidates.length) * 100 : 0
  }

  const canVoteForPosition = (position: Position) => {
    return getPositionProgress(position) === 100
  }

  const submitRating = () => {
    if (!selectedCandidate || !isRatingComplete()) return

    const filteredComment = profanityFilter(currentComment)
    
    const newRating: UserRating = {
      candidateId: selectedCandidate.id,
      rating: currentRating,
      comment: filteredComment
    }

    setUserRatings(prev => {
      const existing = prev.findIndex(r => r.candidateId === selectedCandidate.id)
      if (existing >= 0) {
        const updated = [...prev]
        updated[existing] = newRating
        return updated
      }
      return [...prev, newRating]
    })

    setCurrentRating({
      communication: 0,
      leadership: 0,
      problemSolving: 0,
      participation: 0,
      integrity: 0
    })
    setCurrentComment('')
    
    setCurrentView('position')
    setSelectedCandidate(null)
  }

  const submitVote = () => {
    if (!selectedVote || !selectedPosition) return
    alert(`Vote submitted for ${selectedPosition.candidates.find(c => c.id === selectedVote)?.fullName}!`)
    setSelectedVote(null)
  }

  const handleWinnerClick = (candidate: Candidate, position: Position) => {
    setWinnerData({ candidate, position })
    setShowWinnerPopup(true)
  }

  const sharedProps = {
    positions,
    selectedPosition,
    selectedCandidate,
    activeTab,
    userRatings,
    currentRating,
    currentComment,
    selectedVote,
    comments,
    setCurrentView,
    setSelectedPosition,
    setSelectedCandidate,
    setActiveTab,
    setCurrentRating,
    setCurrentComment,
    setSelectedVote,
    handleRatingChange,
    isRatingComplete,
    getPositionProgress,
    canVoteForPosition,
    submitRating,
    submitVote,
    handleWinnerClick
  }

  return (
    <div className="flex min-h-screen bg-gray-900">
      <Sidebar />
      
      <div className="flex-1 p-8">
        {currentView === 'home' && <ElectionsHome {...sharedProps} />}
        {currentView === 'position' && <PositionView {...sharedProps} />}
        {currentView === 'profile' && <CandidateProfilePage {...sharedProps} />}
        {currentView === 'rating' && <CandidateRatingPage {...sharedProps} />}
      </div>

      {showWinnerPopup && winnerData && (
        <WinnerCelebrationPopup
          candidate={winnerData.candidate}
          position={winnerData.position}
          onClose={() => {
            setShowWinnerPopup(false)
            setWinnerData(null)
          }}
        />
      )}
    </div>
  )
}

export default ElectionsContainer
