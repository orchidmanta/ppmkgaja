import React, { useState } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import { 
  Vote, 
  Users, 
  Star, 
  Award, 
  MessageCircle,
  TrendingUp,
  CheckCircle,
  ArrowLeft,
  Eye,
  BarChart3,
  User,
  Calendar,
  MapPin,
  Target,
  Lightbulb,
  Heart,
  BookOpen,
  Zap,
  Shield,
  Coffee,
  Gamepad2,
  Briefcase,
  GraduationCap,
  Home as HomeIcon,
  Utensils,
  Music,
  Camera,
  Code,
  Palette,
  Globe,
  Headphones,
  Mic,
  Trophy,
  Clock,
  ThumbsUp,
  Send,
  Filter,
  Crown,
  Medal,
  Progress
} from 'lucide-react'

// Mock data for candidates
const mockCandidates = {
  president: [
    {
      id: 'pres-1',
      fullName: 'Ahmad Zulkifli bin Hassan',
      year: 'Year 4',
      major: 'International Relations',
      university: 'Seoul National University',
      slogan: 'Unity Through Diversity - Building Bridges, Breaking Barriers 🌉',
      agenda: 'My vision for PPMK centers on three pillars: Enhanced Academic Support through peer mentoring programs and study groups; Stronger Cultural Integration with monthly Malaysian cultural events and Korean-Malaysian exchange programs; and Improved Student Welfare with 24/7 mental health support and emergency financial assistance fund. I will establish partnerships with Korean universities for internship opportunities and create a comprehensive job placement network for graduating students.',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      badges: ['Leadership Excellence', 'Cultural Ambassador', 'Academic Mentor', 'Community Builder', 'Event Organizer', 'Volunteer Champion'],
      forumStats: { posts: 89, upvotes: 234, uniCommunityScore: 92 },
      agendaFeasibilityNotes: 'Highly detailed and realistic proposals with clear implementation timeline',
      nfaScores: { events: 95, leadership: 88, reputation: 91, agendaFeasibility: 87 },
      nfaSummary: 'Exceptional candidate with proven leadership track record. Strong community engagement and realistic agenda addressing current student needs. Demonstrates deep understanding of Malaysian student challenges in Korea.',
      nfaDetailedEvaluation: 'Events/Badges (28.5/30): Outstanding participation with 6 high-impact badges including Leadership Excellence and Cultural Ambassador. Recent event organization shows active engagement. Community Support (23/25): Exceptional forum activity with 89 posts and 234 upvotes, indicating strong community trust and constructive contributions. Public Ratings (13.5/15): High average rating of 4.7 stars with positive sentiment in comments. Agenda Feasibility (26.1/30): Comprehensive three-pillar approach with realistic timelines and clear implementation strategies. Strong focus on current student needs.',
      voteCount: 156,
      averageRating: 4.7,
      totalRatings: 89,
      isTopNFAPick: true
    },
    {
      id: 'pres-2',
      fullName: 'Lim Wei Ting',
      year: 'Year 3',
      major: 'Business Administration',
      university: 'Korea University',
      slogan: 'Innovation for Integration - Smart Solutions for Modern Students 💡',
      agenda: 'Leveraging technology to modernize PPMK operations. Key initiatives include developing a mobile app for event management and networking, implementing digital voting systems, creating online mentorship matching platform, and establishing virtual study rooms. Focus on sustainability through paperless operations and eco-friendly events.',
      photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      badges: ['Tech Innovator', 'Sustainability Advocate', 'Digital Pioneer'],
      forumStats: { posts: 45, upvotes: 123, uniCommunityScore: 78 },
      agendaFeasibilityNotes: 'Tech-focused approach may require significant resources and technical expertise',
      nfaScores: { events: 72, leadership: 75, reputation: 80, agendaFeasibility: 68 },
      nfaSummary: 'Innovative approach with strong technical vision. However, limited leadership experience and some agenda items may be overly ambitious for current organizational capacity.',
      nfaDetailedEvaluation: 'Events/Badges (21.6/30): Good tech-focused participation with 3 relevant badges, but limited recent activity. Community Support (19.5/25): Moderate forum engagement with constructive tech discussions. Public Ratings (12.6/15): Solid 4.2-star rating with positive innovation feedback. Agenda Feasibility (20.4/30): Ambitious tech agenda requiring significant resources and expertise that may exceed current organizational capacity.',
      voteCount: 98,
      averageRating: 4.2,
      totalRatings: 67,
      isTopNFAPick: false
    },
    {
      id: 'pres-3',
      fullName: 'Siti Nurhaliza binti Abdullah',
      year: 'Year 2',
      major: 'Korean Studies',
      university: 'Yonsei University',
      slogan: 'Fresh Perspectives, Proven Passion 🌟',
      agenda: 'Bringing new energy to PPMK with focus on inclusivity and accessibility. Plans include monthly town halls for transparent communication, beginner-friendly Korean language classes, cultural celebration events, and improved social media presence to reach more students.',
      photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      badges: ['Rising Star', 'Cultural Enthusiast', 'Social Media Maven'],
      forumStats: { posts: 23, upvotes: 67, uniCommunityScore: 65 },
      agendaFeasibilityNotes: 'Enthusiastic but lacks specific implementation details and timeline',
      nfaScores: { events: 58, leadership: 62, reputation: 71, agendaFeasibility: 55 },
      nfaSummary: 'Passionate newcomer with fresh ideas but limited experience. Agenda lacks depth and concrete implementation strategies. May benefit from more leadership development.',
      nfaDetailedEvaluation: 'Events/Badges (17.4/30): Limited participation with 3 basic badges, showing enthusiasm but lacking substantial experience. Community Support (16.25/25): Low forum activity with 23 posts, indicating limited community engagement. Public Ratings (11.4/15): Decent 3.8-star rating but fewer total ratings. Agenda Feasibility (16.5/30): Vague proposals lacking specific implementation details and realistic timelines.',
      voteCount: 67,
      averageRating: 3.8,
      totalRatings: 45,
      isTopNFAPick: false
    }
  ],
  copresident: [
    {
      id: 'copres-1',
      fullName: 'Raj Kumar Krishnan',
      year: 'Year 4',
      major: 'Engineering',
      university: 'KAIST',
      slogan: 'Excellence Through Collaboration - Supporting Every Malaysian Dream 🚀',
      agenda: 'Complementing presidential initiatives with focus on academic excellence and career development. Establishing industry partnerships for internships, creating alumni mentorship network, organizing career fairs, and developing technical skills workshops. Special emphasis on supporting STEM students and research opportunities.',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      badges: ['Academic Excellence', 'Industry Connector', 'STEM Advocate', 'Research Pioneer', 'Career Mentor'],
      forumStats: { posts: 67, upvotes: 189, uniCommunityScore: 85 },
      agendaFeasibilityNotes: 'Well-structured plan with industry connections and clear deliverables',
      nfaScores: { events: 82, leadership: 86, reputation: 88, agendaFeasibility: 84 },
      nfaSummary: 'Strong technical background with excellent industry connections. Demonstrates clear understanding of co-presidential role as supportive leader. Realistic and achievable agenda.',
      nfaDetailedEvaluation: 'Events/Badges (24.6/30): Strong participation with 5 high-quality badges including Academic Excellence and Industry Connector. Community Support (22/25): Good forum engagement with constructive STEM discussions and high upvote ratio. Public Ratings (13.5/15): Excellent 4.5-star rating with positive career development feedback. Agenda Feasibility (25.2/30): Well-structured plan with realistic industry partnerships and clear deliverables.',
      voteCount: 134,
      averageRating: 4.5,
      totalRatings: 78,
      isTopNFAPick: true
    },
    {
      id: 'copres-2',
      fullName: 'Tan Mei Lin',
      year: 'Year 3',
      major: 'Psychology',
      university: 'Seoul National University',
      slogan: 'Empathy in Action - Understanding Every Student\'s Journey 💝',
      agenda: 'Focus on student mental health and wellbeing. Initiatives include peer counseling programs, stress management workshops, creating safe spaces for difficult conversations, and establishing support groups for homesickness and cultural adjustment challenges.',
      photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      badges: ['Mental Health Advocate', 'Peer Counselor', 'Wellness Champion', 'Support Group Leader'],
      forumStats: { posts: 78, upvotes: 156, uniCommunityScore: 82 },
      agendaFeasibilityNotes: 'Important focus area with practical implementation approach',
      nfaScores: { events: 79, leadership: 81, reputation: 85, agendaFeasibility: 78 },
      nfaSummary: 'Compassionate leader with strong focus on student welfare. Addresses critical mental health needs often overlooked. Good balance of empathy and practical solutions.',
      nfaDetailedEvaluation: 'Events/Badges (23.7/30): Good participation with 4 relevant mental health badges showing specialized expertise. Community Support (21.25/25): Strong forum presence with supportive posts and high community trust. Public Ratings (12.9/15): Good 4.3-star rating with positive empathy feedback. Agenda Feasibility (23.4/30): Practical mental health initiatives with clear implementation approach.',
      voteCount: 112,
      averageRating: 4.3,
      totalRatings: 65,
      isTopNFAPick: false
    },
    {
      id: 'copres-3',
      fullName: 'Muhammad Farid bin Omar',
      year: 'Year 2',
      major: 'Economics',
      university: 'Korea University',
      slogan: 'Building Tomorrow\'s Leaders Today 📈',
      agenda: 'Developing leadership skills among members through workshops, seminars, and hands-on project management opportunities. Creating mentorship chains where seniors guide juniors in academic and personal development.',
      photo: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150&h=150&fit=crop&crop=face',
      badges: ['Leadership Development', 'Workshop Facilitator', 'Mentorship Coordinator'],
      forumStats: { posts: 34, upvotes: 89, uniCommunityScore: 71 },
      agendaFeasibilityNotes: 'Good concept but needs more specific programs and measurable outcomes',
      nfaScores: { events: 65, leadership: 72, reputation: 74, agendaFeasibility: 63 },
      nfaSummary: 'Promising leader with good intentions but limited concrete experience. Agenda is somewhat generic and could benefit from more innovative approaches to leadership development.',
      nfaDetailedEvaluation: 'Events/Badges (19.5/30): Moderate participation with 3 leadership-focused badges but limited recent activity. Community Support (18.5/25): Basic forum engagement with average community interaction. Public Ratings (11.7/15): Average 3.9-star rating with mixed feedback. Agenda Feasibility (18.9/30): Generic leadership development concepts lacking specific programs and measurable outcomes.',
      voteCount: 78,
      averageRating: 3.9,
      totalRatings: 52,
      isTopNFAPick: false
    }
  ],
  academic: [
    {
      id: 'acad-1',
      fullName: 'Dr. Nurul Aina binti Zakaria',
      year: 'PhD Year 2',
      major: 'Computer Science',
      university: 'Seoul National University',
      slogan: 'Academic Excellence Through Innovation and Collaboration 🎓',
      agenda: 'Revolutionizing academic support with AI-powered study matching, virtual reality language learning labs, blockchain-verified academic credentials, and quantum computing workshops for advanced students.',
      photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face',
      badges: ['PhD Scholar', 'Research Excellence', 'Innovation Leader', 'Tech Pioneer', 'Academic Mentor', 'Publication Author'],
      forumStats: { posts: 156, upvotes: 445, uniCommunityScore: 96 },
      agendaFeasibilityNotes: 'Highly ambitious tech agenda requiring significant resources and expertise',
      nfaScores: { events: 88, leadership: 92, reputation: 94, agendaFeasibility: 72 },
      nfaSummary: 'Brilliant academic with cutting-edge vision. However, some proposals may be too advanced for current infrastructure. Strong research background but agenda may lack practical implementation focus.',
      nfaDetailedEvaluation: 'Events/Badges (26.4/30): Exceptional participation with 6 high-impact academic badges including PhD Scholar and Research Excellence. Community Support (23.5/25): Outstanding forum leadership with 156 posts and 445 upvotes, highest community score. Public Ratings (12.3/15): Good 4.1-star rating despite some concerns about practicality. Agenda Feasibility (21.6/30): Highly innovative but potentially too advanced for current organizational infrastructure and resources.',
      voteCount: 89,
      averageRating: 4.1,
      totalRatings: 67,
      isTopNFAPick: false
    },
    {
      id: 'acad-2',
      fullName: 'Wong Kar Wai',
      year: 'Year 4',
      major: 'Education',
      university: 'Korea University',
      slogan: 'Learning Made Simple - Every Student Deserves Success 📚',
      agenda: 'Practical academic support including study group coordination, exam preparation workshops, note-sharing platform, tutoring matching service, and academic skills development seminars. Focus on helping struggling students catch up.',
      photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      badges: ['Study Group Leader', 'Tutor Excellence', 'Academic Support', 'Peer Mentor', 'Workshop Organizer'],
      forumStats: { posts: 89, upvotes: 234, uniCommunityScore: 87 },
      agendaFeasibilityNotes: 'Practical and achievable academic support initiatives with clear implementation path',
      nfaScores: { events: 85, leadership: 83, reputation: 86, agendaFeasibility: 89 },
      nfaSummary: 'Excellent candidate with practical approach to academic support. Strong track record of helping students succeed. Realistic agenda with proven methods.',
      nfaDetailedEvaluation: 'Events/Badges (25.5/30): Strong participation with 5 directly relevant academic support badges showing hands-on experience. Community Support (21.75/25): Excellent forum engagement with helpful academic discussions and high upvote ratio. Public Ratings (13.8/15): Outstanding 4.6-star rating with consistently positive feedback. Agenda Feasibility (26.7/30): Highly practical initiatives with clear implementation paths and proven effectiveness.',
      voteCount: 145,
      averageRating: 4.6,
      totalRatings: 89,
      isTopNFAPick: true
    },
    {
      id: 'acad-3',
      fullName: 'Priya Devi Sharma',
      year: 'Year 3',
      major: 'Literature',
      university: 'Yonsei University',
      slogan: 'Words That Inspire, Knowledge That Empowers ✍️',
      agenda: 'Creative academic programs including writing workshops, debate clubs, literary discussions, and cultural exchange through academic presentations. Emphasis on improving communication skills.',
      photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      badges: ['Writing Excellence', 'Debate Champion', 'Cultural Bridge'],
      forumStats: { posts: 67, upvotes: 145, uniCommunityScore: 79 },
      agendaFeasibilityNotes: 'Creative approach but limited scope for broader academic support needs',
      nfaScores: { events: 74, leadership: 76, reputation: 81, agendaFeasibility: 71 },
      nfaSummary: 'Creative and passionate about academic development but agenda may be too narrow. Strong in humanities but may struggle to support STEM students effectively.',
      nfaDetailedEvaluation: 'Events/Badges (22.2/30): Good participation with 3 humanities-focused badges but limited breadth. Community Support (20.25/25): Decent forum engagement with quality literary discussions. Public Ratings (12/15): Solid 4.0-star rating with positive creativity feedback. Agenda Feasibility (21.3/30): Creative but narrow approach that may not address diverse academic support needs across all disciplines.',
      voteCount: 67,
      averageRating: 4.0,
      totalRatings: 45,
      isTopNFAPick: false
    },
    {
      id: 'acad-4',
      fullName: 'Azman bin Rashid',
      year: 'Year 2',
      major: 'Mathematics',
      university: 'KAIST',
      slogan: 'Numbers Don\'t Lie - Excellence Through Precision 🔢',
      agenda: 'Data-driven academic improvement through performance analytics, personalized study plans, statistical tracking of student progress, and evidence-based learning methodologies.',
      photo: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150&h=150&fit=crop&crop=face',
      badges: ['Math Olympiad', 'Data Analytics', 'Statistical Modeling'],
      forumStats: { posts: 23, upvotes: 78, uniCommunityScore: 68 },
      agendaFeasibilityNotes: 'Analytical approach but may lack human touch in academic support',
      nfaScores: { events: 61, leadership: 65, reputation: 72, agendaFeasibility: 66 },
      nfaSummary: 'Strong analytical skills but limited leadership experience. Agenda is too technical and may not address diverse student needs effectively.',
      nfaDetailedEvaluation: 'Events/Badges (18.3/30): Limited participation with 3 technical badges showing analytical skills but lacking leadership experience. Community Support (17/25): Low forum activity with technical but limited community engagement. Public Ratings (10.5/15): Below-average 3.5-star rating with concerns about approachability. Agenda Feasibility (19.8/30): Overly technical approach that may lack the human touch needed for effective academic support.',
      voteCount: 34,
      averageRating: 3.5,
      totalRatings: 28,
      isTopNFAPick: false
    },
    {
      id: 'acad-5',
      fullName: 'Sarah binti Ismail',
      year: 'Year 1',
      major: 'Liberal Arts',
      university: 'Hongik University',
      slogan: 'Fresh Ideas for Academic Growth 🌱',
      agenda: 'Student-centered academic initiatives including peer study circles, collaborative learning projects, and interdisciplinary academic events to broaden perspectives.',
      photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      badges: ['New Student Ambassador', 'Study Circle Organizer'],
      forumStats: { posts: 12, upvotes: 34, uniCommunityScore: 58 },
      agendaFeasibilityNotes: 'Enthusiastic but lacks experience and detailed planning',
      nfaScores: { events: 45, leadership: 52, reputation: 61, agendaFeasibility: 48 },
      nfaSummary: 'Enthusiastic newcomer with good intentions but limited experience and vague agenda. Needs more development before taking on major academic leadership role.',
      nfaDetailedEvaluation: 'Events/Badges (13.5/30): Minimal participation with only 2 basic badges, showing enthusiasm but lacking substantial experience. Community Support (14.5/25): Very limited forum activity indicating low community engagement. Public Ratings (9.6/15): Low 3.2-star rating reflecting concerns about experience. Agenda Feasibility (14.4/30): Vague proposals lacking specific details and implementation strategies.',
      voteCount: 23,
      averageRating: 3.2,
      totalRatings: 19,
      isTopNFAPick: false
    }
  ],
  housing: [
    {
      id: 'hous-1',
      fullName: 'Lim Jia Wei',
      year: 'Year 4',
      major: 'Architecture',
      university: 'Seoul National University',
      slogan: 'Building Better Living Spaces for Every Malaysian 🏠',
      agenda: 'Comprehensive housing solutions including verified landlord database, housing inspection services, roommate matching platform, emergency accommodation fund, and negotiation support for rental agreements. Creating housing quality standards and tenant rights education.',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      badges: ['Housing Expert', 'Tenant Rights Advocate', 'Architecture Excellence', 'Community Planner', 'Safety Inspector'],
      forumStats: { posts: 134, upvotes: 378, uniCommunityScore: 91 },
      agendaFeasibilityNotes: 'Comprehensive and practical housing solutions with professional expertise',
      nfaScores: { events: 89, leadership: 87, reputation: 92, agendaFeasibility: 91 },
      nfaSummary: 'Outstanding candidate with professional expertise in housing. Comprehensive understanding of student housing challenges with practical, implementable solutions.',
      nfaDetailedEvaluation: 'Events/Badges (26.7/30): Exceptional participation with 5 highly relevant housing and architecture badges showing professional expertise. Community Support (22.75/25): Outstanding forum leadership with 134 posts and 378 upvotes on housing topics. Public Ratings (14.4/15): Excellent 4.8-star rating with consistently positive feedback on housing expertise. Agenda Feasibility (27.3/30): Comprehensive and highly practical solutions with clear implementation strategies and professional backing.',
      voteCount: 167,
      averageRating: 4.8,
      totalRatings: 95,
      isTopNFAPick: true
    },
    {
      id: 'hous-2',
      fullName: 'Kavitha Devi Nair',
      year: 'Year 3',
      major: 'Social Work',
      university: 'Korea University',
      slogan: 'Safe Homes, Strong Communities 🤝',
      agenda: 'Focus on housing safety and community building through regular safety inspections, community events in residential areas, conflict resolution services, and support for students facing housing discrimination.',
      photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face',
      badges: ['Community Builder', 'Safety Advocate', 'Conflict Resolution', 'Social Justice'],
      forumStats: { posts: 78, upvotes: 189, uniCommunityScore: 84 },
      agendaFeasibilityNotes: 'Strong community focus with practical safety and support initiatives',
      nfaScores: { events: 82, leadership: 85, reputation: 87, agendaFeasibility: 83 },
      nfaSummary: 'Excellent community-focused approach to housing issues. Strong background in social work provides valuable perspective on student welfare and safety.',
      nfaDetailedEvaluation: 'Events/Badges (24.6/30): Strong participation with 4 community-focused badges showing social work expertise. Community Support (21.75/25): Good forum engagement with supportive community discussions. Public Ratings (13.2/15): Strong 4.4-star rating with positive safety and community feedback. Agenda Feasibility (24.9/30): Practical safety and community initiatives with clear social work foundation.',
      voteCount: 123,
      averageRating: 4.4,
      totalRatings: 71,
      isTopNFAPick: false
    },
    {
      id: 'hous-3',
      fullName: 'Ahmad Hafiz bin Yusof',
      year: 'Year 2',
      major: 'Real Estate',
      university: 'Yonsei University',
      slogan: 'Smart Housing Solutions for Smart Students 💡',
      agenda: 'Technology-driven housing platform with virtual tours, automated rent tracking, maintenance request system, and AI-powered housing recommendations based on preferences and budget.',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      badges: ['Tech Innovation', 'Real Estate Knowledge', 'Digital Solutions'],
      forumStats: { posts: 45, upvotes: 98, uniCommunityScore: 73 },
      agendaFeasibilityNotes: 'Innovative tech approach but may require significant development resources',
      nfaScores: { events: 68, leadership: 71, reputation: 75, agendaFeasibility: 65 },
      nfaSummary: 'Innovative approach with good industry knowledge but limited leadership experience. Tech solutions may be ambitious for current organizational capacity.',
      nfaDetailedEvaluation: 'Events/Badges (20.4/30): Moderate participation with 3 tech-focused badges but limited housing experience. Community Support (18.25/25): Basic forum engagement with tech discussions. Public Ratings (11.7/15): Average 3.9-star rating with mixed feedback on feasibility. Agenda Feasibility (19.5/30): Innovative but potentially resource-intensive tech solutions that may exceed current organizational capacity.',
      voteCount: 78,
      averageRating: 3.9,
      totalRatings: 54,
      isTopNFAPick: false
    },
    {
      id: 'hous-4',
      fullName: 'Chen Li Ming',
      year: 'Year 3',
      major: 'Business',
      university: 'KAIST',
      slogan: 'Affordable Housing for All 💰',
      agenda: 'Cost-effective housing solutions including group rental negotiations, shared accommodation matching, budget housing database, and financial planning workshops for housing expenses.',
      photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      badges: ['Budget Planning', 'Negotiation Skills', 'Financial Literacy'],
      forumStats: { posts: 56, upvotes: 123, uniCommunityScore: 77 },
      agendaFeasibilityNotes: 'Practical cost-focused approach with achievable goals',
      nfaScores: { events: 74, leadership: 76, reputation: 78, agendaFeasibility: 79 },
      nfaSummary: 'Solid candidate with practical approach to housing affordability. Good understanding of student financial constraints with realistic solutions.',
      nfaDetailedEvaluation: 'Events/Badges (22.2/30): Good participation with 3 finance-focused badges showing budget expertise. Community Support (19.5/25): Decent forum engagement with practical financial discussions. Public Ratings (12.3/15): Good 4.1-star rating with positive affordability feedback. Agenda Feasibility (23.7/30): Practical cost-focused solutions with realistic implementation and clear financial benefits.',
      voteCount: 89,
      averageRating: 4.1,
      totalRatings: 62,
      isTopNFAPick: false
    },
    {
      id: 'hous-5',
      fullName: 'Fatimah binti Rahman',
      year: 'Year 1',
      major: 'Interior Design',
      university: 'Hongik University',
      slogan: 'Beautiful Spaces, Happy Lives 🌈',
      agenda: 'Improving living conditions through interior design consultations, space optimization tips, decoration workshops, and creating aesthetic living environments on a budget.',
      photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      badges: ['Design Excellence', 'Creative Solutions'],
      forumStats: { posts: 28, upvotes: 67, uniCommunityScore: 64 },
      agendaFeasibilityNotes: 'Creative approach but limited scope for addressing core housing issues',
      nfaScores: { events: 58, leadership: 61, reputation: 68, agendaFeasibility: 56 },
      nfaSummary: 'Creative and passionate about improving living spaces but agenda may be too narrow. Limited experience in addressing fundamental housing challenges.',
      nfaDetailedEvaluation: 'Events/Badges (17.4/30): Limited participation with only 2 design badges, lacking housing expertise. Community Support (16/25): Low forum activity with basic design discussions. Public Ratings (10.8/15): Below-average 3.6-star rating with concerns about scope. Agenda Feasibility (16.8/30): Creative but narrow approach that doesn\'t address core housing challenges like affordability and availability.',
      voteCount: 45,
      averageRating: 3.6,
      totalRatings: 33,
      isTopNFAPick: false
    }
  ],
  welfare: [
    {
      id: 'welf-1',
      fullName: 'Dr. Rashid bin Abdullah',
      year: 'PhD Year 3',
      major: 'Public Health',
      university: 'Seoul National University',
      slogan: 'Health and Happiness for Every Malaysian Student 🏥',
      agenda: 'Comprehensive wellness program including mental health first aid training, 24/7 crisis hotline, health insurance navigation support, medical emergency fund, wellness workshops, and partnerships with Korean healthcare providers for student discounts.',
      photo: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face',
      badges: ['Medical Professional', 'Mental Health Advocate', 'Crisis Counselor', 'Health Educator', 'Emergency Response', 'Wellness Champion'],
      forumStats: { posts: 167, upvotes: 456, uniCommunityScore: 95 },
      agendaFeasibilityNotes: 'Professionally qualified with comprehensive and practical wellness initiatives',
      nfaScores: { events: 93, leadership: 91, reputation: 96, agendaFeasibility: 94 },
      nfaSummary: 'Exceptional candidate with professional medical background. Comprehensive understanding of student health needs with practical, evidence-based solutions. Highest qualified for student welfare role.',
      nfaDetailedEvaluation: 'Events/Badges (27.9/30): Outstanding participation with 6 medical and wellness badges showing professional expertise. Community Support (23.75/25): Exceptional forum leadership with 167 posts and 456 upvotes, highest community trust. Public Ratings (14.7/15): Outstanding 4.9-star rating with consistently positive health expertise feedback. Agenda Feasibility (28.2/30): Comprehensive and professionally-backed wellness initiatives with clear medical foundation and practical implementation strategies.',
      voteCount: 189,
      averageRating: 4.9,
      totalRatings: 112,
      isTopNFAPick: true
    },
    {
      id: 'welf-2',
      fullName: 'Siti Aminah binti Hassan',
      year: 'Year 4',
      major: 'Psychology',
      university: 'Korea University',
      slogan: 'Caring Hearts, Strong Minds 💚',
      agenda: 'Mental health focused initiatives including peer support groups, stress management workshops, mindfulness sessions, academic pressure counseling, and creating safe spaces for emotional support and cultural adjustment.',
      photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      badges: ['Psychology Expert', 'Peer Counselor', 'Support Group Leader', 'Mindfulness Instructor', 'Cultural Adjustment Specialist'],
      forumStats: { posts: 123, upvotes: 334, uniCommunityScore: 89 },
      agendaFeasibilityNotes: 'Strong psychological background with practical mental health support programs',
      nfaScores: { events: 87, leadership: 85, reputation: 90, agendaFeasibility: 88 },
      nfaSummary: 'Excellent candidate with strong psychology background. Deep understanding of mental health challenges faced by international students. Practical and compassionate approach.',
      nfaDetailedEvaluation: 'Events/Badges (26.1/30): Excellent participation with 5 psychology and mental health badges showing specialized expertise. Community Support (22.25/25): Strong forum presence with supportive mental health discussions. Public Ratings (13.8/15): Excellent 4.6-star rating with positive empathy and support feedback. Agenda Feasibility (26.4/30): Practical mental health initiatives with strong psychological foundation and clear implementation approach.',
      voteCount: 156,
      averageRating: 4.6,
      totalRatings: 89,
      isTopNFAPick: false
    },
    {
      id: 'welf-3',
      fullName: 'Kumar Selvam',
      year: 'Year 3',
      major: 'Sports Science',
      university: 'Yonsei University',
      slogan: 'Strong Body, Strong Mind, Strong Community 💪',
      agenda: 'Physical wellness programs including fitness classes, sports tournaments, nutrition workshops, gym partnerships, outdoor activities, and promoting active lifestyle for stress relief and community building.',
      photo: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150&h=150&fit=crop&crop=face',
      badges: ['Fitness Instructor', 'Sports Organizer', 'Nutrition Advocate', 'Team Builder'],
      forumStats: { posts: 89, upvotes: 198, uniCommunityScore: 82 },
      agendaFeasibilityNotes: 'Good physical wellness focus but may need broader welfare perspective',
      nfaScores: { events: 81, leadership: 79, reputation: 84, agendaFeasibility: 76 },
      nfaSummary: 'Strong focus on physical wellness with good community building skills. However, agenda may be too narrow for comprehensive student welfare needs.',
      nfaDetailedEvaluation: 'Events/Badges (24.3/30): Strong participation with 4 fitness and sports badges showing physical wellness expertise. Community Support (21/25): Good forum engagement with fitness and community discussions. Public Ratings (12.6/15): Good 4.2-star rating with positive fitness feedback. Agenda Feasibility (22.8/30): Good physical wellness focus but may be too narrow for comprehensive student welfare needs including mental health and social support.',
      voteCount: 98,
      averageRating: 4.2,
      totalRatings: 67,
      isTopNFAPick: false
    },
    {
      id: 'welf-4',
      fullName: 'Nurul Hidayah binti Zainal',
      year: 'Year 2',
      major: 'Social Work',
      university: 'KAIST',
      slogan: 'Every Student Matters - No One Left Behind 🤗',
      agenda: 'Inclusive welfare programs focusing on supporting vulnerable students, financial assistance programs, emergency support services, and creating inclusive community events for students from all backgrounds.',
      photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face',
      badges: ['Social Justice Advocate', 'Inclusion Champion', 'Emergency Support'],
      forumStats: { posts: 67, upvotes: 145, uniCommunityScore: 78 },
      agendaFeasibilityNotes: 'Compassionate approach with focus on vulnerable students',
      nfaScores: { events: 73, leadership: 75, reputation: 81, agendaFeasibility: 74 },
      nfaSummary: 'Compassionate candidate with good understanding of social welfare principles. Strong focus on inclusion but may need more experience in program implementation.',
      nfaDetailedEvaluation: 'Events/Badges (21.9/30): Good participation with 3 social justice badges showing welfare focus. Community Support (20.25/25): Decent forum engagement with inclusive discussions. Public Ratings (12/15): Good 4.0-star rating with positive inclusion feedback. Agenda Feasibility (22.2/30): Compassionate approach with good social work foundation but may need more specific implementation strategies.',
      voteCount: 87,
      averageRating: 4.0,
      totalRatings: 56,
      isTopNFAPick: false
    },
    {
      id: 'welf-5',
      fullName: 'Tan Wei Jie',
      year: 'Year 1',
      major: 'Medicine',
      university: 'Seoul National University',
      slogan: 'Future Doctor, Present Helper 🩺',
      agenda: 'Basic health education and first aid training for students, health awareness campaigns, and connecting students with healthcare resources in Korea.',
      photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      badges: ['Medical Student', 'First Aid Certified'],
      forumStats: { posts: 34, upvotes: 78, uniCommunityScore: 69 },
      agendaFeasibilityNotes: 'Good medical background but limited experience and basic agenda',
      nfaScores: { events: 62, leadership: 58, reputation: 72, agendaFeasibility: 61 },
      nfaSummary: 'Promising medical student with good intentions but limited leadership experience. Agenda is basic and needs more comprehensive welfare perspective.',
      nfaDetailedEvaluation: 'Events/Badges (18.6/30): Limited participation with only 2 medical badges, lacking leadership experience. Community Support (17.25/25): Low forum activity with basic medical discussions. Public Ratings (11.1/15): Below-average 3.7-star rating with concerns about experience. Agenda Feasibility (18.3/30): Basic health education approach lacking comprehensive welfare perspective and specific implementation details.',
      voteCount: 56,
      averageRating: 3.7,
      totalRatings: 41,
      isTopNFAPick: false
    }
  ]
}

