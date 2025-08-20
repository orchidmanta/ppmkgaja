import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import { useAuth } from '../contexts/AuthContext'
import { 
  Calendar, 
  MapPin, 
  Users, 
  Clock, 
  Plus,
  Filter,
  Search,
  Star,
  X,
  Award,
  CheckCircle
} from 'lucide-react'

const EventsPage: React.FC = () => {
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [showRSVPModal, setShowRSVPModal] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<any>(null)
  const [rsvpData, setRSVPData] = useState({
    name: '',
    email: '',
    phone: '',
    dietary: '',
    notes: ''
  })
  const { user, updateUser } = useAuth()

  const events = [
    {
      id: 1,
      title: 'Korean Language Exchange 🇰🇷',
      description: 'Practice Korean with native speakers and fellow students',
      date: '2024-01-15',
      time: '18:00',
      location: 'Hongdae Station Exit 9',
      attendees: 45,
      maxAttendees: 60,
      category: 'language',
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=250&fit=crop',
      organizer: 'PPMK Seoul Chapter',
      badge: {
        name: 'Language Explorer',
        icon: '🗣️',
        description: 'Earned by participating in language exchange events'
      }
    },
    {
      id: 2,
      title: 'PPMK Annual Gathering 🎉',
      description: 'Join us for our biggest event of the year with food, games, and networking',
      date: '2024-01-20',
      time: '14:00',
      location: 'Seoul National University',
      attendees: 120,
      maxAttendees: 150,
      category: 'social',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=250&fit=crop',
      organizer: 'PPMK Central Committee',
      badge: {
        name: 'Community Champion',
        icon: '🏆',
        description: 'Earned by attending major PPMK events'
      }
    },
    {
      id: 3,
      title: 'Study Group - Finals Prep 📚',
      description: 'Group study session for upcoming final exams',
      date: '2024-01-25',
      time: '10:00',
      location: 'Korea University Library',
      attendees: 25,
      maxAttendees: 30,
      category: 'academic',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=250&fit=crop',
      organizer: 'KU Study Circle',
      badge: {
        name: 'Study Buddy',
        icon: '📖',
        description: 'Earned by participating in study groups'
      }
    },
    {
      id: 4,
      title: 'K-Pop Dance Workshop 💃',
      description: 'Learn the latest K-Pop choreography with professional instructors',
      date: '2024-01-28',
      time: '16:00',
      location: 'Gangnam Dance Studio',
      attendees: 35,
      maxAttendees: 40,
      category: 'cultural',
      image: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400&h=250&fit=crop',
      organizer: 'PPMK Cultural Committee',
      badge: {
        name: 'Culture Enthusiast',
        icon: '🎭',
        description: 'Earned by participating in cultural activities'
      }
    },
    {
      id: 5,
      title: 'Job Fair & Career Workshop 💼',
      description: 'Meet recruiters and learn about career opportunities in Korea',
      date: '2024-02-01',
      time: '13:00',
      location: 'COEX Convention Center',
      attendees: 80,
      maxAttendees: 100,
      category: 'career',
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=250&fit=crop',
      organizer: 'PPMK Career Development',
      badge: {
        name: 'Career Builder',
        icon: '💼',
        description: 'Earned by attending career development events'
      }
    },
    {
      id: 6,
      title: 'Traditional Korean Cooking Class 🍜',
      description: 'Learn to cook authentic Korean dishes with local chefs',
      date: '2024-02-05',
      time: '15:00',
      location: 'Myeongdong Cooking Studio',
      attendees: 20,
      maxAttendees: 25,
      category: 'cultural',
      image: 'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=400&h=250&fit=crop',
      organizer: 'PPMK Food Committee',
      badge: {
        name: 'Master Chef',
        icon: '👨‍🍳',
        description: 'Earned by participating in cooking workshops'
      }
    }
  ]

  const categories = [
    { value: 'all', label: 'All Events', emoji: '🎯' },
    { value: 'social', label: 'Social', emoji: '🎉' },
    { value: 'academic', label: 'Academic', emoji: '📚' },
    { value: 'cultural', label: 'Cultural', emoji: '🎭' },
    { value: 'language', label: 'Language', emoji: '🗣️' },
    { value: 'career', label: 'Career', emoji: '💼' }
  ]

  const filteredEvents = events.filter(event => {
    const matchesFilter = filter === 'all' || event.category === filter
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const handleJoinEvent = (event: any) => {
    setSelectedEvent(event)
    setRSVPData({
      name: user?.username || '',
      email: user?.email || '',
      phone: '',
      dietary: '',
      notes: ''
    })
    setShowRSVPModal(true)
  }

  const handleRSVPSubmit = () => {
    if (selectedEvent && user) {
      // Add notification to user profile about the badge they'll earn
      const notification = {
        id: Date.now(),
        type: 'event_rsvp',
        title: `RSVP Confirmed: ${selectedEvent.title}`,
        message: `You've successfully registered for this event! Attend to earn the "${selectedEvent.badge.name}" ${selectedEvent.badge.icon} badge.`,
        badge: selectedEvent.badge,
        eventId: selectedEvent.id,
        timestamp: new Date().toISOString()
      }

      // Update user with notification (in real app, this would be sent to backend)
      const currentNotifications = user.notifications || []
      updateUser({ 
        notifications: [notification, ...currentNotifications]
      })

      setShowRSVPModal(false)
      setSelectedEvent(null)
      setRSVPData({
        name: '',
        email: '',
        phone: '',
        dietary: '',
        notes: ''
      })
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-900">
      <Sidebar />
      
      <div className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Events 📅</h1>
              <p className="text-gray-400">Discover and join PPMK community events</p>
            </div>
            <button className="flex items-center space-x-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              <Plus className="w-5 h-5" />
              <span>Create Event</span>
            </button>
          </div>

          {/* Filters and Search */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.emoji} {category.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <div key={event.id} className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden hover:border-purple-500 transition-colors">
                <div className="relative">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {categories.find(c => c.value === event.category)?.emoji} {categories.find(c => c.value === event.category)?.label}
                  </div>
                  <div className="absolute top-4 left-4 bg-yellow-600 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center space-x-1">
                    <Award className="w-4 h-4" />
                    <span>Badge</span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
                  <p className="text-gray-400 mb-4 line-clamp-2">{event.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center space-x-2 text-gray-300">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">{event.date} at {event.time}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-300">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{event.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-300">
                      <Users className="w-4 h-4" />
                      <span className="text-sm">{event.attendees}/{event.maxAttendees} attending</span>
                    </div>
                  </div>

                  {/* Badge Preview */}
                  <div className="bg-yellow-900/20 border border-yellow-700 rounded-lg p-3 mb-4">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-lg">{event.badge.icon}</span>
                      <span className="text-yellow-400 font-semibold text-sm">{event.badge.name}</span>
                    </div>
                    <p className="text-gray-400 text-xs">{event.badge.description}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">by {event.organizer}</span>
                    <button 
                      onClick={() => handleJoinEvent(event)}
                      className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-semibold"
                    >
                      Join Event
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredEvents.length === 0 && (
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-400 mb-2">No events found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </div>

      {/* RSVP Modal */}
      {showRSVPModal && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">RSVP for Event</h3>
              <button
                onClick={() => setShowRSVPModal(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="mb-6">
              <h4 className="text-lg font-semibold text-white mb-2">{selectedEvent.title}</h4>
              <div className="space-y-1 text-sm text-gray-400">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>{selectedEvent.date} at {selectedEvent.time}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>{selectedEvent.location}</span>
                </div>
              </div>
            </div>

            {/* Badge Reward Notice */}
            <div className="bg-yellow-900/20 border border-yellow-700 rounded-lg p-4 mb-6">
              <div className="flex items-center space-x-2 mb-2">
                <Award className="w-5 h-5 text-yellow-400" />
                <span className="text-yellow-400 font-semibold">Badge Reward</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{selectedEvent.badge.icon}</span>
                <div>
                  <p className="text-white font-semibold">{selectedEvent.badge.name}</p>
                  <p className="text-gray-400 text-sm">{selectedEvent.badge.description}</p>
                </div>
              </div>
              <p className="text-yellow-300 text-sm mt-2">
                ✨ Attend this event to earn this exclusive badge!
              </p>
            </div>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={rsvpData.name}
                  onChange={(e) => setRSVPData({...rsvpData, name: e.target.value})}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  value={rsvpData.email}
                  onChange={(e) => setRSVPData({...rsvpData, email: e.target.value})}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={rsvpData.phone}
                  onChange={(e) => setRSVPData({...rsvpData, phone: e.target.value})}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Dietary Restrictions
                </label>
                <input
                  type="text"
                  value={rsvpData.dietary}
                  onChange={(e) => setRSVPData({...rsvpData, dietary: e.target.value})}
                  placeholder="e.g., Vegetarian, Halal, No nuts"
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Additional Notes
                </label>
                <textarea
                  value={rsvpData.notes}
                  onChange={(e) => setRSVPData({...rsvpData, notes: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                />
              </div>
            </form>

            <div className="flex items-center space-x-3 mt-6">
              <button
                onClick={() => setShowRSVPModal(false)}
                className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleRSVPSubmit}
                disabled={!rsvpData.name || !rsvpData.email}
                className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Confirm RSVP</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default EventsPage
