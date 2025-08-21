export interface Badge {
  name: string
  icon: string
  color: string
}

export interface ForumStats {
  posts: number
  upvotes: number
  downvotes?: number
  uniCommunityScore: number
}

export interface Comment {
  id: string
  candidateId: string
  username: string
  comment: string
  timestamp: string
}

export interface NFAResult {
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

export interface Candidate {
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

export interface Position {
  id: string
  title: string
  description: string
  candidates: Candidate[]
}

export interface Rating {
  communication: number
  leadership: number
  problemSolving: number
  participation: number
  integrity: number
}

export interface UserRating {
  candidateId: string
  rating: Rating
  comment: string
}

export interface CandidateWithFinalScore extends Candidate {
  finalScore: number
  votePercentage: number
  rank: number
}

export interface ElectionsProps {
  positions: Position[]
  selectedPosition: Position | null
  selectedCandidate: Candidate | null
  activeTab: 'overview' | 'my-ratings' | 'leaderboard'
  userRatings: UserRating[]
  currentRating: Rating
  currentComment: string
  selectedVote: string | null
  comments: Comment[]
  setCurrentView: (view: 'home' | 'position' | 'profile' | 'rating') => void
  setSelectedPosition: (position: Position | null) => void
  setSelectedCandidate: (candidate: Candidate | null) => void
  setActiveTab: (tab: 'overview' | 'my-ratings' | 'leaderboard') => void
  setCurrentRating: (rating: Rating) => void
  setCurrentComment: (comment: string) => void
  setSelectedVote: (vote: string | null) => void
  handleRatingChange: (skill: keyof Rating, value: number) => void
  isRatingComplete: () => boolean
  getPositionProgress: (position: Position) => number
  canVoteForPosition: (position: Position) => boolean
  submitRating: () => void
  submitVote: () => void
  handleWinnerClick?: (candidate: Candidate, position: Position) => void
}
