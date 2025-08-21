import React from 'react'
import { Star } from 'lucide-react'
import { ElectionsProps, Rating } from '../types'

const MyRatingsTab: React.FC<ElectionsProps> = ({ positions, userRatings }) => {
  const skillLabels = {
    communication: 'Communication',
    leadership: 'Leadership',
    problemSolving: 'Problem Solving',
    participation: 'Participation',
    integrity: 'Integrity'
  }

  const renderStarRating = (value: number) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 ${
              star <= value
                ? 'text-yellow-400 fill-yellow-400'
                : 'text-gray-400'
            }`}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {userRatings.length === 0 ? (
        <div className="text-center py-12">
          <Star className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-400 mb-2">No ratings yet</h3>
          <p className="text-gray-500">Start rating candidates to see your reviews here</p>
        </div>
      ) : (
        userRatings.map((rating) => {
          const candidate = positions.flatMap(p => p.candidates).find(c => c.id === rating.candidateId)
          if (!candidate) return null
          
          const avgRating = Object.values(rating.rating).reduce((a, b) => a + b, 0) / 5
          
          return (
            <div key={rating.candidateId} className="bg-gray-800 rounded-xl border border-gray-700 p-6">
              <div className="flex items-start space-x-4">
                <img
                  src={candidate.photo}
                  alt={candidate.fullName}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white">{candidate.fullName}</h3>
                  <p className="text-gray-400">{candidate.year} • {candidate.major}</p>
                  
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-5 gap-4">
                    {Object.entries(rating.rating).map(([skill, value]) => (
                      <div key={skill} className="text-center">
                        <p className="text-sm text-gray-400 mb-1">{skillLabels[skill as keyof Rating]}</p>
                        {renderStarRating(value)}
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                      <span className="text-white font-semibold">{avgRating.toFixed(1)}</span>
                    </div>
                  </div>
                  
                  {rating.comment && (
                    <div className="mt-4 p-3 bg-gray-700 rounded-lg">
                      <p className="text-gray-300">{rating.comment}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        })
      )}
    </div>
  )
}

export default MyRatingsTab
