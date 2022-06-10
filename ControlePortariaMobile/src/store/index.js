import {createStore, combineReducers} from 'redux';
import userReducer from './reducer/user';
import permissaoReducer from './reducer/permissao';
import colaboradorReducer from './reducer/colaborador';

const reducers = combineReducers({
    user: userReducer,
    permissao: permissaoReducer,
    colaborador: colaboradorReducer,
  });
  
  const storeConfig = createStore(reducers);
  
  
  export default storeConfig;