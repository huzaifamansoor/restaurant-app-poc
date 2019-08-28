import chaiAsPromised from 'chai-as-promised';
import SagaTester from 'redux-saga-tester';
import chai from 'chai';

//import initial state
import { INITIAL_STATE } from '../../App/Redux/ZomatoRedux';
import { reducer } from '../../App/Redux/ZomatoRedux';
import { ZomatoTypes } from '../../App/Redux/ZomatoRedux'

/* ------------- Sagas ------------- */
import rootSaga from '../../App/Sagas';

//Get Mock Data
import {collections} from '../../mockData/collections';
var expect = chai.expect;
chai.use(chaiAsPromised);

//set mock cityId
const cityId = '280'   //mock city Id 

it('GetCollectionSaga Testing', async () => {
    // Start up the saga tester
    const sagaTester = new SagaTester({
        initialState : INITIAL_STATE,
        reducers : reducer,
    });
    sagaTester.start(rootSaga);
 
    // Check that state was populated with initialState
    expect(sagaTester.getState()).to.deep.equal(INITIAL_STATE);
 
    //Dispatch action to get collection data
     sagaTester.dispatch({type : ZomatoTypes.GET_COLLECTION, cityId});
    
     
    //wait for saga to change state
     await sagaTester.waitFor(ZomatoTypes.SET_COLLECTION);

     
    //check state after saga runs
    expect(sagaTester.getState()).to.deep.equal({
        collections,
        collectionIsLoaded: true,
        cityId: '280',
        collectionId: '1',
        searchResult: [],
        searchResultLoaded: false,
        searchKeyword: '',
        restaurantId: '19133827',
        restaurantDetail: null,
        restaurantIsLoaded: false
    });
});