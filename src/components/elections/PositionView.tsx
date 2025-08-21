import React from 'react'
import { ArrowLeft } from 'lucide-react'
import OverviewTab from './tabs/OverviewTab'
import MyRatingsTab from './tabs/MyRatingsTab'
import LeaderboardTab from './tabs/LeaderboardTab'
import { ElectionsProps } from './types'

const PositionView: React.FC<ElectionsProps> = (props) => {
  const {
    selectedPosition,
    activeTab,
    setCurrentView,
    setActiveTab
  } = props

  if (!selectedPosition) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">No position selected</p>
        <button
          onClick={() => setCurrentView('home')}
          className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          Back to Home
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setCurrentView('home')}
            className="p-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-white">{selectedPosition.title}</h1>
            <p className="text-gray-400">{selectedPosition.description}</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 mb-8 bg-gray-800 rounded-lg p-1">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex-1 px-6 py-3 rounded-md font-medium transition-colors ${
            activeTab === 'overview'
              ? 'bg-purple-600 text-white'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab('my-ratings')}
          className={`flex-1 px-6 py-3 rounded-md font-medium transition-colors ${
            activeTab === 'my-ratings'
              ? 'bg-purple-600 text-white'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          My Ratings
        </button>
        <button
          onClick={() => setActiveTab('leaderboard')}
          className={`flex-1 px-6 py-3 rounded-md font-medium transition-colors ${
            activeTab === 'leaderboard'
              ? 'bg-purple-600 text-white'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          🔥 Live Rankings
        </button>
      </div>

      {/* Tab Content */}
      <div className="min-h-[600px]">
        {activeTab === 'overview' && <OverviewTab {...props} />}
        {activeTab === 'my-ratings' && <MyRatingsTab {...props} />}
        {activeTab === 'leaderboard' && <LeaderboardTab {...props} />}
      </div>
    </div>
  )
}

export default PositionView
