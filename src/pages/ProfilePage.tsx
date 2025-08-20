import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import { useAuth } from '../contexts/AuthContext'
import { 
  User, 
  Mail, 
  GraduationCap, 
  QrCode, 
  Upload, 
  Award,
  CheckCircle,
  AlertCircle,
  Camera,
  Bell,
  Calendar,
  Gift
} from 'lucide-react'

const ProfilePage: React.FC = () => {
  const { user, updateUser } = useAuth()
  const [isUploading, setIsUploading] = useState(false)

  const handleVerification = () => {
    setIsUploading(true)
    // Simulate upload process
    setTimeout(() => {
      updateUser({ isVerified: true })
      setIsUploading(false)
    }, 2000)
  }

  const badges = [
    { name: 'Early Adopter', icon: '🌟', earned: true },
    { name: 'Event Organizer', icon: '🎯', earned: false },
    { name: 'Forum Contributor', icon: '💬', earned: false },
    { name: 'Community Helper', icon: '🤝', earned: false },
    { name: 'Study Group Leader', icon: '📚', earned: false },
    { name: 'Cultural Ambassador', icon: '🌍', earned: false }
  ]

  return (
    <div className="flex min-h-screen bg-gray-900">
      <Sidebar />
      
      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-8">Profile Settings 👤</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Info Card */}
              <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
                <h2 className="text-xl font-bold text-white mb-6">Basic Information</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center">
                      <User className="w-10 h-10 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{user?.username}</h3>
                      <p className="text-gray-400">{user?.role}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3 p-4 bg-gray-700 rounded-lg">
                      <Mail className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-400">Email</p>
                        <p className="text-white">{user?.email}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 p-4 bg-gray-700 rounded-lg">
                      <GraduationCap className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-400">University</p>
                        <p className="text-white">{user?.university}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 p-4 bg-gray-700 rounded-lg">
                      <Award className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-400">Major</p>
                        <p className="text-white">{user?.major}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 p-4 bg-gray-700 rounded-lg">
                      <QrCode className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-400">QR Code</p>
                        <p className="text-white font-mono text-sm">{user?.qrCode}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Notifications Card */}
              {user?.notifications && user.notifications.length > 0 && (
                <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
                  <h2 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
                    <Bell className="w-6 h-6" />
                    <span>Recent Notifications</span>
                  </h2>
                  
                  <div className="space-y-4">
                    {user.notifications.slice(0, 5).map((notification) => (
                      <div key={notification.id} className="bg-gray-700 rounded-lg p-4 border-l-4 border-purple-500">
                        <div className="flex items-start space-x-3">
                          <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                            {notification.type === 'event_rsvp' ? (
                              <Calendar className="w-5 h-5 text-white" />
                            ) : (
                              <Bell className="w-5 h-5 text-white" />
                            )}
                          </div>
                          <div className="flex-1">
                            <h4 className="text-white font-semibold mb-1">{notification.title}</h4>
                            <p className="text-gray-300 text-sm mb-2">{notification.message}</p>
                            
                            {notification.badge && (
                              <div className="bg-yellow-900/20 border border-yellow-700 rounded-lg p-3 mb-2">
                                <div className="flex items-center space-x-2">
                                  <span className="text-lg">{notification.badge.icon}</span>
                                  <div>
                                    <p className="text-yellow-400 font-semibold text-sm">{notification.badge.name}</p>
                                    <p className="text-gray-400 text-xs">{notification.badge.description}</p>
                                  </div>
                                </div>
                              </div>
                            )}
                            
                            <p className="text-gray-500 text-xs">
                              {new Date(notification.timestamp).toLocaleDateString()} at {new Date(notification.timestamp).toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Verification Card */}
              <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
                <h2 className="text-xl font-bold text-white mb-6">Account Verification 🎓</h2>
                
                {user?.isVerified ? (
                  <div className="flex items-center space-x-3 p-4 bg-green-900/30 border border-green-700 rounded-lg">
                    <CheckCircle className="w-6 h-6 text-green-400" />
                    <div>
                      <p className="text-green-400 font-semibold">Account Verified!</p>
                      <p className="text-gray-400 text-sm">You have full access to all features</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-4 bg-yellow-900/30 border border-yellow-700 rounded-lg">
                      <AlertCircle className="w-6 h-6 text-yellow-400" />
                      <div>
                        <p className="text-yellow-400 font-semibold">Verification Required</p>
                        <p className="text-gray-400 text-sm">Upload your student ID to verify your account</p>
                      </div>
                    </div>

                    <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
                      <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-300 mb-4">Upload Student ID Photo</p>
                      <button
                        onClick={handleVerification}
                        disabled={isUploading}
                        className="flex items-center space-x-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors mx-auto disabled:opacity-50"
                      >
                        <Upload className="w-5 h-5" />
                        <span>{isUploading ? 'Uploading...' : 'Choose File'}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar Info */}
            <div className="space-y-6">
              {/* QR Code Card */}
              <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 text-center">
                <h3 className="text-lg font-bold text-white mb-4">Your QR Code 📱</h3>
                <div className="w-32 h-32 bg-white rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <QrCode className="w-20 h-20 text-gray-800" />
                </div>
                <p className="text-gray-400 text-sm">
                  Show this QR code at events for attendance tracking
                </p>
              </div>

              {/* Badges Card */}
              <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
                <h3 className="text-lg font-bold text-white mb-4">Achievement Badges 🏆</h3>
                <div className="grid grid-cols-2 gap-3">
                  {badges.map((badge, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-lg text-center ${
                        badge.earned
                          ? 'bg-purple-900/30 border border-purple-700'
                          : 'bg-gray-700 border border-gray-600 opacity-50'
                      }`}
                    >
                      <div className="text-2xl mb-1">{badge.icon}</div>
                      <p className="text-xs text-gray-300">{badge.name}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats Card */}
              <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
                <h3 className="text-lg font-bold text-white mb-4">Your Stats 📊</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Events Attended</span>
                    <span className="text-white font-semibold">12</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Forum Posts</span>
                    <span className="text-white font-semibold">8</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Connections</span>
                    <span className="text-white font-semibold">34</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Member Since</span>
                    <span className="text-white font-semibold">Jan 2024</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
