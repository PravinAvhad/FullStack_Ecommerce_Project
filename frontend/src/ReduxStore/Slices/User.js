import { createSlice } from "@reduxjs/toolkit";

const User = createSlice({
    name: "User",
    initialState: { user: {} },
    reducers: {
        loginRequest(state, action) {
            return {
                ...state,
                loading: true,
                isAuthenticated: false
            }
        },
        loginSuccess(state, action) {
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload
            }
        },
        loginFail(state, action) {
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload
            }
        },
        clearError(state, action) {
            return {
                ...state,
                error: null
            }
        },
        registerRequest(state, action) {
            return {
                ...state,
                loading: true,
                isAuthenticated: false
            }
        },
        registerSuccess(state, action) {
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload
            }
        },
        registerFail(state, action) {
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload
            }
        },
        loadUserRequest(state, action) {
            return {
                ...state,
                loading: true,
                isAuthenticated:false
            }
        },
        loadUserSuccess(state, action) {
            return {
                ...state,
                loading: false,
                user: action.payload,
                isAuthenticated: true,
            }
        },
        loadUserFail(state, action) {
            return {
                loading: false,
                user: null,
                loadusererror: action.payload,
                isAuthenticated: false,
            }
        },
        logoutUserSuccess(state, action) {
            return {
                loading: false,
                user: null,
                isAuthenticated: false,
            }
        },
        logoutUserFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        }
    }
})
export default User.reducer;
export const { loginRequest, loginSuccess, loginFail, clearError, registerRequest, registerSuccess, registerFail, loadUserRequest, loadUserSuccess, loadUserFail,logoutUserSuccess,logoutUserFail } = User.actions;