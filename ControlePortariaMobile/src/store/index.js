import {createStore, combineReducers} from 'redux';
import userReducer from './reducer/user';

const reducers = combineReducers({
    user: userReducer,
  });
  
  const storeConfig = createStore(reducers);
  
  
  export default storeConfig;