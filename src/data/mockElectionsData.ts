import { Position, Candidate, Rating, Comment } from '../components/elections/types'

export const mockCandidates: Candidate[] = [
  {
    id: 'cand-1',
    fullName: 'Ahmad Zikri bin Abdullah',
    year: '3rd Year',
    major: 'Computer Science',
    university: 'Seoul National University',
    photo: 'https://cdn.chatandbuild.com/users/688cb35eab5dd7b7a88dd413/whatsapp-image-2025-08-21-at-84858-pm-1755781966943-744756830.jpeg',
    slogan: 'Unity Through Innovation',
    agenda: `As your President, I will focus on three key areas:

1. **Digital Transformation**
   - Modernize PPMK's digital infrastructure
   - Create a comprehensive mobile app for members
   - Implement online voting systems for future elections

2. **Community Building**
   - Organize monthly cultural exchange events
   - Establish mentorship programs connecting seniors with juniors
   - Create study groups and academic support networks

3. **International Relations**
   - Strengthen ties with other Malaysian student associations globally
   - Collaborate with Korean universities for exchange programs
   - Advocate for Malaysian students' rights and welfare in Korea

Together, we can build a stronger, more connected PPMK that serves every Malaysian student in Korea.`,
    agendaFeasibilityNotes: 'Strong technical background makes digital initiatives highly feasible. Existing connections with university administration support international relations goals. Community building requires sustained effort but has strong foundation.',
    badges: [
      { name: 'Tech Leader', icon: '💻', color: 'bg-blue-600' },
      { name: 'Event Organizer', icon: '🎯', color: 'bg-green-600' },
      { name: 'Academic Excellence', icon: '🏆', color: 'bg-yellow-600' },
      { name: 'Community Builder', icon: '🤝', color: 'bg-purple-600' }
    ],
    averageRating: 4.7,
    totalRatings: 23,
    totalVotes: 156,
    forumStats: {
      posts: 45,
      upvotes: 234,
      uniCommunityScore: 92
    },
    nfa: {
      overall: 88,
      grade: 'A-',
      subscores: {
        events: 85,
        leadership: 90,
        reputation: 88,
        agendaFeasibility: 89
      },
      summary: 'Exceptional candidate with strong technical leadership and proven community engagement. Digital transformation agenda is highly feasible given technical background.'
    }
  },
  {
    id: 'cand-2',
    fullName: 'Siti Nurhaliza binti Rahman',
    year: '4th Year',
    major: 'International Relations',
    university: 'Yonsei University',
    photo: 'https://cdn.chatandbuild.com/users/688cb35eab5dd7b7a88dd413/whatsapp-image-2025-08-21-at-84857-pm-1755781963084-262353941.jpeg',
    slogan: 'Bridging Cultures, Building Futures',
    agenda: `My vision for PPMK centers on cultural preservation and global connectivity:

1. **Cultural Heritage Programs**
   - Monthly Malaysian cultural showcases
   - Traditional arts and crafts workshops
   - Bahasa Malaysia conversation circles for heritage preservation

2. **Academic Excellence Initiative**
   - Scholarship application guidance programs
   - Research collaboration opportunities with Malaysian universities
   - Career development workshops with Malaysian professionals in Korea

3. **Welfare and Support Systems**
   - 24/7 emergency support hotline for Malaysian students
   - Mental health awareness and support programs
   - Financial assistance fund for students in need

4. **Global Network Expansion**
   - Partnership with Malaysian embassies and consulates
   - Alumni network development for career opportunities
   - International student leadership exchange programs

Let's preserve our roots while embracing global opportunities.`,
    agendaFeasibilityNotes: 'International Relations background provides excellent foundation for diplomatic initiatives. Cultural programs have strong community support. Welfare systems require significant coordination but address real student needs.',
    badges: [
      { name: 'Cultural Ambassador', icon: '🌍', color: 'bg-indigo-600' },
      { name: 'Welfare Advocate', icon: '❤️', color: 'bg-red-600' },
      { name: 'Academic Mentor', icon: '📚', color: 'bg-blue-600' },
      { name: 'Community Leader', icon: '👥', color: 'bg-green-600' }
    ],
    averageRating: 4.8,
    totalRatings: 31,
    totalVotes: 189,
    forumStats: {
      posts: 67,
      upvotes: 312,
      uniCommunityScore: 95
    },
    nfa: {
      overall: 92,
      grade: 'A',
      subscores: {
        events: 94,
        leadership: 91,
        reputation: 95,
        agendaFeasibility: 88
      },
      summary: 'Outstanding candidate with exceptional community engagement and cultural leadership. Strong diplomatic background supports ambitious international initiatives.'
    }
  },
  {
    id: 'cand-3',
    fullName: 'Nurul Aisyah binti Mohd Yusof',
    year: '2nd Year',
    major: 'Business Administration',
    university: 'Korea University',
    photo: 'https://cdn.chatandbuild.com/users/688cb35eab5dd7b7a88dd413/whatsapp-image-2025-08-21-at-84829-pm-1755781544334-586115719.jpeg',
    slogan: 'Fresh Perspectives, Bold Actions',
    agenda: `As a young leader, I bring energy and innovation to PPMK:

1. **Youth Empowerment**
   - Create junior leadership development programs
   - Establish peer-to-peer mentoring systems
   - Youth-led initiative funding and support

2. **Sustainable Growth**
   - Environmental awareness campaigns
   - Sustainable event planning and execution
   - Green campus initiatives in partnership with universities

3. **Digital Innovation**
   - Social media strategy overhaul for better engagement
   - Virtual reality cultural experiences
   - Blockchain-based voting and membership systems

4. **Entrepreneurship Support**
   - Malaysian student startup incubator
   - Business networking events with Korean companies
   - Skills development workshops for the digital economy

Fresh ideas, proven dedication, and the energy to make change happen.`,
    agendaFeasibilityNotes: 'Business background provides strong foundation for entrepreneurship initiatives. Digital innovation proposals are ambitious but achievable with proper technical support. Youth empowerment programs align well with current student needs.',
    badges: [
      { name: 'Young Innovator', icon: '🚀', color: 'bg-purple-600' },
      { name: 'Sustainability Champion', icon: '🌱', color: 'bg-green-600' },
      { name: 'Digital Native', icon: '📱', color: 'bg-blue-600' },
      { name: 'Future Leader', icon: '⭐', color: 'bg-yellow-600' }
    ],
    averageRating: 4.5,
    totalRatings: 18,
    totalVotes: 134,
    forumStats: {
      posts: 28,
      upvotes: 167,
      uniCommunityScore: 78
    },
    nfa: {
      overall: 79,
      grade: 'B+',
      subscores: {
        events: 75,
        leadership: 82,
        reputation: 76,
        agendaFeasibility: 83
      },
      summary: 'Promising young candidate with innovative ideas and strong business acumen. Digital initiatives show forward-thinking approach, though some proposals may need refinement for implementation.'
    }
  }
]

