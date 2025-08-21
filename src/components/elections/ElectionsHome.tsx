import React from 'react'
import { Vote, User, Trophy, Zap } from 'lucide-react'
import OverviewTab from './tabs/OverviewTab'
import MyRatingsTab from './tabs/MyRatingsTab'
import LeaderboardTab from './tabs/LeaderboardTab'
import { ElectionsProps } from './types'

const ElectionsHome: React.FC<ElectionsProps> = (props) => {
  const { activeTab, setActiveTab } = props

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">AGM Elections 2024 🗳️</h1>
          <p className="text-gray-400">Vote for your representatives in the Malaysian Student Association</p>
          <div className="flex items-center space-x-2 mt-2">
            <Zap className="w-4 h-4 text-purple-400" />
            <span className="text-purple-400 text-sm">Powered by NFA AI Election Evaluator</span>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex space-x-6 border-b border-gray-700">
          {[
            { id: 'overview', label: 'Overview', icon: Vote },
            { id: 'my-ratings', label: 'My Ratings', icon: User },
            { id: 'leaderboard', label: 'Leaderboard', icon: Trophy }
          ].map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-4 py-3 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-purple-500 text-purple-400'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {activeTab === 'overview' && <OverviewTab {...props} />}
      {activeTab === 'my-ratings' && <MyRatingsTab {...props} />}
      {activeTab === 'leaderboard' && <LeaderboardTab {...props} />}
    </div>
  )
}

export default ElectionsHome
