import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  //Launch Screen Actions
  getCollection : ['collections'],
  setCollectionId : ['collectionId'],
  setRestaurantId : ['restaurantId'],
  getSearchResult : ['searchResult'],
  getRestaurantDetail : ['restaurantDetail'],
  setSearchKeyword : ['searchKeyword']
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
  restaurantId : '1080',
  restaurantDetail : null
})

/* ------------- Selectors ------------- */

export const ZomatoSelectors = {
  getData: state => state.zomato
}

/* ------------- Reducers ------------- */

export const getCollection = (state,{collections}) => {
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
    restaurantId
  })
}

export const getSearchResult = (state, {searchResult}) => {
  return state.merge({
    searchResult : searchResult.restaurants,
    searchResultLoaded : searchResult.searchResultLoaded
  })
}

export const getRestaurantDetail = (state,{restaurantDetail}) => {
  return state.merge(
    { 
      restaurantDetail,
      restaurantIsLoaded: restaurantDetail.restaurantIsLoaded
    })
}

export const setSearchKeyword = (state, {searchKeyword}) => {
  return state.merge({
    searchKeyword
  })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_COLLECTION] :getCollection,
  [Types.SET_COLLECTION_ID] : setCollectionId,
  [Types.GET_SEARCH_RESULT] : getSearchResult,
  [Types.SET_RESTAURANT_ID] : setRestaurantId,
  [Types.GET_RESTAURANT_DETAIL] : getRestaurantDetail,
  [Types.SET_SEARCH_KEYWORD] :setSearchKeyword
})
