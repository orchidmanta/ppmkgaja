import React from 'react'
import { Users, ChevronRight } from 'lucide-react'
import { ElectionsProps } from '../types'

const OverviewTab: React.FC<ElectionsProps> = ({ 
  positions, 
  setCurrentView, 
  setSelectedPosition, 
  getPositionProgress 
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {positions.map((position) => (
        <div
          key={position.id}
          className="bg-gray-800 rounded-xl border border-gray-700 p-6 hover:border-purple-500 transition-colors cursor-pointer"
          onClick={() => {
            setSelectedPosition(position)
            setCurrentView('position')
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-white">{position.title}</h3>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
          
          <p className="text-gray-400 mb-4">{position.description}</p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-purple-400" />
              <span className="text-white">{position.candidates.length} candidates</span>
            </div>
            
            {position.candidates.length > 0 && (
              <div className="text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-16 bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-purple-500 h-2 rounded-full transition-all"
                      style={{ width: `${getPositionProgress(position)}%` }}
                    />
                  </div>
                  <span className="text-gray-400">{Math.round(getPositionProgress(position))}%</span>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default OverviewTab
