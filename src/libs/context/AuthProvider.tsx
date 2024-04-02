'use client'

import { AdminInfoType } from '@/features/auth'
import { getAccessTokenFromStorage, setAccessTokenToStorage } from '@/utils/localStorage'
import { useRouter } from 'next/navigation'
import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react'
import { getMe, logout } from '../api/auth'

interface AuthContextType {
  setAccessToken: Dispatch<SetStateAction<string>>
  setAdmin: Dispatch<SetStateAction<AdminInfoType | null>>
  admin: AdminInfoType | null
  loading: boolean
  handleLogout: () => void
}

const defaultValues = {
  admin: null,
  setAccessToken: () => {},
  setAdmin: () => {},
  loading: false,
  handleLogout: () => {},
}

type PropChildren = {
  children: React.ReactNode
}

const AuthContext = createContext<AuthContextType>(defaultValues)

const AuthProvider: React.FC<PropChildren> = ({ children }) => {
  const [admin, setAdmin] = useState<AdminInfoType | null>(null)
  const [loading, setLoading] = useState(true)
  const [accessToken, setAccessToken] = useState('')
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await logout()
      setAccessTokenToStorage('')
      setAdmin(null)
      router.push('/login')
    } catch (error) {
      console.log(error)
    }
  }

  const fetchAdminInfo = async () => {
    try {
      setLoading(true)
      const admin = await getMe()

      setAdmin({
        email: admin.email,
        role: admin.role,
        username: admin.username,
        token: admin.tokens[admin.tokens.length - 1].token,
      })
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!accessToken) return
  }, [accessToken])

  const handleSaveAccessToken = useCallback(async () => {
    await setAccessTokenToStorage(accessToken)
  }, [accessToken])

  useEffect(() => {
    if (!accessToken) return
    handleSaveAccessToken()
  }, [accessToken, handleSaveAccessToken])

  useLayoutEffect(() => {
    fetchAdminInfo()
    const getAccessToken = getAccessTokenFromStorage()
    if (getAccessToken) {
      setAccessToken(getAccessToken)
    }
  }, [router])

  const value = {
    admin,
    setAccessToken,
    setAdmin,
    handleLogout,
    loading,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider

export const useAuth = () => {
  return React.useContext(AuthContext)
}
