import React, { useState } from 'react'
import {
  Star,
  StarHalf,
  ChatCircle,
  User,
  Calendar,
  ThumbsUp
} from 'phosphor-react'

const Review = () => {
  const [filterRating, setFilterRating] = useState('all') // all, 5, 4, 3, 2, 1

  // Mock data - replace with actual API call
  const reviews = [
    {
      id: 1,
      patientName: 'John Doe',
      patientImage: 'https://via.placeholder.com/50',
      rating: 5,
      comment: 'Excellent doctor! Very professional and caring. Explained everything clearly and made me feel comfortable.',
      date: '15 Jan 2024',
      helpful: 12
    },
    {
      id: 2,
      patientName: 'Jane Smith',
      patientImage: 'https://via.placeholder.com/50',
      rating: 5,
      comment: 'Dr. Smith is amazing! The consultation was thorough and the treatment plan was well explained.',
      date: '12 Jan 2024',
      helpful: 8
    },
    {
      id: 3,
      patientName: 'Mike Johnson',
      patientImage: 'https://via.placeholder.com/50',
      rating: 4,
      comment: 'Good experience overall. The doctor was knowledgeable and helpful.',
      date: '10 Jan 2024',
      helpful: 5
    },
    {
      id: 4,
      patientName: 'Sarah Williams',
      patientImage: 'https://via.placeholder.com/50',
      rating: 5,
      comment: 'Best doctor I have ever visited. Highly recommend!',
      date: '8 Jan 2024',
      helpful: 15
    }
  ]

  const filteredReviews = filterRating === 'all'
    ? reviews
    : reviews.filter(r => r.rating === parseInt(filterRating))

  const averageRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
  const ratingDistribution = {
    5: reviews.filter(r => r.rating === 5).length,
    4: reviews.filter(r => r.rating === 4).length,
    3: reviews.filter(r => r.rating === 3).length,
    2: reviews.filter(r => r.rating === 2).length,
    1: reviews.filter(r => r.rating === 1).length
  }

  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} size={20} className="text-yellow-400" weight="fill" />)
    }
    if (hasHalfStar) {
      stars.push(<StarHalf key="half" size={20} className="text-yellow-400" weight="fill" />)
    }
    const emptyStars = 5 - Math.ceil(rating)
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} size={20} className="text-gray-300" weight="regular" />)
    }
    return stars
  }

  return (
    <div className="m-5 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Reviews</h1>
        <p className="text-gray-500 mt-1">View patient reviews and ratings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Rating Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm sticky top-24">
            <div className="text-center mb-6">
              <div className="text-5xl font-bold text-gray-900 mb-2">{averageRating.toFixed(1)}</div>
              <div className="flex items-center justify-center gap-1 mb-2">
                {renderStars(averageRating)}
              </div>
              <p className="text-sm text-gray-500">Based on {reviews.length} reviews</p>
            </div>

            <div className="space-y-3">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-medium text-gray-700">{rating}</span>
                    <Star size={16} className="text-yellow-400" weight="fill" />
                  </div>
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-yellow-400"
                      style={{ width: `${(ratingDistribution[rating] / reviews.length) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 w-8 text-right">{ratingDistribution[rating]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reviews List */}
        <div className="lg:col-span-3 space-y-6">
          {/* Filter */}
          <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => setFilterRating('all')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  filterRating === 'all'
                    ? 'bg-[#5F6FFF] text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                All ({reviews.length})
              </button>
              {[5, 4, 3, 2, 1].map((rating) => (
                <button
                  key={rating}
                  onClick={() => setFilterRating(rating.toString())}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    filterRating === rating.toString()
                      ? 'bg-[#5F6FFF] text-white shadow-md'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {rating} Star ({ratingDistribution[rating]})
                </button>
              ))}
            </div>
          </div>

          {/* Reviews */}
          {filteredReviews.length === 0 ? (
            <div className="bg-white rounded-xl p-12 border border-gray-200 shadow-sm text-center">
              <ChatCircle size={64} className="text-gray-300 mx-auto mb-4" weight="duotone" />
              <p className="text-gray-500 font-medium text-lg">No reviews found</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredReviews.map((review) => (
                <div key={review.id} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                  <div className="flex items-start gap-4">
                    <img
                      src={review.patientImage}
                      alt={review.patientName}
                      className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-900">{review.patientName}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex items-center gap-1">
                              {renderStars(review.rating)}
                            </div>
                            <span className="text-sm text-gray-500">•</span>
                            <div className="flex items-center gap-1 text-sm text-gray-500">
                              <Calendar size={14} />
                              <span>{review.date}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-600 leading-relaxed mt-3">{review.comment}</p>
                      <div className="flex items-center gap-4 mt-4">
                        <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-[#5F6FFF] transition-colors">
                          <ThumbsUp size={16} />
                          <span>Helpful ({review.helpful})</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Review

