import { z } from 'zod'

export const OrderSchema = z.object({
  status: z.string(),
})

export type OrderBaseType = z.infer<typeof OrderSchema>
