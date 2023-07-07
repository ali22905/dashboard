import { createSlice } from '@reduxjs/toolkit'
import jwt_decode from "jwt-decode";
// import 'dotenv/config';


// create a slice for every set like counterSlice usersSlice and so on
export const authenticationSlice = createSlice({
  // the name of the function
  name: 'authentication',
  // the intial of the state this is = to (state={count:0}) in the reducer file
  initialState: {
    authTokens: localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null,
    current_user: localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null,
    count: 0,
  },
  // you define the actions mixed with the reducers directly here
  reducers: {
    login: async (state, action) => {
      let entered_user = {
        username: action.payload.username,
        password: action.payload.password,
      }


      let response = await fetch(`https://dashboard-api-lnux.onrender.com/api/token/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        // you are passing the login data to the /token/ path to see if the user exist
        body: JSON.stringify(entered_user)
      })
      .catch(err => console.log('an error occurred while loging in :  ' + err.message));

      let data = await response.json()

      
      if (response.status === 200) {
        // make the authtokens = the access and refresh tokens
        state.authTokens = data
  
        // make the user = the decode of the access token (the passed user data from the backend after loging in)
        state.current_user = jwt_decode(data.access)
  
        // save tokens in the local storage as object
        window.localStorage.setItem('authTokens', JSON.stringify(data))

        window.location.reload()
      }else {
        alert('something went wrong')
      }

    },


    logout: (state) => {
      state.authTokens = null
      state.user = null
      window.localStorage.removeItem('authTokens')
      window.location.reload()
    },


    updateToken: (state, actions) => {
      state.authTokens = actions.payload.data 
      state.user(jwt_decode(actions.payload.data.access))
      window.localStorage.setItem('authTokens', JSON.stringify(actions.payload.data))
    },


    incrementByAmount: (state, action) => {
      state.count += action.payload;
    },
  },
})

export const { login, logout, updateToken, incrementByAmount } = authenticationSlice.actions
export default authenticationSlice.reducer