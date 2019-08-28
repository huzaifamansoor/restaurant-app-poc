import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  //Launch Screen Actions
  getCollection : ['cityId'],
  setCollectionId : ['collectionId'],
  setRestaurantId : ['restaurantId'],
  setCityId : ['cityId'],
  getRestaurantDetail : ['restaurantId'],
  setSearchKeyword : ['searchKeyword'],
  searchWithParams : ['collectionId','searchKeyword'],
  searchWithoutParams : ['collectionId'],
  getSearchWithParams : ['searchResult'],
  getSearchWithoutParams : ['searchResult'],
  setCollection : ['collections'],
  setRestaurantDetail : ['restaurantDetail'],
})

export const ZomatoTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  collections: [],
  collectionIsLoaded : false,
  cityId : '280',

  //SearchScreen
  collectionId : '1',
  searchResult : [],
  searchResultLoaded : false,
  searchKeyword : '',

  //RestaurantDetail Screen
  restaurantId : '19133827',
  restaurantDetail : null,
  restaurantIsLoaded : false
})

/* ------------- Selectors ------------- */

export const ZomatoSelectors = {
  getData: state => state.zomato
}

/* ------------- Reducers ------------- */

export const setCollection = (state,{collections}) => {
  return state.merge(
    { collections: collections.collections, 
      collectionIsLoaded: collections.collectionIsLoaded,
      cityId : collections.cityId
    })
}

export const setCollectionId = (state, {collectionId}) => {
  return state.merge({
    collectionId
  })
}

export const setRestaurantId = (state, {restaurantId}) => {
  return state.merge({
    restaurantId,
    restaurantIsLoaded : false

  })
}

export const getSearchWithParams = (state, {searchResult}) => {
  return state.merge({
    searchResult : searchResult.restaurants,
    searchResultLoaded : searchResult.searchResultLoaded
  })
}

export const getSearchWithoutParams = (state, {searchResult}) => {
  return state.merge({
    searchResult : searchResult.restaurants,
    searchResultLoaded : searchResult.searchResultLoaded
  })
}

export const setRestaurantDetail = (state,{restaurantDetail}) => {
  return state.merge(
    { 
      restaurantDetail,
      restaurantIsLoaded: restaurantDetail.restaurantIsLoaded
    })
}

export const setSearchKeyword = (state, {searchKeyword}) => {
  return state.merge({
    searchKeyword,
    searchResultLoaded : false
  })
}
export const setCityId = (state, {cityId}) => {
  return state.merge({
    cityId,
    collectionIsLoaded : false
  })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_COLLECTION_ID] : setCollectionId,
  [Types.SET_RESTAURANT_ID] : setRestaurantId,
  [Types.SET_SEARCH_KEYWORD] :setSearchKeyword,
  [Types.GET_SEARCH_WITH_PARAMS] : getSearchWithParams,
  [Types.GET_SEARCH_WITHOUT_PARAMS] : getSearchWithoutParams,
  [Types.SET_CITY_ID] : setCityId,
  [Types.SET_COLLECTION] : setCollection,
  [Types.SET_RESTAURANT_DETAIL] : setRestaurantDetail
})
