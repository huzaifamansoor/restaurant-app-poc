import { call, put , select} from 'redux-saga/effects'
import ZomatoActions from '../Redux/ZomatoRedux'
import {ZomatoSelectors} from '../Redux/ZomatoRedux';

//get restaurant collection from zomato API using apisauce
export function * getCollectionSaga(api,action) {
 
  const city_id = action.cityId;
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
  const searchKeyword = action.searchKeyword;
  const collection_id = action.collectionId; //read collection_id from state

  console.log(action)
  const response = yield call(api.getSearchListWithQueryParam,{
      collection_id : collection_id,q :searchKeyword
    });
  if (response.ok) {
    let data =  response.data;    
    data.searchResultLoaded = true;
    yield put(ZomatoActions.getSearchWithParams(data));
  }
}

//Search Restaurant Without Params
export function * searchWithoutParamsSaga(api,action){
  
  const collection_id = action.collectionId;
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
  const restaurant_id = action.restaurantId;
  const response = yield call(api.getResDetail, restaurant_id);
  if (response.ok) {
    let data =  response.data;    
    data.restaurantIsLoaded = true;
    yield put(ZomatoActions.setRestaurantDetail(data));
  }
}



