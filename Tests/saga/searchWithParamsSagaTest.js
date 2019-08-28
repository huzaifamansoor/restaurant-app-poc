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
import {searchWithParamsSaga} from '../../mockData/searchWithParamsSaga';

var expect = chai.expect;
chai.use(chaiAsPromised);

const collectionId = '1'   //mock city Id 
const searchKeyword = 'test'; // search params

it('searchWithParamsSaga Testing', async () => {
    // Start up the saga tester
    const sagaTester = new SagaTester({
        initialState : INITIAL_STATE,
        reducers : reducer,
    });
    sagaTester.start(rootSaga);
 
    // Check that state was populated with initialState
    expect(sagaTester.getState()).to.deep.equal(INITIAL_STATE);
 
    //Dispatch action to get collection data    
     sagaTester.dispatch({type : ZomatoTypes.SEARCH_WITH_PARAMS, collectionId,searchKeyword});
    
    //wait for saga to change state
    await sagaTester.waitFor(ZomatoTypes.GET_SEARCH_WITH_PARAMS);

   //check state after saga runs
    expect(sagaTester.getState()).to.deep.equal({
        collections: [],
        collectionIsLoaded: false,
        cityId: '280',
        collectionId: '1',
        searchResult: [],
        searchResultLoaded: true,
        searchKeyword: '',
        restaurantId: '19133827',
        restaurantDetail: null,
        restaurantIsLoaded: false 
    });
});