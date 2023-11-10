import { all, fork } from 'redux-saga/effects'
import campaigns from './campaigns/saga'

const allSagas = function* () {
    yield all([
      fork(campaigns),
    ])
  }
  
  export default allSagas
  