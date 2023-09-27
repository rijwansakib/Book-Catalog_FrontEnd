//!create user slice

import { auth } from "@/lib/fireBase";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth'

interface IUserState {
    email: unknown;
    user:{
        email:string | null;
        name: string | null;
    },
    isLoding:boolean,
    isError:boolean,
    error:string|null,
} 
interface ICredential{
    email:string,
    password:string
}

const initialState :IUserState ={
    user: {
        email: null,
        name: null,
    },
    isLoding: false,
    isError: false,
    error: null,
    email: undefined
}

//! async thank function

//create user using email and password
export const createUser = createAsyncThunk('user/createUser',
        async({email,password}:ICredential)=>{
            const data = await createUserWithEmailAndPassword (auth,email,password);
            return data.user.email;
    }
)
//login user using email and password
export const loginUser = createAsyncThunk('user/loginUser', // Change the action type here
        async({email,password}:ICredential)=>{
            const data = await signInWithEmailAndPassword (auth,email,password);
            return data.user.email;
    }
)

//create user with Google

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user.email = action.payload;
        },
        setLoding: (state, action) => {
            state.isLoding = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createUser.pending, (state) => {
                state.isLoding = true;
                state.isError = false;
                state.error = null;
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.user.email = action.payload;
                state.isLoding = false;
            })
            .addCase(createUser.rejected, (state, action) => {
                state.user.email = null;
                state.isError = true;
                state.isLoding = false;
                state.error = action.error.message!;
            })
            .addCase(loginUser.pending, (state) => { // Use the unique action type here
                state.isLoding = true;
                state.isError = false;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => { // Use the unique action type here
                state.user.email = action.payload;
                state.isLoding = false;
            })
            .addCase(loginUser.rejected, (state, action) => { // Use the unique action type here
                state.user.email = null;
                state.isLoding = false;
                state.isError = true;
                state.error = action.error.message!;
            });
    },
});


export const {setUser,setLoding}= userSlice.actions

export default userSlice.reducer

