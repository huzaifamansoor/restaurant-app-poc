import { call, put , select} from 'redux-saga/effects'
import ZomatoActions from '../Redux/ZomatoRedux'
import {ZomatoSelectors} from '../Redux/ZomatoRedux';

//get restaurant collection from zomato API using apisauce
export function * getCollectionSaga(api,action) {
  const city_id = action.collections;   // read city Id from payload
  const response = yield call(api.getResCollection, city_id); // call Zomato API
  
  //If response is OK then update respective fields to set state.
  if (response.ok) {
    let data =  response.data;    
    data.collectionIsLoaded = true;
    data.cityId = city_id;
    yield put(ZomatoActions.getCollection(data));
  }
}

//get restaurant collection from zomato API using apisauce
export function * getSearchResultSaga(api,action){  
  let response;
  let q = yield select(ZomatoSelectors.getData).searchKeyword; //read search params from state
  const collection_id = yield select(ZomatoSelectors.getData).collectionId; //read collection_id from state

  if(q !== ''){

    //call api function to get searchList with query params.
    response = yield call(api.getSearchListWithQueryParam,{
      collection_id : collection_id,q :q
    });
  }
  else{
    //call api function to get searchList with out query params.
    response = yield call(api.getSearchListWithOutQueryParam,collection_id);    
  }
  if (response.ok) {    
    let data =  response.data;    
    data.searchResultLoaded = true;
    yield put(ZomatoActions.getSearchResult(data));
  }

  return;
}

//get restaurant detail for specific restaurant Id
export function * getResDetailsSaga(api,action){
  const restaurant_id = action.restaurantDetail;  
  const response = yield call(api.getResDetail, restaurant_id);
  
  if (response.ok) {
    let data =  response.data;    
    data.restaurantIsLoaded = true;
    yield put(ZomatoActions.getRestaurantDetail(data));
  }
}



