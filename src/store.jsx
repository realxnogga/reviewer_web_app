import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { combineReducers } from '@reduxjs/toolkit';

import { loginReducer } from './feature/loginRegistration/loginSlice';
import { getdataReducer } from './feature/data/userdataSlice';
import { registrationReducer } from './feature/loginRegistration/registrationSlice';

const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer = combineReducers({
  GetUserDataName: getdataReducer,
  LoginSliceName: loginReducer,
  RegisterSliceName: registrationReducer,
});


const persistedReducer = persistReducer(persistConfig, rootReducer);

export const Store = configureStore({
  reducer: persistedReducer
});

export const persistor = persistStore(Store);

// import { configureStore } from '@reduxjs/toolkit';
// import { authenticationReducer } from './feature/authenticationSlice';

// export const Store = configureStore({
//   reducer: {
//     authentication: authenticationReducer
//   }
// });
