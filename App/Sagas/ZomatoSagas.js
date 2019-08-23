import { call, put , select} from 'redux-saga/effects'
import ZomatoActions from '../Redux/ZomatoRedux'
import {ZomatoSelectors} from '../Redux/ZomatoRedux';

//get restaurant collection from zomato API using apisauce
export function * getCollectionSaga(api,action) {
  const data = yield select(ZomatoSelectors.getData) 
  const city_id = data.cityId  // read city Id from payload
  const response = yield call(api.getResCollection, city_id); // call Zomato API
  
  //If response is OK then update respective fields to set state.
  if (response.ok) {
    let data =  response.data;    
    data.collectionIsLoaded = true;
    data.cityId = city_id;
    yield put(ZomatoActions.setCollection(data));
  }
}

//get restaurant collection from zomato API using apisauce
export function * searchWithParamsSaga(api,action){
  const data = yield select(ZomatoSelectors.getData) //read search params from state
  const searchKeyword = data.searchKeyword;
  const collection_id = data.collectionId; //read collection_id from state
  const response = yield call(api.getSearchListWithQueryParam,{
      collection_id : collection_id,q :searchKeyword
    });
  
  if (response.ok) {
    let data =  response.data;    
    data.searchResultLoaded = true;
    yield put(ZomatoActions.getSearchWithParams(data));
  }
}

export function * searchWithoutParamsSaga(api,action){
  const data = yield select(ZomatoSelectors.getData) //read collection_id from state
  const collection_id = data.collectionId; //read collection_id from state
  const response = yield call(api.getSearchListWithOutQueryParam,{
      collection_id : collection_id
    });
  
  if (response.ok) {    
    let data =  response.data;    
    data.searchResultLoaded = true;
    yield put(ZomatoActions.getSearchWithoutParams(data));
  }
}

//get restaurant detail for specific restaurant Id
export function * getResDetailsSaga(api,action){
  const data = yield select(ZomatoSelectors.getData);
  const restaurant_id = data.restaurantId;

  const response = yield call(api.getResDetail, restaurant_id);
  console.log(response) 
  if (response.ok) {
    let data =  response.data;    
    data.restaurantIsLoaded = true;
    yield put(ZomatoActions.setRestaurantDetail(data));
  }
}



