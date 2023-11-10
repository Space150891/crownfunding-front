import { UsersModel } from './users.model'

export enum StatusEnum {
  Active = 'active',
  Fraud = 'fraud',
  Successful = 'successful',
}

export interface CampsModel {
  id: string
  name: string
  goal: number
  balance: number
  description: string
  status: StatusEnum
  users: UsersModel[]
}