const positions = [
  { id: 'president', title: 'President', emoji: '👑', description: 'Lead the organization and represent all Malaysian students' },
  { id: 'copresident', title: 'Co-President', emoji: '🤝', description: 'Support the President and manage special initiatives' },
  { id: 'academic', title: 'EXCO Academic', emoji: '📚', description: 'Oversee academic support and educational programs' },
  { id: 'housing', title: 'EXCO Housing', emoji: '🏠', description: 'Manage housing assistance and accommodation support' },
  { id: 'welfare', title: 'EXCO Student Welfare', emoji: '💚', description: 'Ensure student wellbeing and support services' }
]

// Mock election results with combined scoring (60% user votes + 40% NFA scores)
const getElectionResults = () => {
  const results: Record<string, any[]> = {}
  
  Object.entries(mockCandidates).forEach(([positionId, candidates]) => {
    const candidatesWithScores = candidates.map((candidate: any) => {
      const nfaOverallScore = Math.round((candidate.nfaScores.events + candidate.nfaScores.leadership + candidate.nfaScores.reputation + candidate.nfaScores.agendaFeasibility) / 4)
      const userVotePercentage = (candidate.voteCount / candidates.reduce((sum: number, c: any) => sum + c.voteCount, 0)) * 100
      const combinedScore = (userVotePercentage * 0.6) + (nfaOverallScore * 0.4)
      
      return {
        ...candidate,
        nfaOverallScore,
        userVotePercentage,
        combinedScore,
        rank: 0
      }
    })
    
    // Sort by combined score and assign ranks
    candidatesWithScores.sort((a, b) => b.combinedScore - a.combinedScore)
    candidatesWithScores.forEach((candidate, index) => {
      candidate.rank = index + 1
    })
    
    results[positionId] = candidatesWithScores
  })
  
  return results
}

