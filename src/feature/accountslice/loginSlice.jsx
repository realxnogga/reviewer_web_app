import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const LoginSlice = createSlice({
    name: 'LoginSliceName',
    initialState: {
        isLogged: null,
      },
      reducers: {
        clearLoginState: (state) => {
          state.isLogged = null;
        },
    
      },
      extraReducers: builder => {
        builder
          .addCase(LoginThunk.fulfilled, (state, action) => {
            state.isLogged = action.payload;
           
          })
      }
})

export const { clearLoginState } = LoginSlice.actions;
export const loginReducer = LoginSlice.reducer;
export const loginCookieTemp = state => state.LoginSliceName.isLogged;

export const LoginThunk = createAsyncThunk(
    'LoginSliceName/LoginThunk',
    async (passedLoginCredentials) => {
      try {
        const res = await fetch('http://localhost/simple_web_in_react/server/register.php?action=checkExist', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(passedLoginCredentials),
        });
        const data = await res.json();
        return data.success; // equals true
      } catch (error) {
        console.log('Error', error);
      }
    }
  );