export const mockPositions: Position[] = [
  {
    id: 'pos-1',
    title: 'President',
    description: 'Lead PPMK and represent Malaysian students in Korea',
    candidates: mockCandidates,
    maxVotes: 1
  },
  {
    id: 'pos-2',
    title: 'Vice President',
    description: 'Support the President and oversee internal operations',
    candidates: [],
    maxVotes: 1
  },
  {
    id: 'pos-3',
    title: 'Secretary General',
    description: 'Manage communications and administrative duties',
    candidates: [],
    maxVotes: 1
  },
  {
    id: 'pos-4',
    title: 'Treasurer',
    description: 'Oversee financial management and budgeting',
    candidates: [],
    maxVotes: 1
  },
  {
    id: 'pos-5',
    title: 'Public Relations Officer',
    description: 'Handle external communications and partnerships',
    candidates: [],
    maxVotes: 1
  }
]

export const mockRatings: Rating[] = [
  {
    id: 'rating-1',
    candidateId: 'cand-1',
    userId: 'user-1',
    communication: 5,
    leadership: 4,
    problemSolving: 5,
    participation: 4,
    integrity: 5,
    timestamp: '2024-01-15T10:30:00Z'
  },
  {
    id: 'rating-2',
    candidateId: 'cand-2',
    userId: 'user-2',
    communication: 5,
    leadership: 5,
    problemSolving: 4,
    participation: 5,
    integrity: 5,
    timestamp: '2024-01-15T11:45:00Z'
  }
]

export const mockComments: Comment[] = [
  {
    id: 'comment-1',
    candidateId: 'cand-1',
    userId: 'user-1',
    username: 'Ahmad Rahman',
    comment: 'Zikri has shown excellent leadership in organizing tech events. His digital transformation vision is exactly what PPMK needs.',
    timestamp: '2 hours ago'
  },
  {
    id: 'comment-2',
    candidateId: 'cand-2',
    userId: 'user-2',
    username: 'Fatimah Ali',
    comment: 'Siti\'s cultural programs have been amazing. She really understands how to preserve our Malaysian identity while embracing Korean culture.',
    timestamp: '4 hours ago'
  },
  {
    id: 'comment-3',
    candidateId: 'cand-1',
    userId: 'user-3',
    username: 'Muhammad Hakim',
    comment: 'The mobile app idea is brilliant! Finally someone who understands how technology can improve our community experience.',
    timestamp: '1 day ago'
  },
  {
    id: 'comment-4',
    candidateId: 'cand-3',
    userId: 'user-4',
    username: 'Sarah Lim',
    comment: 'Aisyah brings fresh energy and innovative ideas. Her sustainability focus is forward-thinking and necessary.',
    timestamp: '6 hours ago'
  },
  {
    id: 'comment-5',
    candidateId: 'cand-2',
    userId: 'user-5',
    username: 'Arif Hassan',
    comment: 'The welfare support system proposal addresses real issues Malaysian students face. Very practical and needed.',
    timestamp: '3 hours ago'
  }
]
