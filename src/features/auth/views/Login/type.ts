import { loginText } from '@public/locales'
import { z } from 'zod'

export type AdminInfoType = {
  username: string
  email: string
  role: string
  token: string
}

export type AdminInfoResponseType = {
  user: AdminInfoType
}

export type GetMeResponseType = {
  tokens: {
    _id: string
    token: string
  }[]
} & Exclude<AdminInfoType, 'token'>

export const LoginInputSchema = z.object({
  email: z
    .string()
    .email({ message: loginText.message.error_email })
    .min(1, { message: loginText.message.email_required }),
  password: z.string().min(1, { message: loginText.message.password_required }),
})

export type LoginInputType = z.infer<typeof LoginInputSchema>