const ElectionsHome: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">AGM Elections 2024 🗳️</h1>
        <p className="text-gray-400">Choose the leaders who will represent Malaysian students in Korea</p>
      </div>

      {/* Election Status */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-6 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white mb-2">Election Status: Active</h2>
            <p className="text-purple-100">Voting closes in 5 days, 14 hours, 23 minutes</p>
          </div>
          <div className="text-right">
            <p className="text-purple-100 text-sm">Total Votes Cast</p>
            <p className="text-3xl font-bold text-white">1,247</p>
          </div>
        </div>
      </div>

      {/* Quick Navigation */}
      <div className="flex space-x-4 mb-8">
        <button
          onClick={() => navigate('/elections/results')}
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold flex items-center space-x-2"
        >
          <Trophy className="w-5 h-5" />
          <span>View Results</span>
        </button>
      </div>

      {/* Positions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {positions.map((position) => {
          const candidates = mockCandidates[position.id as keyof typeof mockCandidates]
          return (
            <div
              key={position.id}
              onClick={() => navigate(`/elections/position/${position.id}`)}
              className="bg-gray-800 rounded-xl border border-gray-700 p-6 hover:border-purple-500 transition-colors cursor-pointer group"
            >
              <div className="text-center">
                <div className="text-4xl mb-4">{position.emoji}</div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                  {position.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4">{position.description}</p>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2 text-gray-300">
                    <Users className="w-4 h-4" />
                    <span>{candidates.length} candidates</span>
                  </div>
                  <div className="flex items-center space-x-2 text-purple-400">
                    <Vote className="w-4 h-4" />
                    <span>View Details</span>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Quick Stats */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 text-center">
          <Users className="w-8 h-8 text-blue-400 mx-auto mb-3" />
          <p className="text-2xl font-bold text-white">23</p>
          <p className="text-gray-400 text-sm">Total Candidates</p>
        </div>
        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 text-center">
          <Vote className="w-8 h-8 text-green-400 mx-auto mb-3" />
          <p className="text-2xl font-bold text-white">1,247</p>
          <p className="text-gray-400 text-sm">Votes Cast</p>
        </div>
        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 text-center">
          <TrendingUp className="w-8 h-8 text-purple-400 mx-auto mb-3" />
          <p className="text-2xl font-bold text-white">78%</p>
          <p className="text-gray-400 text-sm">Participation Rate</p>
        </div>
      </div>
    </div>
  )
}

