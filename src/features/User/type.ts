import { z } from 'zod'

export type UserType = {
  _id: string
  role: string
  username: string
  email: string
  createdAt: string
  updatedAt: string
}

export const UserSchema = z.object({
  name: z.string().optional().nullable(),
})

export type UserListType = {
  data: UserType[]
}

export type UserSearchType = z.infer<typeof UserSchema>
