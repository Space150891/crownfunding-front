import { StatusEnum } from "./campaigns.model"

export interface UsersModel {
  id: string
  nickname?: string
  amount: number
  campaignId: string
  status: StatusEnum
}
