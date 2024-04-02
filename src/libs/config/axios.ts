'use client'

import { getAccessTokenFromStorage } from '@/utils/localStorage'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { useEffect } from 'react'
import { useAuth } from '../context'

const request = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 60 * 1000,
})

request.interceptors.request.use(
  function (config) {
    const token = getAccessTokenFromStorage()
    config.headers.Accept = 'application/json'
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  },
)

export const AxiosInterceptor = ({ children }: any) => {
  const { handleLogout } = useAuth()

  useEffect(() => {
    const resInterceptor = (response: AxiosResponse) => {
      return response
    }

    const errInterceptor = (error: AxiosError) => {
      if (
        error.response?.status === 401 &&
        error.config?.url !== '/logout' &&
        error.config?.url !== '/login'
      ) {
        handleLogout()
      }

      return Promise.reject(error)
    }

    const interceptor = request.interceptors.response.use(resInterceptor, errInterceptor)

    return () => request.interceptors.response.eject(interceptor)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return children
}

export default request
