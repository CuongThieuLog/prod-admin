import { z } from 'zod'

export type ProductType = {
  _id: string
  name: string
  price: number
  description: string
  quantity: number
  image: string
}

export const ProductSchema = z.object({
  price: z.string().optional().nullable(),
  name: z.string().optional().nullable(),
})

export type ProductSearchType = z.infer<typeof ProductSchema>

export type ProductListType = {
  data: ProductType[]
}
