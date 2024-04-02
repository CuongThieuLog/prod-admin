import { AdminInfoResponseType, GetMeResponseType, LoginInputType } from '@/features/auth'
import request from '../config/axios'

export const login = async ({ email, password }: LoginInputType) => {
  try {
    const res = await request.post<AdminInfoResponseType>('/login', {
      email,
      password,
    })

    return res.data.user
  } catch (err) {
    throw err
  }
}

export const getMe = async () => {
  try {
    const res = await request.get<GetMeResponseType>('/user/me')

    return res.data
  } catch (err) {
    throw err
  }
}

export const logout = async () => {
  try {
    await request.post('/logout')
  } catch (error) {
    throw error
  }
}
