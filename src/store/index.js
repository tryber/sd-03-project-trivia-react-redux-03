/* import thunk from 'redux-thunk'; */
import { createStore } from 'redux';
import reducer from '../reducers';


const store = createStore(reducer);

export default store;
