import React from 'react'
import Sidebar from '../components/Sidebar'
import { useAuth } from '../contexts/AuthContext'
import { 
  Calendar, 
  MessageSquare, 
  Users, 
  TrendingUp,
  Bell,
  Star,
  Award
} from 'lucide-react'

const DashboardPage: React.FC = () => {
  const { user } = useAuth()

  const recentEvents = [
    {
      id: 1,
      title: 'Korean Language Exchange 🇰🇷',
      date: '2024-01-15',
      attendees: 45,
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=300&h=200&fit=crop'
    },
    {
      id: 2,
      title: 'PPMK Annual Gathering 🎉',
      date: '2024-01-20',
      attendees: 120,
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=300&h=200&fit=crop'
    },
    {
      id: 3,
      title: 'Study Group - Finals Prep 📚',
      date: '2024-01-25',
      attendees: 25,
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=300&h=200&fit=crop'
    }
  ]

  const forumActivity = [
    {
      id: 1,
      title: 'Best Korean BBQ places near SNU?',
      university: 'Seoul National University',
      replies: 23,
      time: '2 hours ago'
    },
    {
      id: 2,
      title: 'Looking for study partner - TOPIK Level 5',
      university: 'Korea University',
      replies: 8,
      time: '4 hours ago'
    },
    {
      id: 3,
      title: 'Selling textbooks - Engineering courses',
      university: 'KAIST',
      replies: 15,
      time: '6 hours ago'
    }
  ]

  return (
    <div className="flex min-h-screen bg-gray-900">
      <Sidebar />
      
      <div className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              Welcome back, {user?.username}! 👋
            </h1>
            <p className="text-gray-400">
              Here's what's happening in the PPMK community
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Events</p>
                  <p className="text-2xl font-bold text-white">24</p>
                </div>
                <Calendar className="w-8 h-8 text-purple-400" />
              </div>
            </div>

            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Forum Posts</p>
                  <p className="text-2xl font-bold text-white">156</p>
                </div>
                <MessageSquare className="w-8 h-8 text-blue-400" />
              </div>
            </div>

            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Active Members</p>
                  <p className="text-2xl font-bold text-white">542</p>
                </div>
                <Users className="w-8 h-8 text-green-400" />
              </div>
            </div>

            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Your Badges</p>
                  <p className="text-2xl font-bold text-white">{user?.badges?.length || 0}</p>
                </div>
                <Award className="w-8 h-8 text-yellow-400" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Events */}
            <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Recent Events 📅</h2>
                <button className="text-purple-400 hover:text-purple-300 text-sm">
                  View all
                </button>
              </div>

              <div className="space-y-4">
                {recentEvents.map((event) => (
                  <div key={event.id} className="flex items-center space-x-4 p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="text-white font-semibold">{event.title}</h3>
                      <p className="text-gray-400 text-sm">{event.date}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-400 text-sm">{event.attendees} attending</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Forum Activity */}
            <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Forum Activity 💬</h2>
                <button className="text-purple-400 hover:text-purple-300 text-sm">
                  View all
                </button>
              </div>

              <div className="space-y-4">
                {forumActivity.map((post) => (
                  <div key={post.id} className="p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
                    <h3 className="text-white font-semibold mb-2">{post.title}</h3>
                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <span>{post.university}</span>
                      <div className="flex items-center space-x-4">
                        <span>{post.replies} replies</span>
                        <span>{post.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8 bg-gray-800 rounded-xl border border-gray-700 p-6">
            <h2 className="text-xl font-bold text-white mb-6">Quick Actions ⚡</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="flex items-center space-x-3 p-4 bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors">
                <Calendar className="w-5 h-5 text-white" />
                <span className="text-white font-semibold">Create Event</span>
              </button>
              <button className="flex items-center space-x-3 p-4 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                <MessageSquare className="w-5 h-5 text-white" />
                <span className="text-white font-semibold">New Forum Post</span>
              </button>
              <button className="flex items-center space-x-3 p-4 bg-green-600 rounded-lg hover:bg-green-700 transition-colors">
                <Users className="w-5 h-5 text-white" />
                <span className="text-white font-semibold">Find Members</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
