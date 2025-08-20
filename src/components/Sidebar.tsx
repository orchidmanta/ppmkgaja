import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { 
  Home, 
  Calendar, 
  MessageSquare, 
  User, 
  Users, 
  TreePine,
  LogOut,
  Sparkles,
  HelpCircle,
  Vote
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

const Sidebar: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/dashboard' },
    { icon: Calendar, label: 'Events 📅', path: '/events' },
    { icon: MessageSquare, label: 'Forum 💬', path: '/forum' },
    { icon: TreePine, label: '대나무숲 🎋', path: '/bamboo-forest' },
    { icon: Vote, label: 'AGM Elections 🗳️', path: '/elections' },
    { icon: HelpCircle, label: 'Q&A 🤔', path: '/qa' },
    { icon: User, label: 'Profile 👤', path: '/profile' },
  ]

  return (
    <div className="w-64 bg-gray-800 min-h-screen p-4 border-r border-gray-700 flex flex-col">
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-2">
          <Sparkles className="w-8 h-8 text-purple-400" />
          <h1 className="text-xl font-bold text-white">PPMK가자</h1>
        </div>
        <p className="text-gray-400 text-sm">Malaysian Students in Korea</p>
      </div>

      <nav className="space-y-2 flex-1">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.path
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="mt-auto">
        <button
          onClick={handleLogout}
          className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-red-600 hover:text-white transition-colors w-full"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout 🚪</span>
        </button>
      </div>
    </div>
  )
}

export default Sidebar
