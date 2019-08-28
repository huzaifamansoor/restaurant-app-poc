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
import {restaurantDetail} from '../../mockData/restaurantDetail';

var expect = chai.expect;
chai.use(chaiAsPromised);

//set mock restaurantId
const restaurantId = '19133827';

it('GetRestaurantDetailSaga Testing', async () => {
    // Start up the saga tester
    const sagaTester = new SagaTester({
        initialState : INITIAL_STATE,
        reducers : reducer,
    });
    sagaTester.start(rootSaga);
 
    // Check that state was populated with initialState    
    expect(sagaTester.getState()).to.deep.equal(INITIAL_STATE); 

    //Dispatch action to get collection data
    sagaTester.dispatch({type : ZomatoTypes.GET_RESTAURANT_DETAIL,restaurantId});

    //wait for saga to change state
    await sagaTester.waitFor(ZomatoTypes.SET_RESTAURANT_DETAIL);
    
    //check state after saga runs
    expect(sagaTester.getState()).to.deep.equal({

        collections: [],
        collectionIsLoaded: false,
        cityId: '280',
        collectionId: '1',
        searchResult: [],
        searchResultLoaded: false,
        searchKeyword: '',
        restaurantId: '19133827',
        restaurantDetail,
        "restaurantIsLoaded": true
    });
})
