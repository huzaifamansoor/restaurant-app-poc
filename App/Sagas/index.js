import { takeLatest, all,takeEvery } from 'redux-saga/effects'
import API from '../Services/Api'
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
import { GithubTypes } from '../Redux/GithubRedux'
import { ZomatoTypes } from '../Redux/ZomatoRedux'

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { getUserAvatar } from './GithubSagas'
import { 
  getCollectionSaga,
  getSearchResultSaga,
  getResDetailsSaga
} from './ZomatoSagas'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),
    

    // some sagas receive extra parameters in addition to an action
    takeLatest(GithubTypes.USER_REQUEST, getUserAvatar, api),
    takeLatest(ZomatoTypes.GET_COLLECTION, getCollectionSaga, api),
    takeLatest(ZomatoTypes.GET_SEARCH_RESULT, getSearchResultSaga, api),
    takeLatest(ZomatoTypes.GET_RESTAURANT_DETAIL, getResDetailsSaga, api)
    
  ])
}
