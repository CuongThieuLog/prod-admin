import { AxiosError, AxiosResponse } from 'axios'

export interface ErrorTypeResponse extends AxiosError {
  response: AxiosResponse<{
    error: string
  }>
}
