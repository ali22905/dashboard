import { configureStore  } from '@reduxjs/toolkit'  
import authenticationSlice from './authenticationSlice'


const store = configureStore({
  // we type here the data that was inside the combined reducer in the reducers/index.js file
  reducer: {
    authentication: authenticationSlice,
  }
})



export default store