import { z } from 'zod'

export type CategoryType = {
  _id: string
  name: string
  description: string
}

export type CategoryListType = {
  data: CategoryType[]
}

export const CategoryCreateSchema = z.object({
  name: z.string().min(1, {
    message: 'Tên danh mục sản phẩm không được để trống',
  }),
  description: z.string().min(1, {
    message: 'Mô tả danh mục sản phẩm không được để trống',
  }),
})

export type CategoryCreateType = z.infer<typeof CategoryCreateSchema>

export type CategorySearchType = {
  name: string
}

export type CategoryDetailType = {
  data: CategoryType
}
