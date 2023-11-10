import { instance } from './index'

const createCamp = (dto: any) => instance.post('/campaigns', dto)

const getAllCamps = () => instance.get('/campaigns/all')

const getCampById = (id: string) => instance.get(`campaigns/${id}`)

export const campaigns = {
  createCamp,
  getAllCamps,
  getCampById
}
