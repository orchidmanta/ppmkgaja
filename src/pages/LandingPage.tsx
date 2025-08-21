import React from 'react'
import { Link } from 'react-router-dom'
import { 
  Users, 
  Calendar, 
  MessageSquare, 
  Award, 
  MapPin, 
  Sparkles,
  ArrowRight,
  Star
} from 'lucide-react'

const LandingPage: React.FC = () => {
  const features = [
    {
      icon: Users,
      title: 'Connect with Fellow Students 🤝',
      description: 'Build lasting friendships with Malaysian students across South Korea'
    },
    {
      icon: Calendar,
      title: 'Event Management 📅',
      description: 'Stay updated with PPMK events, workshops, and cultural activities'
    },
    {
      icon: MessageSquare,
      title: 'University Forums 💬',
      description: 'Join discussions specific to your university and academic interests'
    },
    {
      icon: Award,
      title: 'Achievement Badges 🏆',
      description: 'Earn recognition for your participation and contributions'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* Header */}
      <header className="relative z-10 px-6 py-4">
        <nav className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-8 h-8 text-purple-400" />
            <span className="text-2xl font-bold text-white">PPMK가자</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              to="/login"
              className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Sign Up
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative px-6 py-20">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <img
              src="https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=200&h=200&fit=crop&crop=face"
              alt="PPMK Logo"
              className="w-24 h-24 rounded-full mx-auto mb-6 border-4 border-purple-400"
            />
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              PPMK<span className="text-purple-400">가자</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Connecting Malaysian students across South Korea's universities 🇲🇾🇰🇷
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16">
            <Link
              to="/signup"
              className="flex items-center space-x-2 px-8 py-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-lg font-semibold"
            >
              <span>Join PPMK가자</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/login"
              className="flex items-center space-x-2 px-8 py-4 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors text-lg"
            >
              <span>Already a member?</span>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-400 mb-2">500+</div>
              <div className="text-gray-300">Active Members</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-400 mb-2">50+</div>
              <div className="text-gray-300">Universities</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-400 mb-2">100+</div>
              <div className="text-gray-300">Events Hosted</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-20 bg-gray-800/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-16">
            Why Join PPMK가자? ✨
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div
                  key={index}
                  className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-purple-500 transition-colors"
                >
                  <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400">
                    {feature.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">
                Join Our Growing Community 🌟
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                From Seoul National University to KAIST, connect with Malaysian students 
                studying across South Korea's top institutions.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <span className="text-gray-300">University-specific forums</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <span className="text-gray-300">Student business marketplace</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <span className="text-gray-300">Anonymous opinion sharing</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <span className="text-gray-300">QR-based event attendance</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&h=400&fit=crop"
                alt="Students studying together"
                className="rounded-xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-purple-600/20 rounded-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Connect? 🚀
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Join hundreds of Malaysian students already part of our community
          </p>
          <Link
            to="/signup"
            className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-purple-600 rounded-lg hover:bg-gray-100 transition-colors text-lg font-semibold"
          >
            <span>Get Started Today</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 bg-gray-900 border-t border-gray-800">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Sparkles className="w-6 h-6 text-purple-400" />
            <span className="text-xl font-bold text-white">PPMK가자</span>
          </div>
          <p className="text-gray-400 mb-4">
            Persatuan Pelajar Malaysia Korea - Connecting Malaysian students in South Korea
          </p>
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
            <MapPin className="w-4 h-4" />
            <span>Seoul, South Korea 🇰🇷</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
