import React, { useState, useEffect } from 'react'
import { X, Brain, User, Award, MessageSquare, Calendar, Sparkles, ArrowRight } from 'lucide-react'
import { computeNFA } from '../../utils/nfa'
import { NFAResult } from './types'

interface AGMApplicationPopupProps {
  isOpen: boolean
  onClose: () => void
}

interface MockUserData {
  badges: string[]
  events: string[]
  forumStats: {
    posts: number
    upvotes: number
    uniCommunityScore: number
  }
}

interface RoleRecommendation {
  roleId: string
  title: string
  description: string
  matchScore: number
  reasoning: string
  icon: string
}

const AGMApplicationPopup: React.FC<AGMApplicationPopupProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<'intro' | 'analyzing' | 'results'>('intro')
  const [recommendation, setRecommendation] = useState<RoleRecommendation | null>(null)
  const [nfaResult, setNfaResult] = useState<NFAResult | null>(null)

  // Mock user data for testing
  const mockUserData: MockUserData = {
    badges: ['Event Organizer', 'Volunteer', 'Debate Participant'],
    events: ['Community Clean-Up', 'Academic Workshop', 'Sports Carnival'],
    forumStats: {
      posts: 12,
      upvotes: 34,
      uniCommunityScore: 78
    }
  }

  const roles = [
    {
      roleId: 'president',
      title: 'President',
      description: 'Lead the organization and represent all Malaysian students',
      icon: '👑',
      keywords: ['leader', 'organizer', 'debate', 'excellence'],
      minNFA: 75,
      weightEvents: 0.35,
      weightLeadership: 0.35,
      weightReputation: 0.15,
      weightAgenda: 0.15
    },
    {
      roleId: 'copresident',
      title: 'Co-President',
      description: 'Support the President and lead special initiatives',
      icon: '🤝',
      keywords: ['organizer', 'volunteer', 'mentor'],
      minNFA: 70,
      weightEvents: 0.30,
      weightLeadership: 0.30,
      weightReputation: 0.20,
      weightAgenda: 0.20
    },
    {
      roleId: 'academic',
      title: 'EXCO Academic',
      description: 'Oversee academic programs and student support services',
      icon: '📚',
      keywords: ['academic', 'workshop', 'mentor', 'tutor'],
      minNFA: 65,
      weightEvents: 0.25,
      weightLeadership: 0.20,
      weightReputation: 0.25,
      weightAgenda: 0.30
    },
    {
      roleId: 'housing',
      title: 'EXCO Housing',
      description: 'Manage housing assistance and accommodation support',
      icon: '🏠',
      keywords: ['volunteer', 'community', 'support'],
      minNFA: 60,
      weightEvents: 0.20,
      weightLeadership: 0.25,
      weightReputation: 0.30,
      weightAgenda: 0.25
    },
    {
      roleId: 'welfare',
      title: 'EXCO Student Welfare',
      description: 'Focus on student wellbeing and support services',
      icon: '❤️',
      keywords: ['volunteer', 'community', 'caring', 'support'],
      minNFA: 60,
      weightEvents: 0.20,
      weightLeadership: 0.25,
      weightReputation: 0.35,
      weightAgenda: 0.20
    }
  ]

  const analyzeUserForRole = () => {
    // Create enhanced badges with context for better NFA scoring
    const enhancedBadges = [
      'Event Organizer Leader (2025)',
      'Volunteer Community Champion',
      'Debate Participant Excellence'
    ]

    // Compute NFA score using existing system
    const nfa = computeNFA({
      fullName: 'Current User',
      badges: enhancedBadges,
      forumStats: {
        ...mockUserData.forumStats,
        downvotes: 2 // Add minimal downvotes for realistic calculation
      },
      averageRating: 4.2, // Mock rating
      totalRatings: 15, // Mock rating count
      agenda: 'I am committed to serving our community with concrete plans including workshop programs, timeline-based initiatives, and partnership development. My goal is to implement measurable KPIs and deliver results through organized phases and mentorship programs.',
      agendaFeasibilityNotes: 'Strong community engagement background with proven event organization experience.',
      comments: [
        {
          user: 'peer1',
          text: 'Great organizer and very helpful in community events',
          createdAt: '1 day ago'
        },
        {
          user: 'peer2', 
          text: 'Excellent debate skills and clear communication',
          createdAt: '2 days ago'
        }
      ]
    })

    setNfaResult(nfa)

    // Calculate role match scores
    const roleScores = roles.map(role => {
      // Base score from NFA
      let matchScore = nfa.overall

      // Keyword matching bonus
      const userKeywords = [
        ...mockUserData.badges.map(b => b.toLowerCase()),
        ...mockUserData.events.map(e => e.toLowerCase())
      ].join(' ')

      let keywordBonus = 0
      role.keywords.forEach(keyword => {
        if (userKeywords.includes(keyword.toLowerCase())) {
          keywordBonus += 5
        }
      })

      // Custom weighted score based on role requirements
      const customScore = Math.round(
        role.weightEvents * nfa.subscores.events +
        role.weightLeadership * nfa.subscores.leadership +
        role.weightReputation * nfa.subscores.reputation +
        role.weightAgenda * nfa.subscores.agendaFeasibility
      )

      matchScore = Math.min(100, customScore + keywordBonus)

      // Generate reasoning
      let reasoning = `Based on your profile analysis: `
      
      if (role.roleId === 'president') {
        reasoning += `Your strong event organization background (${nfa.subscores.events}/100) and leadership potential (${nfa.subscores.leadership}/100) make you well-suited for the top leadership role. Your debate experience shows communication skills essential for representing students.`
      } else if (role.roleId === 'copresident') {
        reasoning += `Your collaborative volunteer work and event organization experience align perfectly with supporting presidential initiatives. Your balanced skill set (NFA: ${nfa.overall}/100) makes you an ideal co-leader.`
      } else if (role.roleId === 'academic') {
        reasoning += `Your participation in academic workshops and strong community engagement (${nfa.subscores.reputation}/100 reputation) position you well for overseeing academic programs and student support.`
      } else if (role.roleId === 'housing') {
        reasoning += `Your volunteer background and community clean-up participation demonstrate the caring, supportive nature needed for housing assistance. Your practical approach suits this hands-on role.`
      } else if (role.roleId === 'welfare') {
        reasoning += `Your volunteer experience and community involvement show the empathy and dedication needed for student welfare. Your strong peer relationships (${nfa.subscores.reputation}/100) are crucial for this caring role.`
      }

      return {
        ...role,
        matchScore,
        reasoning
      }
    })

    // Find best match
    const bestMatch = roleScores.reduce((best, current) => 
      current.matchScore > best.matchScore ? current : best
    )

    setRecommendation(bestMatch)
  }

  const handleAskAI = () => {
    setStep('analyzing')
    
    // Simulate AI analysis delay
    setTimeout(() => {
      analyzeUserForRole()
      setStep('results')
    }, 2500)
  }

  const handleApplyForRole = () => {
    if (recommendation) {
      alert(`Application submitted for ${recommendation.title}! You will receive confirmation via email.`)
      onClose()
    }
  }

  const resetPopup = () => {
    setStep('intro')
    setRecommendation(null)
    setNfaResult(null)
  }

  const handleClose = () => {
    resetPopup()
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-xl border border-gray-700 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
            <Brain className="w-6 h-6 text-purple-400" />
            <span>AGM Application</span>
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === 'intro' && (
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
              
              <h3 className="text-xl font-bold text-white mb-4">
                Want to know which role suits you the most?
              </h3>
              
              <p className="text-gray-300 mb-8 leading-relaxed">
                Our AI will analyze your profile, including your badges, event participation, 
                and forum contributions to recommend the perfect AGM role for you.
              </p>

              {/* User Data Preview */}
              <div className="bg-gray-700 rounded-lg p-4 mb-8 text-left">
                <h4 className="text-white font-semibold mb-3 flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span>Your Profile Data</span>
                </h4>
                
                <div className="space-y-3 text-sm">
                  <div className="flex items-start space-x-2">
                    <Award className="w-4 h-4 text-yellow-400 mt-0.5" />
                    <div>
                      <span className="text-gray-300">Badges: </span>
                      <span className="text-white">{mockUserData.badges.join(', ')}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <Calendar className="w-4 h-4 text-blue-400 mt-0.5" />
                    <div>
                      <span className="text-gray-300">Events: </span>
                      <span className="text-white">{mockUserData.events.join(', ')}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <MessageSquare className="w-4 h-4 text-green-400 mt-0.5" />
                    <div>
                      <span className="text-gray-300">Forum: </span>
                      <span className="text-white">
                        {mockUserData.forumStats.posts} posts, {mockUserData.forumStats.upvotes} upvotes, 
                        {mockUserData.forumStats.uniCommunityScore}/100 community score
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={handleAskAI}
                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 font-medium flex items-center space-x-2 mx-auto"
              >
                <Brain className="w-5 h-5" />
                <span>Ask AI for Recommendation</span>
              </button>
            </div>
          )}

          {step === 'analyzing' && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                <Brain className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-xl font-bold text-white mb-4">AI is analyzing your profile...</h3>
              
              <div className="space-y-2 text-gray-300">
                <p className="animate-pulse">🔍 Evaluating your badges and achievements</p>
                <p className="animate-pulse delay-300">📊 Analyzing forum contributions and engagement</p>
                <p className="animate-pulse delay-500">🎯 Matching skills with AGM role requirements</p>
                <p className="animate-pulse delay-700">✨ Generating personalized recommendation</p>
              </div>
              
              <div className="mt-8">
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full animate-pulse" style={{width: '75%'}}></div>
                </div>
              </div>
            </div>
          )}

          {step === 'results' && recommendation && nfaResult && (
            <div>
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">{recommendation.icon}</span>
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-2">Perfect Match Found!</h3>
                <p className="text-gray-300">Based on your profile analysis</p>
              </div>

              {/* Recommended Role */}
              <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border border-green-500/30 rounded-lg p-6 mb-6">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="text-3xl">{recommendation.icon}</span>
                  <div>
                    <h4 className="text-xl font-bold text-green-400">{recommendation.title}</h4>
                    <p className="text-gray-300 text-sm">{recommendation.description}</p>
                  </div>
                  <div className="ml-auto">
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-400">{recommendation.matchScore}%</div>
                      <div className="text-xs text-gray-400">Match Score</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-800/50 rounded-lg p-4 mb-4">
                  <h5 className="text-white font-semibold mb-2">Why this role suits you:</h5>
                  <p className="text-gray-300 text-sm leading-relaxed">{recommendation.reasoning}</p>
                </div>

                {/* NFA Breakdown */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                  <div className="bg-gray-800/50 rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-blue-400">{nfaResult.subscores.events}</div>
                    <div className="text-xs text-gray-400">Events</div>
                  </div>
                  <div className="bg-gray-800/50 rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-purple-400">{nfaResult.subscores.leadership}</div>
                    <div className="text-xs text-gray-400">Leadership</div>
                  </div>
                  <div className="bg-gray-800/50 rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-yellow-400">{nfaResult.subscores.reputation}</div>
                    <div className="text-xs text-gray-400">Reputation</div>
                  </div>
                  <div className="bg-gray-800/50 rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-green-400">{nfaResult.subscores.agendaFeasibility}</div>
                    <div className="text-xs text-gray-400">Feasibility</div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-300">Overall NFA Grade:</span>
                    <span className="px-3 py-1 bg-green-600 text-white rounded-full text-sm font-bold">
                      {nfaResult.grade}
                    </span>
                  </div>
                  <div className="text-green-400 font-semibold">
                    {nfaResult.overall}/100
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <button
                  onClick={handleApplyForRole}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 font-medium flex items-center justify-center space-x-2"
                >
                  <ArrowRight className="w-5 h-5" />
                  <span>Apply for {recommendation.title}</span>
                </button>
                
                <button
                  onClick={resetPopup}
                  className="px-6 py-3 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 hover:text-white transition-colors font-medium"
                >
                  Try Again
                </button>
              </div>

              <p className="text-center text-gray-400 text-sm mt-4">
                You can also apply for other roles manually if you prefer a different position.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AGMApplicationPopup
