import React, { createContext, useContext, useEffect, useState } from 'react'
import { User, Session, AuthError } from '@supabase/supabase-js'
import { supabase, Profile } from '../lib/supabaseClient'

interface AuthContextType {
  user: User | null
  profile: Profile | null
  session: Session | null
  loading: boolean
  signUp: (email: string, password: string) => Promise<{ error: AuthError | null }>
  signIn: (email: string, password: string) => Promise<{ error: AuthError | null }>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<{ error: AuthError | null }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    // During hot reloading, context might be temporarily undefined
    // Return a loading state instead of throwing immediately
    if (process.env.NODE_ENV === 'development') {
      return {
        user: null,
        profile: null,
        session: null,
        loading: true,
        signUp: async () => ({ error: null }),
        signIn: async () => ({ error: null }),
        signOut: async () => {},
        resetPassword: async () => ({ error: null })
      }
    }
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  // Fetch user profile from the profiles table
  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) {
        console.error('Error fetching profile:', error)
        return null
      }

      return data as Profile
    } catch (error) {
      console.error('Error fetching profile:', error)
      return null
    }
  }

  // Create profile in profiles table after signup
  const createProfile = async (user: User) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .insert({
          id: user.id,
          email: user.email!,
          full_name: user.user_metadata?.full_name || '',
          is_premium: false,
          quota_remaining: 15 // Default free tier quota
        })

      if (error) {
        console.error('Error creating profile:', error)
      }
    } catch (error) {
      console.error('Error creating profile:', error)
    }
  }

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession()
      .then(({ data, error }) => {
        if (error) {
          console.error('getSession error:', error)
        }
        const { session } = data
        setSession(session)
        setUser(session?.user ?? null)
        
        if (session?.user) {
          console.log('session.user getSession', session.user)
          fetchProfile(session.user.id).then(setProfile)
        }
        
        setLoading(false)
      })
      .catch((err) => console.log('getSession promise rejection:', err))

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
      
      if (session?.user) {
        // Fetch profile, and create one if it doesn't exist
        let userProfile = await fetchProfile(session.user.id)
        
        // If no profile exists, create one (handles both signup and missing profiles)
        if (!userProfile) {
          await createProfile(session.user)
          userProfile = await fetchProfile(session.user.id)
        }
        
        setProfile(userProfile)
      } else {
        setProfile(null)
      }
      
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signUp = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    })
    
    return { error }
  }

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    
    return { error }
  }

  const signOut = async () => {
    try {
      const result = await supabase.auth.signOut()
      if (result.error) {
        console.error('signOut error:', result.error)
      }
    } catch (err) {
      console.error('signOut exception:', err)
    }
  }

  const resetPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email)
    return { error }
  }

  const value = {
    user,
    profile,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    resetPassword,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
} 