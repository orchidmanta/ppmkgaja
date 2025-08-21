import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import { 
  TreePine, 
  Plus, 
  Heart, 
  MessageCircle, 
  Eye,
  EyeOff,
  Send,
  Filter
} from 'lucide-react'

interface Post {
  id: number
  content: string
  likes: number
  comments: number
  time: string
  category: string
}

const BambooForestPage: React.FC = () => {
  const [newPost, setNewPost] = useState('')
  const [filter, setFilter] = useState('recent')
  const [showNewPostForm, setShowNewPostForm] = useState(false)

  const initialPosts: Post[] = [
    {
      id: 1,
      content: "Sometimes I feel like I'm the only one struggling with Korean language classes. Everyone else seems to pick it up so easily while I'm still confused about basic grammar 😭",
      likes: 23,
      comments: 8,
      time: '2 hours ago',
      category: 'academic'
    },
    {
      id: 2,
      content: "Is it just me or does anyone else feel homesick during Korean holidays? Seeing families together makes me miss Malaysia so much 🇲🇾",
      likes: 45,
      comments: 15,
      time: '4 hours ago',
      category: 'personal'
    },
    {
      id: 3,
      content: "Unpopular opinion: Some Malaysian students here act too differently when they're around Korean friends vs Malaysian friends. Just be yourself! 🤷‍♀️",
      likes: 67,
      comments: 23,
      time: '6 hours ago',
      category: 'social'
    },
    {
      id: 4,
      content: "I think I have a crush on someone in my Korean class but I'm too shy to talk to them. They probably don't even know I exist 💔",
      likes: 34,
      comments: 12,
      time: '8 hours ago',
      category: 'relationships'
    },
    {
      id: 5,
      content: "Anyone else tired of people asking 'Why did you come to Korea?' Like... maybe I just wanted to experience something different? 🙄",
      likes: 56,
      comments: 19,
      time: '12 hours ago',
      category: 'social'
    },
    {
      id: 6,
      content: "I failed my midterm exam and I'm too embarrassed to tell my parents. They have such high expectations and I don't want to disappoint them again 😞",
      likes: 78,
      comments: 31,
      time: '1 day ago',
      category: 'academic'
    },
    {
      id: 7,
      content: "Sometimes I wonder if I made the right choice coming here. The cultural differences are harder to adapt to than I expected 🤔",
      likes: 89,
      comments: 27,
      time: '1 day ago',
      category: 'personal'
    },
    {
      id: 8,
      content: "Shoutout to the Malaysian senior who helped me with my visa renewal without expecting anything in return. You're an angel! 👼",
      likes: 92,
      comments: 18,
      time: '2 days ago',
      category: 'appreciation'
    }
  ]

  const [posts, setPosts] = useState<Post[]>(initialPosts)

  const categories = [
    { value: 'recent', label: 'Most Recent', emoji: '🕐' },
    { value: 'popular', label: 'Most Popular', emoji: '🔥' },
    { value: 'academic', label: 'Academic', emoji: '📚' },
    { value: 'personal', label: 'Personal', emoji: '💭' },
    { value: 'social', label: 'Social', emoji: '👥' },
    { value: 'relationships', label: 'Relationships', emoji: '💕' },
    { value: 'appreciation', label: 'Appreciation', emoji: '🙏' }
  ]

  const detectCategory = (content: string): string => {
    const lowerContent = content.toLowerCase()
    
    if (lowerContent.includes('exam') || lowerContent.includes('study') || lowerContent.includes('class') || lowerContent.includes('grade') || lowerContent.includes('homework') || lowerContent.includes('professor') || lowerContent.includes('korean language')) {
      return 'academic'
    }
    if (lowerContent.includes('crush') || lowerContent.includes('love') || lowerContent.includes('dating') || lowerContent.includes('relationship') || lowerContent.includes('boyfriend') || lowerContent.includes('girlfriend')) {
      return 'relationships'
    }
    if (lowerContent.includes('thank') || lowerContent.includes('grateful') || lowerContent.includes('appreciate') || lowerContent.includes('shoutout') || lowerContent.includes('angel') || lowerContent.includes('helped')) {
      return 'appreciation'
    }
    if (lowerContent.includes('friend') || lowerContent.includes('people') || lowerContent.includes('social') || lowerContent.includes('community') || lowerContent.includes('group')) {
      return 'social'
    }
    
    return 'personal'
  }

  const handleSubmitPost = () => {
    if (newPost.trim()) {
      const category = detectCategory(newPost)
      const newPostObj: Post = {
        id: Date.now(), // Use timestamp as unique ID
        content: newPost.trim(),
        likes: 0,
        comments: 0,
        time: 'Just now',
        category: category
      }
      
      // Add new post to the beginning of the posts array
      setPosts(prevPosts => [newPostObj, ...prevPosts])
      
      // Reset form
      setNewPost('')
      setShowNewPostForm(false)
      
      // Show success message
      setTimeout(() => {
        const postElement = document.querySelector('[data-post-id="' + newPostObj.id + '"]')
        if (postElement) {
          postElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
          postElement.classList.add('ring-2', 'ring-green-500')
          setTimeout(() => {
            postElement.classList.remove('ring-2', 'ring-green-500')
          }, 2000)
        }
      }, 100)
    }
  }

  const handleLikePost = (postId: number) => {
    setPosts(prevPosts => 
      prevPosts.map(post => 
        post.id === postId 
          ? { ...post, likes: post.likes + 1 }
          : post
      )
    )
  }

  const filteredPosts = posts.filter(post => {
    if (filter === 'recent') return true
    if (filter === 'popular') return post.likes > 50
    return post.category === filter
  })

  const sortedPosts = filteredPosts.sort((a, b) => {
    if (filter === 'popular') return b.likes - a.likes
    return 0 // Keep original order for recent (newest first)
  })

  return (
    <div className="flex min-h-screen bg-gray-900">
      <Sidebar />
      
      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <TreePine className="w-8 h-8 text-green-400" />
              <h1 className="text-3xl font-bold text-white">대나무숲 (Bamboo Forest) 🎋</h1>
            </div>
            <p className="text-gray-400 mb-6">
              Share your thoughts anonymously. This is a safe space for honest opinions and feelings.
            </p>
            
            {/* Anonymous Notice */}
            <div className="bg-green-900/20 border border-green-700 rounded-lg p-4 mb-6">
              <div className="flex items-center space-x-2 mb-2">
                <EyeOff className="w-5 h-5 text-green-400" />
                <span className="text-green-400 font-semibold">100% Anonymous</span>
              </div>
              <p className="text-gray-300 text-sm">
                All posts are completely anonymous. No usernames, no profiles, just honest thoughts from fellow Malaysian students.
              </p>
            </div>
          </div>

          {/* New Post Button */}
          <div className="mb-6">
            {!showNewPostForm ? (
              <button
                onClick={() => setShowNewPostForm(true)}
                className="w-full flex items-center justify-center space-x-2 p-4 bg-gray-800 border-2 border-dashed border-gray-600 rounded-lg text-gray-400 hover:border-green-500 hover:text-green-400 transition-colors"
              >
                <Plus className="w-5 h-5" />
                <span>Share something anonymously...</span>
              </button>
            ) : (
              <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Share Anonymously 🤫</h3>
                <textarea
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  placeholder="What's on your mind? Remember, this is completely anonymous..."
                  className="w-full h-32 p-4 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                  maxLength={500}
                />
                <div className="flex items-center justify-between mt-4">
                  <span className="text-sm text-gray-400">
                    {newPost.length}/500 characters
                  </span>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => {
                        setShowNewPostForm(false)
                        setNewPost('')
                      }}
                      className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSubmitPost}
                      disabled={!newPost.trim() || newPost.length > 500}
                      className="flex items-center space-x-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="w-4 h-4" />
                      <span>Post Anonymously</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Filter */}
          <div className="flex items-center space-x-4 mb-6">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.emoji} {category.label}
                </option>
              ))}
            </select>
            <span className="text-sm text-gray-400">
              {sortedPosts.length} post{sortedPosts.length !== 1 ? 's' : ''}
            </span>
          </div>

          {/* Posts */}
          <div className="space-y-6">
            {sortedPosts.length === 0 ? (
              <div className="text-center py-12">
                <TreePine className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-400 mb-2">No posts yet</h3>
                <p className="text-gray-500">Be the first to share something in this category!</p>
              </div>
            ) : (
              sortedPosts.map((post) => (
                <div 
                  key={post.id} 
                  data-post-id={post.id}
                  className="bg-gray-800 rounded-xl border border-gray-700 p-6 hover:border-green-500 transition-all duration-200"
                >
                  <div className="mb-4">
                    <p className="text-gray-300 leading-relaxed">{post.content}</p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                      <button 
                        onClick={() => handleLikePost(post.id)}
                        className="flex items-center space-x-2 text-gray-400 hover:text-red-400 transition-colors"
                      >
                        <Heart className="w-5 h-5" />
                        <span>{post.likes}</span>
                      </button>
                      <button className="flex items-center space-x-2 text-gray-400 hover:text-blue-400 transition-colors">
                        <MessageCircle className="w-5 h-5" />
                        <span>{post.comments}</span>
                      </button>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="px-2 py-1 bg-gray-700 rounded-full text-xs">
                        #{post.category}
                      </span>
                      <span>{post.time}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Guidelines */}
          <div className="mt-12 bg-gray-800 rounded-xl border border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Community Guidelines 📋</h3>
            <div className="space-y-2 text-sm text-gray-400">
              <p>• Be respectful and kind to fellow students</p>
              <p>• No hate speech, discrimination, or personal attacks</p>
              <p>• Keep posts relevant to the Malaysian student experience in Korea</p>
              <p>• Don't share personal information that could identify someone</p>
              <p>• Report inappropriate content to moderators</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BambooForestPage
