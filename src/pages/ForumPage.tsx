import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import { 
  MessageSquare, 
  Plus, 
  Search, 
  TrendingUp, 
  Clock, 
  Users,
  Pin,
  ThumbsUp,
  MessageCircle
} from 'lucide-react'

const ForumPage: React.FC = () => {
  const [selectedForum, setSelectedForum] = useState('general')
  const [searchTerm, setSearchTerm] = useState('')

  const forums = [
    { id: 'general', name: 'General Discussion', emoji: '💬', posts: 234, members: 542 },
    { id: 'snu', name: 'Seoul National University', emoji: '🏛️', posts: 89, members: 156 },
    { id: 'ku', name: 'Korea University', emoji: '🎓', posts: 67, members: 134 },
    { id: 'yonsei', name: 'Yonsei University', emoji: '🦅', posts: 45, members: 98 },
    { id: 'kaist', name: 'KAIST', emoji: '🔬', posts: 56, members: 87 },
    { id: 'food', name: 'Food & Restaurants', emoji: '🍜', posts: 123, members: 298 },
    { id: 'housing', name: 'Housing & Accommodation', emoji: '🏠', posts: 78, members: 187 },
    { id: 'marketplace', name: 'Buy & Sell', emoji: '🛒', posts: 156, members: 234 },
    { id: 'jobs', name: 'Jobs & Internships', emoji: '💼', posts: 43, members: 167 },
    { id: 'travel', name: 'Travel & Tourism', emoji: '✈️', posts: 67, members: 145 }
  ]

  const allPosts = {
    general: [
      {
        id: 1,
        title: 'Welcome to PPMK가자! Introduce yourself here 👋',
        author: 'admin_ppmk',
        university: 'PPMK Admin',
        content: 'Welcome to our community platform! Please introduce yourself and let us know which university you\'re attending.',
        replies: 45,
        likes: 89,
        time: '1 week ago',
        isPinned: true,
        tags: ['welcome', 'introduction', 'community']
      },
      {
        id: 2,
        title: 'Monthly PPMK Meetup - January 2024 🎉',
        author: 'event_organizer',
        university: 'PPMK Committee',
        content: 'Join us for our monthly meetup! Food, games, and networking with fellow Malaysian students.',
        replies: 23,
        likes: 67,
        time: '3 days ago',
        isPinned: true,
        tags: ['meetup', 'event', 'networking']
      },
      {
        id: 3,
        title: 'Tips for surviving Korean winter ❄️',
        author: 'winter_survivor',
        university: 'Various',
        content: 'Korean winter can be brutal! Here are some tips from someone who\'s been through 3 winters here.',
        replies: 34,
        likes: 78,
        time: '5 days ago',
        isPinned: false,
        tags: ['winter', 'tips', 'survival']
      }
    ],
    snu: [
      {
        id: 4,
        title: 'Best Korean BBQ places near SNU campus? 🥩',
        author: 'foodie_snu',
        university: 'Seoul National University',
        content: 'Looking for authentic Korean BBQ recommendations within walking distance of SNU. Budget-friendly options preferred!',
        replies: 23,
        likes: 45,
        time: '2 hours ago',
        isPinned: false,
        tags: ['food', 'snu', 'recommendations']
      },
      {
        id: 5,
        title: 'SNU Library study spots - hidden gems 📚',
        author: 'study_master',
        university: 'Seoul National University',
        content: 'Found some amazing quiet study spots in SNU library that most people don\'t know about. Here\'s my list!',
        replies: 18,
        likes: 56,
        time: '1 day ago',
        isPinned: true,
        tags: ['study', 'library', 'snu']
      },
      {
        id: 6,
        title: 'SNU dormitory vs off-campus housing?',
        author: 'housing_seeker',
        university: 'Seoul National University',
        content: 'Trying to decide between staying in SNU dorms or finding off-campus housing. What are the pros and cons?',
        replies: 31,
        likes: 42,
        time: '2 days ago',
        isPinned: false,
        tags: ['housing', 'dormitory', 'snu']
      }
    ],
    ku: [
      {
        id: 7,
        title: 'TOPIK Level 5 Study Group - KU students 📚',
        author: 'korean_learner_ku',
        university: 'Korea University',
        content: 'Planning to take TOPIK Level 5 next month. Looking for serious KU study partners to practice together.',
        replies: 8,
        likes: 12,
        time: '4 hours ago',
        isPinned: false,
        tags: ['study', 'topik', 'language']
      },
      {
        id: 8,
        title: 'KU Festival 2024 - Malaysian booth volunteers needed! 🎪',
        author: 'ku_festival_team',
        university: 'Korea University',
        content: 'We\'re organizing a Malaysian culture booth for KU Festival. Need volunteers to help with food and cultural displays!',
        replies: 15,
        likes: 28,
        time: '1 day ago',
        isPinned: true,
        tags: ['festival', 'volunteer', 'culture']
      },
      {
        id: 9,
        title: 'Best coffee shops near KU for studying ☕',
        author: 'coffee_addict_ku',
        university: 'Korea University',
        content: 'Need good coffee shops with wifi and quiet atmosphere near KU campus. Any recommendations?',
        replies: 22,
        likes: 35,
        time: '3 days ago',
        isPinned: false,
        tags: ['coffee', 'study', 'recommendations']
      }
    ],
    yonsei: [
      {
        id: 10,
        title: 'Yonsei exchange program tips 🌟',
        author: 'exchange_veteran',
        university: 'Yonsei University',
        content: 'Just finished my exchange at Yonsei. Here are some tips for incoming Malaysian exchange students!',
        replies: 19,
        likes: 67,
        time: '6 hours ago',
        isPinned: true,
        tags: ['exchange', 'tips', 'yonsei']
      },
      {
        id: 11,
        title: 'Sinchon nightlife - safe places for international students 🌙',
        author: 'night_explorer',
        university: 'Yonsei University',
        content: 'Guide to safe and fun nightlife spots in Sinchon area for international students.',
        replies: 27,
        likes: 43,
        time: '2 days ago',
        isPinned: false,
        tags: ['nightlife', 'safety', 'sinchon']
      }
    ],
    kaist: [
      {
        id: 12,
        title: 'Selling Engineering Textbooks - Great Condition! 📖',
        author: 'eng_student_2024',
        university: 'KAIST',
        content: 'Selling various engineering textbooks from my first year. All in excellent condition, 50% off original price.',
        replies: 15,
        likes: 8,
        time: '6 hours ago',
        isPinned: false,
        tags: ['marketplace', 'textbooks', 'engineering']
      },
      {
        id: 13,
        title: 'KAIST research opportunities for undergrads 🔬',
        author: 'research_enthusiast',
        university: 'KAIST',
        content: 'List of professors at KAIST who are open to taking undergraduate research assistants.',
        replies: 12,
        likes: 34,
        time: '1 day ago',
        isPinned: true,
        tags: ['research', 'undergraduate', 'opportunities']
      }
    ],
    food: [
      {
        id: 14,
        title: 'Malaysian food ingredients - where to buy in Seoul? 🌶️',
        author: 'homecook_malaysia',
        university: 'Various',
        content: 'Missing Malaysian food so much! Where can I find ingredients like belacan, pandan leaves, and coconut milk?',
        replies: 41,
        likes: 89,
        time: '1 day ago',
        isPinned: true,
        tags: ['malaysian-food', 'ingredients', 'cooking']
      },
      {
        id: 15,
        title: 'Best halal restaurants in Gangnam 🥘',
        author: 'halal_foodie',
        university: 'Various',
        content: 'Comprehensive list of halal-certified restaurants in Gangnam area with reviews and prices.',
        replies: 28,
        likes: 76,
        time: '2 days ago',
        isPinned: false,
        tags: ['halal', 'gangnam', 'restaurants']
      }
    ],
    housing: [
      {
        id: 16,
        title: 'Affordable Housing Near Hongdae - Tips Needed 🏠',
        author: 'house_hunter',
        university: 'Hongik University',
        content: 'Moving to Seoul next semester. Any tips for finding affordable housing near Hongdae area?',
        replies: 27,
        likes: 31,
        time: '1 day ago',
        isPinned: false,
        tags: ['housing', 'hongdae', 'tips']
      },
      {
        id: 17,
        title: 'Goshiwon vs One-room - which is better? 🤔',
        author: 'housing_expert',
        university: 'Various',
        content: 'Detailed comparison of goshiwon and one-room apartments for international students.',
        replies: 35,
        likes: 58,
        time: '3 days ago',
        isPinned: true,
        tags: ['goshiwon', 'one-room', 'comparison']
      }
    ],
    marketplace: [
      {
        id: 18,
        title: 'Selling iPhone 14 - excellent condition 📱',
        author: 'tech_seller',
        university: 'Various',
        content: 'iPhone 14 128GB in excellent condition. Selling because upgrading to iPhone 15. Original box included.',
        replies: 8,
        likes: 12,
        time: '3 hours ago',
        isPinned: false,
        tags: ['iphone', 'electronics', 'selling']
      },
      {
        id: 19,
        title: 'Winter clothes sale - coats, boots, scarves ❄️',
        author: 'winter_seller',
        university: 'Various',
        content: 'Selling winter clothes before going back to Malaysia. High-quality items at great prices!',
        replies: 23,
        likes: 19,
        time: '1 day ago',
        isPinned: false,
        tags: ['winter-clothes', 'sale', 'clothing']
      }
    ],
    jobs: [
      {
        id: 20,
        title: 'Part-time Job Opportunities for International Students 💼',
        author: 'career_helper',
        university: 'Various',
        content: 'Compiled a list of part-time jobs that are friendly to international students. Check visa requirements!',
        replies: 34,
        likes: 67,
        time: '8 hours ago',
        isPinned: true,
        tags: ['jobs', 'part-time', 'visa']
      },
      {
        id: 21,
        title: 'English tutoring opportunities in Seoul 📚',
        author: 'english_tutor',
        university: 'Various',
        content: 'Guide to finding English tutoring jobs in Seoul. Requirements, pay rates, and best platforms.',
        replies: 19,
        likes: 45,
        time: '2 days ago',
        isPinned: false,
        tags: ['tutoring', 'english', 'teaching']
      }
    ],
    travel: [
      {
        id: 22,
        title: 'Weekend Trip to Busan - Anyone want to join? 🚄',
        author: 'travel_buddy',
        university: 'Various',
        content: 'Planning a weekend trip to Busan next month. Looking for travel companions to split costs and have fun!',
        replies: 19,
        likes: 28,
        time: '12 hours ago',
        isPinned: false,
        tags: ['travel', 'busan', 'weekend']
      },
      {
        id: 23,
        title: 'Jeju Island travel guide for students 🏝️',
        author: 'jeju_explorer',
        university: 'Various',
        content: 'Complete budget travel guide to Jeju Island including cheap accommodations and must-visit spots.',
        replies: 42,
        likes: 89,
        time: '1 week ago',
        isPinned: true,
        tags: ['jeju', 'budget-travel', 'guide']
      }
    ]
  }

  const currentForum = forums.find(f => f.id === selectedForum)
  const currentPosts = allPosts[selectedForum as keyof typeof allPosts] || []
  
  const filteredPosts = currentPosts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  return (
    <div className="flex min-h-screen bg-gray-900">
      <Sidebar />
      
      <div className="flex-1 flex">
        {/* Forum Sidebar */}
        <div className="w-80 bg-gray-800 border-r border-gray-700 p-6">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-white mb-4">Forums 💬</h2>
            <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              <Plus className="w-5 h-5" />
              <span>New Post</span>
            </button>
          </div>

          <div className="space-y-2">
            {forums.map((forum) => (
              <button
                key={forum.id}
                onClick={() => setSelectedForum(forum.id)}
                className={`w-full text-left p-4 rounded-lg transition-colors ${
                  selectedForum === forum.id
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                <div className="flex items-center space-x-3 mb-2">
                  <span className="text-xl">{forum.emoji}</span>
                  <span className="font-semibold">{forum.name}</span>
                </div>
                <div className="flex items-center space-x-4 text-sm opacity-75">
                  <span>{forum.posts} posts</span>
                  <span>{forum.members} members</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center space-x-3 mb-4">
                <span className="text-3xl">{currentForum?.emoji}</span>
                <h1 className="text-3xl font-bold text-white">{currentForum?.name}</h1>
              </div>
              <p className="text-gray-400">
                {currentForum?.posts} posts • {currentForum?.members} members
              </p>
            </div>

            {/* Search */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search posts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            {/* Posts */}
            <div className="space-y-4">
              {filteredPosts.map((post) => (
                <div key={post.id} className="bg-gray-800 rounded-xl border border-gray-700 p-6 hover:border-purple-500 transition-colors">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        {post.isPinned && (
                          <Pin className="w-4 h-4 text-yellow-400" />
                        )}
                        <h3 className="text-lg font-semibold text-white hover:text-purple-400 cursor-pointer">
                          {post.title}
                        </h3>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-400 mb-3">
                        <span>by {post.author}</span>
                        <span>•</span>
                        <span>{post.university}</span>
                        <span>•</span>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{post.time}</span>
                        </div>
                      </div>
                      
                      <p className="text-gray-300 mb-4">{post.content}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <button className="flex items-center space-x-2 text-gray-400 hover:text-purple-400 transition-colors">
                            <ThumbsUp className="w-4 h-4" />
                            <span>{post.likes}</span>
                          </button>
                          <button className="flex items-center space-x-2 text-gray-400 hover:text-purple-400 transition-colors">
                            <MessageCircle className="w-4 h-4" />
                            <span>{post.replies} replies</span>
                          </button>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          {post.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-gray-700 text-gray-300 rounded-full text-xs"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <div className="text-center py-12">
                <MessageSquare className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-400 mb-2">No posts found</h3>
                <p className="text-gray-500">Try adjusting your search criteria or be the first to post!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForumPage
