import axios from 'axios'
import { users } from './users'
import { campaigns } from './campaigns'

export const instance = axios.create({
  baseURL: 'http://localhost:3001/',
})

export const api = {
  users,
  campaigns,
}
