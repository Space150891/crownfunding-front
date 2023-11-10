import { combineReducers } from '@reduxjs/toolkit'
import campaigns from './campaigns'

export const rootReducer = combineReducers({
  campaigns,
})

export type RootStore = ReturnType<typeof rootReducer>
