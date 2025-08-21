import React, { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import { 
  Vote, 
  Users, 
  Star, 
  MessageCircle, 
  Award, 
  ChevronRight,
  ArrowLeft,
  Send,
  CheckCircle,
  Trophy,
  BarChart3,
  User,
  Calendar,
  GraduationCap,
  Target,
  TrendingUp,
  Brain,
  Zap,
  Info
} from 'lucide-react'
import { computeNFA } from '../utils/nfa'

interface Badge {
  name: string
  icon: string
  color: string
}

interface ForumStats {
  posts: number
  upvotes: number
  downvotes?: number
  uniCommunityScore: number
}

interface Comment {
  id: string
  candidateId: string
  username: string
  comment: string
  timestamp: string
}

interface NFAResult {
  subscores: {
    events: number
    leadership: number
    reputation: number
    agendaFeasibility: number
  }
  overall: number
  grade: 'A+' | 'A' | 'A-' | 'B+' | 'B' | 'B-' | 'C+' | 'C' | 'D'
  summary: string
}

interface Candidate {
  id: string
  roleId: 'president' | 'copresident' | 'academic' | 'housing' | 'welfare'
  fullName: string
  year: string
  major: string
  university: string
  slogan: string
  agenda: string
  photo: string
  badges: Badge[]
  forumStats: ForumStats
  agendaFeasibilityNotes: string
  totalVotes: number
  averageRating: number
  totalRatings: number
  nfa?: NFAResult
}

interface Position {
  id: string
  title: string
  description: string
  candidates: Candidate[]
}

interface Rating {
  communication: number
  leadership: number
  problemSolving: number
  participation: number
  integrity: number
}

interface UserRating {
  candidateId: string
  rating: Rating
  comment: string
}

interface CandidateWithFinalScore extends Candidate {
  finalScore: number
  votePercentage: number
  rank: number
}

const ElectionsPage: React.FC = () => {
  const [currentView, setCurrentView] = useState<'home' | 'position' | 'candidate'>('home')
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

  // Mock data for President candidates with enhanced badges for NFA scoring
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
            // Convert badges to string array for NFA computation
            const badgeStrings = candidate.badges.map(badge => badge.name)
            
            // Convert comments for this candidate
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

  // Calculate Final Score for candidates
  const calculateFinalScores = (candidates: Candidate[]): CandidateWithFinalScore[] => {
    if (candidates.length === 0) return []
    
    // Calculate total votes for this position
    const totalVotes = candidates.reduce((sum, candidate) => sum + candidate.totalVotes, 0)
    
    // Calculate final scores and percentages
    const candidatesWithScores = candidates.map(candidate => {
      const votePercentage = totalVotes > 0 ? (candidate.totalVotes / totalVotes) * 100 : 0
      const nfaScore = candidate.nfa?.overall || 0
      const finalScore = (0.6 * votePercentage) + (0.4 * nfaScore)
      
      return {
        ...candidate,
        finalScore: Math.round(finalScore * 10) / 10, // Round to 1 decimal
        votePercentage: Math.round(votePercentage * 10) / 10 // Round to 1 decimal
      } as CandidateWithFinalScore
    })
    
    // Sort by final score descending and assign ranks
    const sortedCandidates = candidatesWithScores
      .sort((a, b) => b.finalScore - a.finalScore)
      .map((candidate, index) => ({
        ...candidate,
        rank: index + 1
      }))
    
    return sortedCandidates
  }

  const skillLabels = {
    communication: 'Communication',
    leadership: 'Leadership',
    problemSolving: 'Problem Solving',
    participation: 'Participation',
    integrity: 'Integrity'
  }

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

    // Reset form
    setCurrentRating({
      communication: 0,
      leadership: 0,
      problemSolving: 0,
      participation: 0,
      integrity: 0
    })
    setCurrentComment('')
    
    // Go back to position view
    setCurrentView('position')
    setSelectedCandidate(null)
  }

  const submitVote = () => {
    if (!selectedVote || !selectedPosition) return
    alert(`Vote submitted for ${selectedPosition.candidates.find(c => c.id === selectedVote)?.fullName}!`)
    setSelectedVote(null)
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

  const renderNFAScore = (candidate: Candidate) => {
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

  const renderHome = () => (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">AGM Elections 2024 🗳️</h1>
          <p className="text-gray-400">Vote for your representatives in the Malaysian Student Association</p>
          <div className="flex items-center space-x-2 mt-2">
            <Zap className="w-4 h-4 text-purple-400" />
            <span className="text-purple-400 text-sm">Powered by NFA AI Election Evaluator</span>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex space-x-6 border-b border-gray-700">
          {[
            { id: 'overview', label: 'Overview', icon: Vote },
            { id: 'my-ratings', label: 'My Ratings', icon: User },
            { id: 'leaderboard', label: 'Leaderboard', icon: Trophy }
          ].map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-4 py-3 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-purple-500 text-purple-400'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {positions.map((position) => (
            <div
              key={position.id}
              className="bg-gray-800 rounded-xl border border-gray-700 p-6 hover:border-purple-500 transition-colors cursor-pointer"
              onClick={() => {
                setSelectedPosition(position)
                setCurrentView('position')
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white">{position.title}</h3>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
              
              <p className="text-gray-400 mb-4">{position.description}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-purple-400" />
                  <span className="text-white">{position.candidates.length} candidates</span>
                </div>
                
                {position.candidates.length > 0 && (
                  <div className="text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-purple-500 h-2 rounded-full transition-all"
                          style={{ width: `${getPositionProgress(position)}%` }}
                        />
                      </div>
                      <span className="text-gray-400">{Math.round(getPositionProgress(position))}%</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'my-ratings' && (
        <div className="space-y-6">
          {userRatings.length === 0 ? (
            <div className="text-center py-12">
              <Star className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-400 mb-2">No ratings yet</h3>
              <p className="text-gray-500">Start rating candidates to see your reviews here</p>
            </div>
          ) : (
            userRatings.map((rating) => {
              const candidate = positions.flatMap(p => p.candidates).find(c => c.id === rating.candidateId)
              if (!candidate) return null
              
              const avgRating = Object.values(rating.rating).reduce((a, b) => a + b, 0) / 5
              
              return (
                <div key={rating.candidateId} className="bg-gray-800 rounded-xl border border-gray-700 p-6">
                  <div className="flex items-start space-x-4">
                    <img
                      src={candidate.photo}
                      alt={candidate.fullName}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white">{candidate.fullName}</h3>
                      <p className="text-gray-400">{candidate.year} • {candidate.major}</p>
                      
                      <div className="mt-4 grid grid-cols-1 md:grid-cols-5 gap-4">
                        {Object.entries(rating.rating).map(([skill, value]) => (
                          <div key={skill} className="text-center">
                            <p className="text-sm text-gray-400 mb-1">{skillLabels[skill as keyof Rating]}</p>
                            {renderStarRating(value, undefined, true)}
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-4 flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                          <span className="text-white font-semibold">{avgRating.toFixed(1)}</span>
                        </div>
                      </div>
                      
                      {rating.comment && (
                        <div className="mt-4 p-3 bg-gray-700 rounded-lg">
                          <p className="text-gray-300">{rating.comment}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>
      )}

      {activeTab === 'leaderboard' && (
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
                        <div key={candidate.id} className="flex items-center space-x-4 p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
                          {/* Rank Badge */}
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${rankBadge.bg} ${rankBadge.text}`}>
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
      )}
    </div>
  )

  const renderPosition = () => {
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
            {selectedPosition.candidates.map((candidate) => {
              const userRating = userRatings.find(r => r.candidateId === candidate.id)
              const isRated = !!userRating
              
              return (
                <div
                  key={candidate.id}
                  className={`bg-gray-800 rounded-xl border p-6 transition-colors cursor-pointer ${
                    selectedVote === candidate.id 
                      ? 'border-green-500 bg-green-900/20' 
                      : 'border-gray-700 hover:border-purple-500'
                  }`}
                  onClick={() => {
                    if (canVoteForPosition(selectedPosition)) {
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

                  {/* NFA Score Display */}
                  {renderNFAScore(candidate)}

                  <div className="space-y-2 mt-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedCandidate(candidate)
                        setCurrentView('candidate')
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
                          setCurrentView('candidate')
                        }}
                        className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                      >
                        Rate Now
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    )
  }

  const renderCandidate = () => {
    if (!selectedCandidate) return null

    const userRating = userRatings.find(r => r.candidateId === selectedCandidate.id)
    const candidateComments = comments.filter(c => c.candidateId === selectedCandidate.id)

    return (
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center space-x-4 mb-8">
          <button
            onClick={() => {
              setCurrentView('position')
              setSelectedCandidate(null)
            }}
            className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to {selectedPosition?.title}</span>
          </button>
        </div>

        <div className="bg-gray-800 rounded-xl border border-gray-700 p-8">
          {/* Candidate Header */}
          <div className="flex items-start space-x-6 mb-8">
            <img
              src={selectedCandidate.photo}
              alt={selectedCandidate.fullName}
              className="w-32 h-32 rounded-full object-cover"
            />
            
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-white mb-2">{selectedCandidate.fullName}</h1>
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
                <p className="text-purple-400 font-semibold text-lg italic">"{selectedCandidate.slogan}"</p>
              </div>

              <div className="flex items-center space-x-6 mb-4">
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  <span className="text-white font-semibold">{selectedCandidate.averageRating}</span>
                  <span className="text-gray-400">average rating</span>
                </div>
                <div className="flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5 text-blue-400" />
                  <span className="text-white font-semibold">{selectedCandidate.totalVotes}</span>
                  <span className="text-gray-400">votes</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {selectedCandidate.badges.map((badge, index) => (
                  <span
                    key={index}
                    className={`px-3 py-1 ${badge.color} text-white text-sm rounded-full flex items-center space-x-2`}
                  >
                    <span>{badge.icon}</span>
                    <span>{badge.name}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* NFA AI Evaluation */}
          {selectedCandidate.nfa && (
            <div className="mb-8 p-6 bg-gray-700 rounded-lg border border-gray-600">
              <div className="flex items-center space-x-3 mb-4">
                <Brain className="w-6 h-6 text-purple-400" />
                <h3 className="text-xl font-bold text-white">NFA AI Evaluation</h3>
                <div className={`px-3 py-1 rounded font-bold border ${getGradeColor(selectedCandidate.nfa.grade)}`}>
                  {selectedCandidate.nfa.grade}
                </div>
                <span className="text-gray-400">Overall Score: {selectedCandidate.nfa.overall}/100</span>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="text-center p-3 bg-gray-600 rounded">
                  <div className="text-sm text-gray-400 mb-1">Events & Badges</div>
                  <div className="text-xl font-bold text-white">{selectedCandidate.nfa.subscores.events}</div>
                  <div className="text-xs text-gray-400">30% weight</div>
                </div>
                <div className="text-center p-3 bg-gray-600 rounded">
                  <div className="text-sm text-gray-400 mb-1">Community Leadership</div>
                  <div className="text-xl font-bold text-white">{selectedCandidate.nfa.subscores.leadership}</div>
                  <div className="text-xs text-gray-400">25% weight</div>
                </div>
                <div className="text-center p-3 bg-gray-600 rounded">
                  <div className="text-sm text-gray-400 mb-1">Peer Reputation</div>
                  <div className="text-xl font-bold text-white">{selectedCandidate.nfa.subscores.reputation}</div>
                  <div className="text-xs text-gray-400">15% weight</div>
                </div>
                <div className="text-center p-3 bg-gray-600 rounded">
                  <div className="text-sm text-gray-400 mb-1">Agenda Feasibility</div>
                  <div className="text-xl font-bold text-white">{selectedCandidate.nfa.subscores.agendaFeasibility}</div>
                  <div className="text-xs text-gray-400">30% weight</div>
                </div>
              </div>
              
              <div className="bg-gray-600 rounded-lg p-4">
                <h4 className="text-white font-semibold mb-2">AI Assessment Summary:</h4>
                <p className="text-gray-300">{selectedCandidate.nfa.summary}</p>
              </div>
            </div>
          )}

          {/* Forum Stats */}
          <div className="grid grid-cols-3 gap-6 mb-8 p-6 bg-gray-700 rounded-lg">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{selectedCandidate.forumStats.posts}</div>
              <div className="text-gray-400 text-sm">Forum Posts</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{selectedCandidate.forumStats.upvotes}</div>
              <div className="text-gray-400 text-sm">Upvotes Received</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{selectedCandidate.forumStats.uniCommunityScore}</div>
              <div className="text-gray-400 text-sm">Community Score</div>
            </div>
          </div>

          {/* Agenda */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
              <Target className="w-5 h-5" />
              <span>Campaign Agenda</span>
            </h3>
            <div className="bg-gray-700 rounded-lg p-6">
              <p className="text-gray-300 whitespace-pre-line">{selectedCandidate.agenda}</p>
            </div>
          </div>

          {/* Feasibility Notes */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
              <TrendingUp className="w-5 h-5" />
              <span>Feasibility Assessment</span>
            </h3>
            <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
              <p className="text-blue-200">{selectedCandidate.agendaFeasibilityNotes}</p>
            </div>
          </div>

          {/* Rating Section */}
          {!userRating && (
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-4">Rate This Candidate</h3>
              <div className="bg-gray-700 rounded-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-6">
                  {Object.entries(skillLabels).map(([skill, label]) => (
                    <div key={skill} className="text-center">
                      <p className="text-gray-300 mb-2">{label}</p>
                      {renderStarRating(
                        currentRating[skill as keyof Rating],
                        (value) => handleRatingChange(skill as keyof Rating, value)
                      )}
                    </div>
                  ))}
                </div>

                <div className="mb-4">
                  <label className="block text-gray-300 mb-2">Public Comment (Optional)</label>
                  <textarea
                    value={currentComment}
                    onChange={(e) => setCurrentComment(e.target.value)}
                    placeholder="Share your thoughts about this candidate..."
                    className="w-full px-4 py-3 bg-gray-600 border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    rows={3}
                  />
                  <p className="text-gray-400 text-sm mt-1">Your comment is public. Be respectful.</p>
                </div>

                <button
                  onClick={submitRating}
                  disabled={!isRatingComplete()}
                  className="flex items-center space-x-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                  <span>Submit Rating</span>
                </button>
              </div>
            </div>
          )}

          {/* Comments Section */}
          {candidateComments.length > 0 && (
            <div>
              <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
                <MessageCircle className="w-5 h-5" />
                <span>Public Comments ({candidateComments.length})</span>
              </h3>
              <div className="space-y-4">
                {candidateComments.map((comment) => (
                  <div key={comment.id} className="bg-gray-700 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="font-semibold text-white">{comment.username}</span>
                      <span className="text-gray-400 text-sm">•</span>
                      <span className="text-gray-400 text-sm">{comment.timestamp}</span>
                    </div>
                    <p className="text-gray-300">{comment.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-gray-900">
      <Sidebar />
      
      <div className="flex-1 p-8">
        {currentView === 'home' && renderHome()}
        {currentView === 'position' && renderPosition()}
        {currentView === 'candidate' && renderCandidate()}
      </div>
    </div>
  )
}

export default ElectionsPage
