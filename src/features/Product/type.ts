import { z } from 'zod'

export type ProductType = {
  _id: string
  name: string
  price: number
  cost: number
  description: string
  quantity: number
  image: string
}

export const ProductSchema = z.object({
  name: z.string().optional().nullable(),
})

export const ProductCreateSchema = z.object({
  price: z.string().min(1, {
    message: 'Giá sản phẩm không được để trống',
  }),
  name: z.string().min(1, {
    message: 'Tên sản phẩm không được để trống',
  }),
  description: z.string().min(1, {
    message: 'Mô tả sản phẩm không được để trống',
  }),
  quantity: z.string().min(1, {
    message: 'Số lượng sản phẩm không được để trống',
  }),
  image: z.string().min(1, {
    message: 'Hình ảnh sản phẩm không được để trống',
  }),
  categoryId: z.string().min(1, {
    message: 'Danh mục sản phẩm không được để trống',
  }),
  cost: z.string().min(1, {
    message: 'Giá nhập sản phẩm không được để trống',
  }),
})

export const ProductUpdateSchema = z
  .object({
    id: z.string(),
  })
  .merge(ProductCreateSchema)

export type ProductSearchType = z.infer<typeof ProductSchema>

export type ProductListType = {
  data: ProductType[]
}

export type ProductCreateType = z.infer<typeof ProductCreateSchema>
export type ProductUpdateType = z.infer<typeof ProductUpdateSchema>

export type ProductDetailType = {
  data: ProductCreateType
}
