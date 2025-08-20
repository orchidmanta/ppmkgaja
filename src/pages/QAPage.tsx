import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import { 
  HelpCircle, 
  Plus, 
  Search, 
  ThumbsUp, 
  MessageCircle, 
  CheckCircle,
  TrendingUp,
  Clock,
  User,
  Award
} from 'lucide-react'

const QAPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState('all')

  const questions = [
    {
      id: 1,
      title: 'How to apply for Korean student visa (D-2) from Malaysia? 🇲🇾➡️🇰🇷',
      author: 'visa_newbie',
      content: 'I got accepted to SNU but confused about the visa application process. What documents do I need and how long does it take?',
      upvotes: 89,
      answers: 12,
      time: '2 days ago',
      category: 'visa',
      isAnswered: true,
      topAnswer: {
        author: 'visa_expert_2022',
        content: 'Congratulations on your acceptance! Here\'s the complete process:\n\n1. **Required Documents:**\n   - Certificate of Admission from SNU\n   - Passport (valid for at least 6 months)\n   - Visa application form\n   - Recent passport photos\n   - Financial proof (bank statements)\n   - Health certificate\n   - Criminal background check\n\n2. **Process:**\n   - Submit at Korean Embassy in KL\n   - Processing time: 5-7 working days\n   - Fee: RM 60\n\n3. **Tips:**\n   - Apply 2-3 months before departure\n   - Bring original + photocopies\n   - Embassy opens 9AM-12PM for applications\n\nGood luck! Feel free to ask if you need more details.',
        upvotes: 156,
        time: '1 day ago',
        isAccepted: true
      }
    },
    {
      id: 2,
      title: 'Best Korean language learning apps for beginners? 📱',
      author: 'korean_beginner',
      content: 'Starting Korean from zero. Which apps do you recommend for learning Hangul and basic vocabulary?',
      upvotes: 67,
      answers: 8,
      time: '1 day ago',
      category: 'language',
      isAnswered: true,
      topAnswer: {
        author: 'polyglot_student',
        content: 'As someone who went from zero to TOPIK Level 4, here are my top recommendations:\n\n**Free Apps:**\n1. **Duolingo Korean** - Great for daily practice\n2. **Memrise** - Excellent for vocabulary\n3. **HelloTalk** - Chat with native speakers\n\n**Paid Apps (Worth it!):**\n1. **LingoDeer** - Best structured lessons\n2. **Drops** - Beautiful vocabulary learning\n\n**Pro Tips:**\n- Start with Hangul basics (2-3 days)\n- Practice writing by hand\n- Watch Korean dramas with Korean subtitles\n- Join Korean language exchange groups\n\nConsistency is key! 화이팅! 💪',
        upvotes: 134,
        time: '12 hours ago',
        isAccepted: true
      }
    },
    {
      id: 3,
      title: 'How much money should I budget per month in Seoul? 💰',
      author: 'budget_planner',
      content: 'Planning my finances for studying in Seoul. What\'s a realistic monthly budget including accommodation, food, and transportation?',
      upvotes: 123,
      answers: 15,
      time: '3 days ago',
      category: 'finance',
      isAnswered: true,
      topAnswer: {
        author: 'seoul_survivor_3years',
        content: 'Here\'s my realistic breakdown after 3 years in Seoul:\n\n**Monthly Budget (KRW):**\n\n**Accommodation:**\n- Goshiwon: 300,000-500,000\n- One-room: 500,000-800,000\n- Dormitory: 200,000-400,000\n\n**Food:**\n- Cooking at home: 200,000-300,000\n- Mix of cooking/eating out: 400,000-600,000\n- Mostly eating out: 600,000-900,000\n\n**Transportation:**\n- T-money card: 80,000-120,000\n\n**Others:**\n- Phone: 30,000-50,000\n- Utilities: 50,000-100,000\n- Entertainment: 100,000-300,000\n\n**Total: 1,000,000-2,500,000 KRW/month**\n\n**Money-saving tips:**\n- Cook Malaysian food at home\n- Use student discounts\n- Shop at traditional markets\n- Take advantage of free campus facilities',
        upvotes: 198,
        time: '2 days ago',
        isAccepted: true
      }
    },
    {
      id: 4,
      title: 'Part-time job restrictions for D-2 visa holders? 👨‍💼',
      author: 'job_seeker_2024',
      content: 'Can I work part-time with a student visa? What are the legal requirements and restrictions?',
      upvotes: 78,
      answers: 6,
      time: '5 hours ago',
      category: 'work',
      isAnswered: true,
      topAnswer: {
        author: 'immigration_helper',
        content: 'Yes, you can work part-time with D-2 visa, but there are important rules:\n\n**Legal Requirements:**\n1. **Get permission first** - Apply for "Part-time Work Permit" at immigration office\n2. **Maximum 20 hours/week** during semester\n3. **Full-time allowed** during official school breaks\n4. **No illegal jobs** - Must be legitimate employment\n\n**Application Process:**\n- Visit immigration office with:\n  - Passport & ARC\n  - Student certificate\n  - Employment contract\n  - Application form\n- Processing: 2-3 weeks\n- Fee: Free\n\n**Popular Jobs for Students:**\n- English tutoring\n- Restaurant/cafe work\n- Convenience store\n- Campus jobs\n- Translation work\n\n**Important:** Working without permission can result in visa cancellation!',
        upvotes: 145,
        time: '3 hours ago',
        isAccepted: true
      }
    },
    {
      id: 5,
      title: 'Best areas to live in Seoul for university students? 🏠',
      author: 'housing_hunter',
      content: 'Which neighborhoods are student-friendly with good transportation to major universities?',
      upvotes: 92,
      answers: 11,
      time: '1 week ago',
      category: 'housing',
      isAnswered: true,
      topAnswer: {
        author: 'seoul_local_guide',
        content: 'Great question! Here are the best student areas by university:\n\n**For SNU Students:**\n- **Gwanak-gu** (near campus) - Cheap but limited nightlife\n- **Gangnam** - Expensive but convenient\n- **Hongdae** - Fun but far from campus\n\n**For Yonsei/Hongik Students:**\n- **Hongdae** - Perfect for nightlife & culture\n- **Sinchon** - Student town atmosphere\n- **Mapo-gu** - Good balance of price/location\n\n**For Korea University:**\n- **Anam-dong** - Right next to campus\n- **Seongbuk-gu** - Quiet residential area\n\n**General Tips:**\n- Check subway accessibility\n- Consider night bus routes\n- Look for areas with universities = student discounts\n- Avoid areas too far from subway stations\n\n**Top Recommendations:**\n1. Hongdae (overall best student life)\n2. Sinchon (balanced)\n3. Near your university (convenient)',
        upvotes: 167,
        time: '5 days ago',
        isAccepted: true
      }
    },
    {
      id: 6,
      title: 'Korean university grading system - how does it work? 📊',
      author: 'grade_confused',
      content: 'Coming from Malaysian education system, I\'m confused about Korean university grading. Can someone explain?',
      upvotes: 45,
      answers: 4,
      time: '2 days ago',
      category: 'academic',
      isAnswered: false
    },
    {
      id: 7,
      title: 'Health insurance for international students in Korea? 🏥',
      author: 'health_conscious',
      content: 'Do I need to get Korean health insurance? How does it work and how much does it cost?',
      upvotes: 56,
      answers: 7,
      time: '4 days ago',
      category: 'health',
      isAnswered: true,
      topAnswer: {
        author: 'health_expert_kr',
        content: 'Health insurance is MANDATORY for all international students!\n\n**National Health Insurance (NHI):**\n- **Cost:** ~30,000 KRW/month\n- **Coverage:** 70% of medical costs\n- **Enrollment:** Automatic after 6 months residence\n\n**Before 6 months:**\n- Get private insurance from Malaysia\n- Or buy Korean travel insurance\n\n**Benefits:**\n- Cheap doctor visits (~3,000 KRW)\n- Affordable prescriptions\n- Emergency coverage\n- Dental basic coverage\n\n**How to enroll:**\n1. Get ARC (Alien Registration Card)\n2. Visit local NHI office\n3. Bring passport, ARC, student certificate\n4. Monthly payment via bank transfer\n\n**Pro tip:** Always carry your insurance card!',
        upvotes: 89,
        time: '3 days ago',
        isAccepted: true
      }
    }
  ]

  const categories = [
    { value: 'all', label: 'All Questions', emoji: '🎯' },
    { value: 'visa', label: 'Visa & Immigration', emoji: '📋' },
    { value: 'language', label: 'Language Learning', emoji: '🗣️' },
    { value: 'finance', label: 'Finance & Budget', emoji: '💰' },
    { value: 'work', label: 'Work & Jobs', emoji: '💼' },
    { value: 'housing', label: 'Housing', emoji: '🏠' },
    { value: 'academic', label: 'Academic', emoji: '📚' },
    { value: 'health', label: 'Health & Insurance', emoji: '🏥' }
  ]

  const filteredQuestions = questions.filter(question => {
    const matchesFilter = filter === 'all' || question.category === filter
    const matchesSearch = question.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         question.content.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  return (
    <div className="flex min-h-screen bg-gray-900">
      <Sidebar />
      
      <div className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Q&A Community 🤔</h1>
              <p className="text-gray-400">Get answers from experienced Malaysian students in Korea</p>
            </div>
            <button className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Plus className="w-5 h-5" />
              <span>Ask Question</span>
            </button>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search questions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.emoji} {category.label}
                </option>
              ))}
            </select>
          </div>

          {/* Questions List */}
          <div className="space-y-6">
            {filteredQuestions.map((question) => (
              <div key={question.id} className="bg-gray-800 rounded-xl border border-gray-700 p-6 hover:border-blue-500 transition-colors">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                    <HelpCircle className="w-6 h-6 text-white" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      {question.isAnswered && (
                        <CheckCircle className="w-5 h-5 text-green-400" />
                      )}
                      <h3 className="text-xl font-bold text-white hover:text-blue-400 cursor-pointer">
                        {question.title}
                      </h3>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-400 mb-3">
                      <span>by {question.author}</span>
                      <span>•</span>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{question.time}</span>
                      </div>
                      <span>•</span>
                      <span className="px-2 py-1 bg-gray-700 rounded-full text-xs">
                        #{question.category}
                      </span>
                    </div>
                    
                    <p className="text-gray-300 mb-4">{question.content}</p>
                    
                    {/* Top Answer Preview */}
                    {question.topAnswer && (
                      <div className="bg-gray-700 rounded-lg p-4 mb-4 border-l-4 border-green-400">
                        <div className="flex items-center space-x-2 mb-2">
                          <Award className="w-4 h-4 text-green-400" />
                          <span className="text-green-400 font-semibold text-sm">Top Answer</span>
                          <span className="text-gray-400 text-sm">by {question.topAnswer.author}</span>
                        </div>
                        <p className="text-gray-300 text-sm line-clamp-3 whitespace-pre-line">
                          {question.topAnswer.content}
                        </p>
                        <div className="flex items-center space-x-4 mt-2">
                          <div className="flex items-center space-x-1 text-green-400">
                            <ThumbsUp className="w-4 h-4" />
                            <span className="text-sm">{question.topAnswer.upvotes}</span>
                          </div>
                          <span className="text-gray-500 text-xs">{question.topAnswer.time}</span>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-6">
                        <button className="flex items-center space-x-2 text-gray-400 hover:text-blue-400 transition-colors">
                          <ThumbsUp className="w-5 h-5" />
                          <span>{question.upvotes}</span>
                        </button>
                        <button className="flex items-center space-x-2 text-gray-400 hover:text-blue-400 transition-colors">
                          <MessageCircle className="w-5 h-5" />
                          <span>{question.answers} answers</span>
                        </button>
                      </div>
                      
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredQuestions.length === 0 && (
            <div className="text-center py-12">
              <HelpCircle className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-400 mb-2">No questions found</h3>
              <p className="text-gray-500">Try adjusting your search criteria or be the first to ask!</p>
            </div>
          )}

          {/* FAQ Section */}
          <div className="mt-12 bg-gray-800 rounded-xl border border-gray-700 p-6">
            <h3 className="text-xl font-bold text-white mb-4">Popular Topics 🔥</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {categories.slice(1).map((category) => (
                <button
                  key={category.value}
                  onClick={() => setFilter(category.value)}
                  className="p-3 bg-gray-700 rounded-lg text-center hover:bg-gray-600 transition-colors"
                >
                  <div className="text-2xl mb-1">{category.emoji}</div>
                  <p className="text-sm text-gray-300">{category.label}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QAPage
