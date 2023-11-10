import { all, put, takeLatest, call } from 'redux-saga/effects'
import {
  getAllCampsSuccess,
  getAllCampsError,
  getCampByIdSuccess,
  getCampByIdError,
  createCampSuccess,
  createCampError,
  createDonationRequest,
  createDonationSuccess,
  createDonationError,
} from './index'
import { api } from '@app/api/index'

function* getAllCampsWorker(): Generator {
  try {
    const camps = yield call(api.campaigns.getAllCamps)
    yield put(getAllCampsSuccess(camps))
  } catch (error) {
    yield put(getAllCampsError())
  }
}

function* getCampByIdWorker(action: any): Generator {
  const { payload: id } = action
  try {
    const camp = yield call(api.campaigns.getCampById, id)
    yield put(getCampByIdSuccess(camp))
  } catch (error) {
    yield put(getCampByIdError())
  }
}

function* createCampWorker(action: any): Generator {
  const { name, description, goal } = action.payload
  try {
    const camp = yield call(api.campaigns.createCamp, { name, description, goal })
    yield put(createCampSuccess(camp))
  } catch (error) {
    yield put(createCampError())
  }
}

function* createDonation(action: any): Generator {
  const { nickname, amount, campaignId } = action.payload
  try {
    yield call(api.users.createUser, { nickname, amount, campaignId })
    yield put(createDonationSuccess())
  } catch (error) {
    yield put(createDonationError())
  }
}

function* campsSaga() {
  yield all([
    takeLatest('campaign/getAllCampsRequest', getAllCampsWorker),
    takeLatest('campaign/getCampByIdRequest', getCampByIdWorker),
    takeLatest('campaign/createCampRequest', createCampWorker),
    takeLatest('campaign/createDonationRequest', createDonation),
  ])
}

export default campsSaga
