import React from 'react'
import { 
  ArrowLeft, 
  Calendar, 
  GraduationCap, 
  User, 
  Star, 
  BarChart3, 
  Target, 
  TrendingUp, 
  Brain, 
  MessageCircle 
} from 'lucide-react'
import { ElectionsProps } from './types'

const CandidateProfilePage: React.FC<ElectionsProps> = ({
  selectedCandidate,
  selectedPosition,
  comments,
  setCurrentView,
  setSelectedCandidate
}) => {
  if (!selectedCandidate) return null

  const candidateComments = comments.filter(c => c.candidateId === selectedCandidate.id)

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A+': case 'A': return 'text-green-400 bg-green-900/20 border-green-500/30'
      case 'A-': case 'B+': return 'text-blue-400 bg-blue-900/20 border-blue-500/30'
      case 'B': case 'B-': return 'text-yellow-400 bg-yellow-900/20 border-yellow-500/30'
      case 'C+': case 'C': return 'text-orange-400 bg-orange-900/20 border-orange-500/30'
      default: return 'text-red-400 bg-red-900/20 border-red-500/30'
    }
  }

  const goBack = () => {
    if (selectedPosition) {
      setCurrentView('position')
    } else {
      setCurrentView('home')
    }
    setSelectedCandidate(null)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center space-x-4 mb-8">
        <button
          onClick={goBack}
          className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to {selectedPosition ? selectedPosition.title : 'Elections'}</span>
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

export default CandidateProfilePage
