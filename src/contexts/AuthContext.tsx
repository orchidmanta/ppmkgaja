import React, { createContext, useContext, useState, ReactNode } from 'react'

interface Badge {
  name: string
  icon: string
  description: string
}

interface Notification {
  id: number
  type: string
  title: string
  message: string
  badge?: Badge
  eventId?: number
  timestamp: string
}

interface User {
  id: string
  username: string
  email: string
  university: string
  major: string
  isVerified: boolean
  qrCode: string
  badges: string[]
  role: string
  notifications?: Notification[]
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  signup: (userData: any) => Promise<boolean>
  logout: () => void
  updateUser: (userData: Partial<User>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    if (email && password) {
      const mockUser: User = {
        id: '1',
        username: email.split('@')[0],
        email,
        university: 'Korea University',
        major: 'Computer Science',
        isVerified: false,
        qrCode: `QR-${Math.random().toString(36).substr(2, 9)}`,
        badges: [],
        role: 'Student',
        notifications: []
      }
      setUser(mockUser)
      return true
    }
    return false
  }

  const signup = async (userData: any): Promise<boolean> => {
    // Simulate API call
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      username: userData.username,
      email: userData.email,
      university: userData.university,
      major: userData.major,
      isVerified: false,
      qrCode: `QR-${Math.random().toString(36).substr(2, 9)}`,
      badges: [],
      role: 'Student',
      notifications: []
    }
    setUser(newUser)
    return true
  }

  const logout = () => {
    setUser(null)
  }

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...userData })
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}