const PositionDetail: React.FC<{ positionId: string }> = ({ positionId }) => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<'candidates' | 'my-ratings'>('candidates')
  const [userRatings, setUserRatings] = useState<Record<string, any>>({})
  const [hasVoted, setHasVoted] = useState(false)
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null)
  
  const position = positions.find(p => p.id === positionId)
  const candidates = mockCandidates[positionId as keyof typeof mockCandidates] || []

  const getNFAGrade = (score: number) => {
    if (score >= 90) return { grade: 'A+', color: 'text-green-400' }
    if (score >= 85) return { grade: 'A', color: 'text-green-400' }
    if (score >= 80) return { grade: 'A-', color: 'text-blue-400' }
    if (score >= 75) return { grade: 'B+', color: 'text-blue-400' }
    if (score >= 70) return { grade: 'B', color: 'text-yellow-400' }
    if (score >= 65) return { grade: 'B-', color: 'text-yellow-400' }
    if (score >= 60) return { grade: 'C+', color: 'text-orange-400' }
    if (score >= 55) return { grade: 'C', color: 'text-orange-400' }
    return { grade: 'D', color: 'text-red-400' }
  }

  const getOverallNFAScore = (scores: any) => {
    return Math.round((scores.events + scores.leadership + scores.reputation + scores.agendaFeasibility) / 4)
  }

  const getRatedCandidatesCount = () => {
    return Object.keys(userRatings).length
  }

  const canVote = getRatedCandidatesCount() === candidates.length

  const handleVote = (candidateId: string) => {
    if (canVote && !hasVoted) {
      setSelectedCandidate(candidateId)
      setHasVoted(true)
      // Here you would submit the vote
    }
  }

  if (!position) return <div>Position not found</div>

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-8">
        <button
          onClick={() => navigate('/elections')}
          className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <span className="text-3xl">{position.emoji}</span>
            <h1 className="text-3xl font-bold text-white">{position.title}</h1>
          </div>
          <p className="text-gray-400">{position.description}</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-white">Rate All Progress</h3>
          <span className="text-purple-400 font-semibold">
            {getRatedCandidatesCount()}/{candidates.length} rated
          </span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-3 mb-4">
          <div 
            className="bg-purple-500 h-3 rounded-full transition-all duration-300" 
            style={{ width: `${(getRatedCandidatesCount() / candidates.length) * 100}%` }}
          ></div>
        </div>
        {canVote ? (
          <div className="flex items-center space-x-2 text-green-400">
            <CheckCircle className="w-5 h-5" />
            <span>All candidates rated! You can now vote.</span>
          </div>
        ) : (
          <p className="text-gray-400">Rate all candidates to unlock voting</p>
        )}
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 mb-8">
        <button
          onClick={() => setActiveTab('candidates')}
          className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
            activeTab === 'candidates'
              ? 'bg-purple-600 text-white'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
        >
          Candidates ({candidates.length})
        </button>
        <button
          onClick={() => setActiveTab('my-ratings')}
          className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
            activeTab === 'my-ratings'
              ? 'bg-purple-600 text-white'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
        >
          My Ratings
        </button>
      </div>

      {activeTab === 'candidates' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {candidates.map((candidate) => {
            const overallScore = getOverallNFAScore(candidate.nfaScores)
            const gradeInfo = getNFAGrade(overallScore)
            const isRated = userRatings[candidate.id]
            const isSelected = selectedCandidate === candidate.id
            
            return (
              <div key={candidate.id} className={`bg-gray-800 rounded-xl border p-6 transition-colors ${
                isSelected ? 'border-green-500 bg-green-900/20' : 'border-gray-700 hover:border-purple-500'
              }`}>
                <div className="flex items-start space-x-4 mb-4">
                  <img
                    src={candidate.photo}
                    alt={candidate.fullName}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="text-xl font-bold text-white">{candidate.fullName}</h3>
                      {candidate.isTopNFAPick && (
                        <span className="px-2 py-1 bg-yellow-600 text-white text-xs rounded-full flex items-center space-x-1">
                          <Crown className="w-3 h-3" />
                          <span>Top NFA Pick</span>
                        </span>
                      )}
                    </div>
                    <p className="text-gray-400 text-sm">{candidate.year} • {candidate.major}</p>
                    <p className="text-gray-400 text-sm">{candidate.university}</p>
                  </div>
                  <div className="text-right">
                    <div className={`text-2xl font-bold ${gradeInfo.color}`}>{gradeInfo.grade}</div>
                    <div className="text-gray-400 text-xs">NFA Score</div>
                  </div>
                </div>

                <p className="text-purple-300 font-medium mb-4 italic">"{candidate.slogan}"</p>

                {/* Badges */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {candidate.badges.slice(0, 3).map((badge, index) => (
                    <span key={index} className="px-2 py-1 bg-purple-600 text-white text-xs rounded-full">
                      {badge}
                    </span>
                  ))}
                  {candidate.badges.length > 3 && (
                    <span className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded-full">
                      +{candidate.badges.length - 3} more
                    </span>
                  )}
                </div>

                {/* NFA Mini Panel */}
                <div className="bg-gray-700 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-white font-semibold">NFA Analysis</h4>
                    <div className="flex items-center space-x-2">
                      <BarChart3 className="w-4 h-4 text-purple-400" />
                      <span className="text-purple-400 text-sm">AI Evaluated</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-gray-400">Events:</span>
                      <span className="text-white ml-2">{candidate.nfaScores.events}/100</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Leadership:</span>
                      <span className="text-white ml-2">{candidate.nfaScores.leadership}/100</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Reputation:</span>
                      <span className="text-white ml-2">{candidate.nfaScores.reputation}/100</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Agenda:</span>
                      <span className="text-white ml-2">{candidate.nfaScores.agendaFeasibility}/100</span>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400" />
                      <span>{candidate.averageRating.toFixed(1)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Vote className="w-4 h-4" />
                      <span>{candidate.voteCount} votes</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MessageCircle className="w-4 h-4" />
                    <span>{candidate.forumStats.posts} posts</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2">
                  <button
                    onClick={() => navigate(`/elections/candidate/${candidate.id}`)}
                    className={`w-full px-4 py-2 rounded-lg transition-colors font-semibold ${
                      isRated 
                        ? 'bg-green-600 text-white hover:bg-green-700' 
                        : 'bg-purple-600 text-white hover:bg-purple-700'
                    }`}
                  >
                    {isRated ? '✓ Rated - View Profile' : 'Rate & View Profile'}
                  </button>
                  
                  {canVote && !hasVoted && (
                    <button
                      onClick={() => handleVote(candidate.id)}
                      className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                    >
                      Vote for {candidate.fullName.split(' ')[0]}
                    </button>
                  )}
                  
                  {isSelected && (
                    <div className="flex items-center justify-center space-x-2 text-green-400 font-semibold">
                      <CheckCircle className="w-5 h-5" />
                      <span>Your Vote</span>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {activeTab === 'my-ratings' && (
        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
          <h3 className="text-xl font-bold text-white mb-4">Your Ratings for {position.title}</h3>
          {Object.keys(userRatings).length === 0 ? (
            <div className="text-center py-8">
              <Star className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">You haven't rated any candidates yet</p>
              <p className="text-gray-500 text-sm">Rate candidates to see your feedback here</p>
            </div>
          ) : (
            <div className="space-y-4">
              {Object.entries(userRatings).map(([candidateId, rating]) => {
                const candidate = candidates.find(c => c.id === candidateId)
                if (!candidate) return null
                
                return (
                  <div key={candidateId} className="bg-gray-700 rounded-lg p-4">
                    <div className="flex items-center space-x-4 mb-3">
                      <img
                        src={candidate.photo}
                        alt={candidate.fullName}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="text-white font-semibold">{candidate.fullName}</h4>
                        <p className="text-gray-400 text-sm">Your rating: {rating.averageRating}/5 ⭐</p>
                      </div>
                    </div>
                    {rating.comment && (
                      <p className="text-gray-300 text-sm italic">"{rating.comment}"</p>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

const CandidateDetail: React.FC<{ candidateId: string }> = ({ candidateId }) => {
  const navigate = useNavigate()
  const [showRatingModal, setShowRatingModal] = useState(false)
  const [ratings, setRatings] = useState({
    communication: 0,
    leadership: 0,
    problemSolving: 0,
    participation: 0,
    integrity: 0
  })
  const [comment, setComment] = useState('')
  const [hasRated, setHasRated] = useState(false)

  // Find candidate across all positions
  let candidate: any = null
  let positionId = ''
  
  for (const [pos, candidates] of Object.entries(mockCandidates)) {
    const found = candidates.find((c: any) => c.id === candidateId)
    if (found) {
      candidate = found
      positionId = pos
      break
    }
  }

  if (!candidate) return <div>Candidate not found</div>

  const position = positions.find(p => p.id === positionId)
  const overallScore = Math.round((candidate.nfaScores.events + candidate.nfaScores.leadership + candidate.nfaScores.reputation + candidate.nfaScores.agendaFeasibility) / 4)
  
  const getNFAGrade = (score: number) => {
    if (score >= 90) return { grade: 'A+', color: 'text-green-400' }
    if (score >= 85) return { grade: 'A', color: 'text-green-400' }
    if (score >= 80) return { grade: 'A-', color: 'text-blue-400' }
    if (score >= 75) return { grade: 'B+', color: 'text-blue-400' }
    if (score >= 70) return { grade: 'B', color: 'text-yellow-400' }
    if (score >= 65) return { grade: 'B-', color: 'text-yellow-400' }
    if (score >= 60) return { grade: 'C+', color: 'text-orange-400' }
    if (score >= 55) return { grade: 'C', color: 'text-orange-400' }
    return { grade: 'D', color: 'text-red-400' }
  }

  const gradeInfo = getNFAGrade(overallScore)

  const handleRatingSubmit = () => {
    const averageRating = Object.values(ratings).reduce((sum, rating) => sum + rating, 0) / 5
    // Here you would save the ratings
    setHasRated(true)
    setShowRatingModal(false)
    // Show success message
  }

  const RatingModal = () => {
    const ratingCategories = [
      { key: 'communication', label: 'Communication Skills', icon: Mic },
      { key: 'leadership', label: 'Leadership Potential', icon: Trophy },
      { key: 'problemSolving', label: 'Problem Solving', icon: Lightbulb },
      { key: 'participation', label: 'Community Participation', icon: Users },
      { key: 'integrity', label: 'Integrity & Ethics', icon: Shield }
    ]

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">Rate {candidate.fullName}</h3>
            <button
              onClick={() => setShowRatingModal(false)}
              className="text-gray-400 hover:text-white"
            >
              ✕
            </button>
          </div>

          <div className="space-y-6">
            {ratingCategories.map((category) => {
              const Icon = category.icon
              return (
                <div key={category.key}>
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon className="w-4 h-4 text-purple-400" />
                    <label className="text-white font-medium">{category.label}</label>
                  </div>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setRatings(prev => ({ ...prev, [category.key]: star }))}
                        className={`text-2xl ${
                          star <= ratings[category.key as keyof typeof ratings]
                            ? 'text-yellow-400'
                            : 'text-gray-600'
                        } hover:text-yellow-400 transition-colors`}
                      >
                        ⭐
                      </button>
                    ))}
                  </div>
                </div>
              )
            })}

            <div>
              <label className="text-white font-medium mb-2 block">Public Comment (Optional)</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your thoughts about this candidate..."
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                rows={3}
              />
              <p className="text-gray-400 text-xs mt-1">Your comment is public. Be respectful.</p>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setShowRatingModal(false)}
                className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleRatingSubmit}
                disabled={Object.values(ratings).some(r => r === 0)}
                className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit Rating
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-8">
        <button
          onClick={() => navigate(`/elections/position/${positionId}`)}
          className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-white">Candidate Profile</h1>
          <p className="text-gray-400">{position?.title}</p>
        </div>
      </div>

      {/* Candidate Header */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 mb-8">
        <div className="flex items-start space-x-6">
          <img
            src={candidate.photo}
            alt={candidate.fullName}
            className="w-24 h-24 rounded-full object-cover"
          />
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h2 className="text-2xl font-bold text-white">{candidate.fullName}</h2>
              {candidate.isTopNFAPick && (
                <span className="px-3 py-1 bg-yellow-600 text-white text-sm rounded-full flex items-center space-x-1">
                  <Crown className="w-4 h-4" />
                  <span>Top NFA Pick</span>
                </span>
              )}
            </div>
            <div className="flex items-center space-x-4 text-gray-400 mb-3">
              <div className="flex items-center space-x-1">
                <GraduationCap className="w-4 h-4" />
                <span>{candidate.year} • {candidate.major}</span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin className="w-4 h-4" />
                <span>{candidate.university}</span>
              </div>
            </div>
            <p className="text-purple-300 font-medium italic text-lg">"{candidate.slogan}"</p>
          </div>
          <div className="text-right">
            <div className={`text-3xl font-bold ${gradeInfo.color} mb-1`}>{gradeInfo.grade}</div>
            <div className="text-gray-400 text-sm">NFA Score: {overallScore}/100</div>
            <div className="flex items-center space-x-2 mt-2">
              <Star className="w-4 h-4 text-yellow-400" />
              <span className="text-white">{candidate.averageRating.toFixed(1)}</span>
              <span className="text-gray-400 text-sm">({candidate.totalRatings} ratings)</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Agenda */}
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Target className="w-5 h-5 text-purple-400" />
              <h3 className="text-xl font-bold text-white">Campaign Agenda</h3>
            </div>
            <p className="text-gray-300 leading-relaxed">{candidate.agenda}</p>
          </div>

          {/* Detailed NFA Analysis */}
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
            <div className="flex items-center space-x-2 mb-4">
              <BarChart3 className="w-5 h-5 text-purple-400" />
              <h3 className="text-xl font-bold text-white">Detailed NFA Evaluation</h3>
            </div>
            <p className="text-gray-300 mb-6">{candidate.nfaSummary}</p>
            
            <div className="bg-gray-700 rounded-lg p-4 mb-6">
              <h4 className="text-white font-semibold mb-3">Scoring Breakdown</h4>
              <p className="text-gray-300 text-sm leading-relaxed">{candidate.nfaDetailedEvaluation}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400">Events & Participation (30%)</span>
                  <span className="text-white font-bold">{candidate.nfaScores.events}/100</span>
                </div>
                <div className="w-full bg-gray-600 rounded-full h-2">
                  <div 
                    className="bg-purple-500 h-2 rounded-full" 
                    style={{ width: `${candidate.nfaScores.events}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400">Community Support (25%)</span>
                  <span className="text-white font-bold">{candidate.nfaScores.leadership}/100</span>
                </div>
                <div className="w-full bg-gray-600 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full" 
                    style={{ width: `${candidate.nfaScores.leadership}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400">Public Ratings (15%)</span>
                  <span className="text-white font-bold">{candidate.nfaScores.reputation}/100</span>
                </div>
                <div className="w-full bg-gray-600 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full" 
                    style={{ width: `${candidate.nfaScores.reputation}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400">Agenda Feasibility (30%)</span>
                  <span className="text-white font-bold">{candidate.nfaScores.agendaFeasibility}/100</span>
                </div>
                <div className="w-full bg-gray-600 rounded-full h-2">
                  <div 
                    className="bg-yellow-500 h-2 rounded-full" 
                    style={{ width: `${candidate.nfaScores.agendaFeasibility}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Comments Section */}
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
            <h3 className="text-xl font-bold text-white mb-4">Community Feedback</h3>
            <div className="space-y-4">
              {/* Mock comments */}
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <User className="w-4 h-4 text-gray-400" />
                  <span className="text-white font-medium">Ahmad Rahman</span>
                  <span className="text-gray-400 text-sm">2 hours ago</span>
                </div>
                <p className="text-gray-300">Great agenda with practical solutions. Looking forward to seeing these implemented!</p>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <User className="w-4 h-4 text-gray-400" />
                  <span className="text-white font-medium">Sarah Kim</span>
                  <span className="text-gray-400 text-sm">1 day ago</span>
                </div>
                <p className="text-gray-300">Strong leadership experience and clear vision for the future.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Rating Action */}
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
            <h3 className="text-lg font-bold text-white mb-4">Rate This Candidate</h3>
            {!hasRated ? (
              <button
                onClick={() => setShowRatingModal(true)}
                className="w-full px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold"
              >
                Rate Candidate
              </button>
            ) : (
              <div className="text-center">
                <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-2" />
                <p className="text-green-400 font-semibold">Rating Submitted!</p>
                <p className="text-gray-400 text-sm">Thank you for your feedback</p>
              </div>
            )}
          </div>

          {/* Badges */}
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
            <h3 className="text-lg font-bold text-white mb-4">Achievements</h3>
            <div className="space-y-2">
              {candidate.badges.map((badge, index) => (
                <div key={index} className="flex items-center space-x-2 p-2 bg-gray-700 rounded-lg">
                  <Award className="w-4 h-4 text-purple-400" />
                  <span className="text-white text-sm">{badge}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Forum Stats */}
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
            <h3 className="text-lg font-bold text-white mb-4">Community Activity</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Forum Posts</span>
                <span className="text-white font-semibold">{candidate.forumStats.posts}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Upvotes Received</span>
                <span className="text-white font-semibold">{candidate.forumStats.upvotes}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Community Score</span>
                <span className="text-white font-semibold">{candidate.forumStats.uniCommunityScore}/100</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rating Modal */}
      {showRatingModal && <RatingModal />}
    </div>
  )
}

const ElectionsResults: React.FC = () => {
  const navigate = useNavigate()
  const