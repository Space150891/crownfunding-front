import { instance } from './index'

const createUser = (dto: any) => instance.post('/users', dto)

export const users = {
  createUser,
}
