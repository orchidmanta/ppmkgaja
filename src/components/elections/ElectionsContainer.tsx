import React, { useState, useEffect } from 'react'
import Sidebar from '../Sidebar'
import ElectionsHome from './ElectionsHome'
import PositionView from './PositionView'
import CandidateProfilePage from './CandidateProfilePage'
import CandidateRatingPage from './CandidateRatingPage'
import WinnerCelebrationPopup from './WinnerCelebrationPopup'
import { computeNFA } from '../../utils/nfa'
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

  const [comments] = useState<Comment[]>([
    {
      id: '1',
      candidateId: 'pres-1',
      username: 'student_voice',
      comment: 'Ahmad has shown great leadership in organizing events. His agenda is very practical and achievable.',
      timestamp: '2 hours ago'
    },
    {
      id: '2',
      candidateId: 'pres-1',
      username: 'concerned_member',
      comment: 'I appreciate his focus on mental health support. This is much needed in our community.',
      timestamp: '5 hours ago'
    },
    {
      id: '3',
      candidateId: 'pres-2',
      username: 'forum_regular',
      comment: 'Sarah\'s experience in student welfare is impressive. Her proposals are well-researched.',
      timestamp: '1 day ago'
    }
  ])

  const [positions, setPositions] = useState<Position[]>([
    {
      id: 'president',
      title: 'President',
      description: 'Lead the organization and represent all Malaysian students',
      candidates: [
        {
          id: 'pres-1',
          roleId: 'president',
          fullName: 'Ahmad Faiz bin Abdullah',
          year: 'Year 3',
          major: 'International Relations',
          university: 'Seoul National University',
          slogan: 'Unity Through Action - Building Bridges, Creating Change 🌉',
          agenda: 'My vision centers on three pillars: Enhanced Student Support, Stronger Community Bonds, and Academic Excellence.\n\n1. **Mental Health Initiative**: Establish peer counseling programs and stress management workshops during exam periods with a timeline of Q1 2025 rollout.\n\n2. **Career Development Hub**: Create mentorship programs connecting seniors with juniors, and organize industry networking events with Malaysian companies in Korea. Budget allocation of 50% for workshops and partnerships.\n\n3. **Cultural Integration**: Launch monthly cultural exchange events with Korean students and expand our traditional festival celebrations with KPI targets of 200+ participants per quarter.\n\n4. **Academic Support Network**: Develop subject-specific study groups and create a digital resource library for course materials with deliverable deadlines every semester.\n\n5. **Emergency Support Fund**: Establish a community fund to help students facing unexpected financial difficulties with pilot program starting January 2025.',
          photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
          badges: [
            { name: 'Event Organizer Leader (2025)', icon: '🎯', color: 'bg-blue-500' },
            { name: 'Volunteer Leader Excellence', icon: '🤝', color: 'bg-green-500' },
            { name: 'Academic Excellence Mentor', icon: '📚', color: 'bg-purple-500' },
            { name: 'Community Builder Ambassador', icon: '🏘️', color: 'bg-orange-500' },
            { name: 'Mentorship Program Champion', icon: '👨‍🏫', color: 'bg-indigo-500' }
          ],
          forumStats: {
            posts: 89,
            upvotes: 234,
            downvotes: 12,
            uniCommunityScore: 92
          },
          agendaFeasibilityNotes: 'Highly feasible agenda with clear implementation steps, concrete timeline, and budget considerations. Has demonstrated leadership experience and strong community connections with proven track record in program delivery.',
          totalVotes: 156,
          averageRating: 4.3,
          totalRatings: 45
        },
        {
          id: 'pres-2',
          roleId: 'president',
          fullName: 'Sarah Lim Wei Ling',
          year: 'Year 4',
          major: 'Business Administration',
          university: 'Korea University',
          slogan: 'Empowering Every Voice - Your Success, Our Mission 💪',
          agenda: 'As a senior student who has navigated the challenges of studying in Korea, I understand what we need most.\n\n1. **Student Welfare Revolution**: Implement 24/7 support hotline and emergency assistance program for students facing academic or personal crises with partnership agreements and database systems.\n\n2. **Digital Transformation**: Modernize our communication systems with a mobile app for event updates, academic resources, and peer connections. Development timeline spans 2 quarters with industry partnerships.\n\n3. **Industry Partnerships**: Establish formal partnerships with top Korean companies for internship opportunities and job placements. Target 15+ companies by semester end with workshop series.\n\n4. **Housing Support Initiative**: Create a verified housing database and roommate matching system to help students find safe, affordable accommodation with safety protocols and KPI tracking.\n\n5. **Alumni Network Expansion**: Build stronger connections with PPMK graduates working in Korea and Malaysia for career guidance and opportunities through mentorship programs and quarterly networking events.',
          photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
          badges: [
            { name: 'Student Welfare Leader', icon: '❤️', color: 'bg-red-500' },
            { name: 'Tech Innovation Organizer (Q4)', icon: '💻', color: 'bg-cyan-500' },
            { name: 'Business Leader Excellence', icon: '💼', color: 'bg-gray-600' },
            { name: 'Hackathon Winner Champion', icon: '🏆', color: 'bg-yellow-500' },
            { name: 'Peer Counselor Health', icon: '🧠', color: 'bg-pink-500' },
            { name: 'Alumni Connector Industry', icon: '🔗', color: 'bg-teal-500' }
          ],
          forumStats: {
            posts: 67,
            upvotes: 189,
            downvotes: 8,
            uniCommunityScore: 88
          },
          agendaFeasibilityNotes: 'Well-structured agenda with strong focus on practical solutions and industry partnerships. Excellent track record in student welfare initiatives with concrete deliverables and timeline planning.',
          totalVotes: 134,
          averageRating: 4.1,
          totalRatings: 38
        },
        {
          id: 'pres-3',
          roleId: 'president',
          fullName: 'Raj Kumar Krishnan',
          year: 'Year 2',
          major: 'Computer Science',
          university: 'KAIST',
          slogan: 'Innovation Meets Tradition - Tech-Powered Community 🚀',
          agenda: 'Bringing fresh perspectives and innovative solutions to traditional challenges. I hope to explore new possibilities and maybe implement some exciting changes.\n\n1. **Smart Campus Initiative**: Develop AI-powered study matching system and automated event management platform. We could aspire to create something revolutionary.\n\n2. **Sustainability Program**: Launch eco-friendly campus initiatives and partner with Korean environmental organizations. Someday we might achieve carbon neutrality.\n\n3. **Skills Development Bootcamps**: Organize coding workshops, language exchange programs, and professional development seminars.\n\n4. **Virtual Reality Cultural Center**: Create immersive experiences showcasing Malaysian culture to Korean students and universities.',
          photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
          badges: [
            { name: 'Tech Innovator', icon: '⚡', color: 'bg-blue-600' },
            { name: 'Coding Mentor', icon: '👨‍💻', color: 'bg-green-600' },
            { name: 'Sustainability Advocate', icon: '🌱', color: 'bg-emerald-500' }
          ],
          forumStats: {
            posts: 60,
            upvotes: 100,
            downvotes: 1,
            uniCommunityScore: 100
          },
          agendaFeasibilityNotes: 'Ambitious agenda with innovative ideas, but may need more concrete implementation plans and community engagement experience. Lacks specific timelines and measurable deliverables.',
          totalVotes: 50,
          averageRating: 3.9,
          totalRatings: 23
        }
      ]
    },
    {
      id: 'co-president',
      title: 'Co-President',
      description: 'Support the President and lead special initiatives',
      candidates: []
    },
    {
      id: 'exco-academic',
      title: 'EXCO Academic',
      description: 'Oversee academic programs and student support services',
      candidates: []
    },
    {
      id: 'exco-housing',
      title: 'EXCO Housing',
      description: 'Manage housing assistance and accommodation support',
      candidates: []
    },
    {
      id: 'exco-welfare',
      title: 'EXCO Student Welfare',
      description: 'Focus on student wellbeing and support services',
      candidates: []
    }
  ])

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
