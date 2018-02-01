import { Frost } from '@poetapp/frost-client'
import { browserHistory } from 'react-router'
import { call, takeLatest, put } from 'redux-saga/effects'
import { Actions } from '../actions/index'

async function ChangePasswordTokenFrost(token: string, password: string) {
  const frost = new Frost({ host: '/api' })
  return await frost.changePasswordWithToken(token, password)
}

export function ChangePasswordTokenSaga() {
  return function*() {
    yield takeLatest(
      Actions.ChangePasswordToken.CHANGE_PASSWORD_TOKEN,
      ChangePasswordToken
    )
  }
}

function* ChangePasswordToken(action: any) {
  try {
    const { token, password } = action.payload
    yield put(Actions.LoadingPage.onLoadingOn())
    const data = yield call(ChangePasswordTokenFrost, token, password)
    yield put(Actions.ChangePasswordToken.onChangePasswordTokenSuccess(data))
    yield put(Actions.LoadingPage.onLoadingFull())
    browserHistory.push('/dashboard')
  } catch (e) {
    yield put(Actions.LoadingPage.onLoadingFull())
    yield put(Actions.ChangePasswordToken.onChangePasswordTokenError(e))
    // Todo: Error message in UI
  }
}
