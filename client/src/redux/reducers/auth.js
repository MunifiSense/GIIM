import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    SET_LOGIN_INFO
} from "../actions/types"

const user = JSON.parse(localStorage.getItem("user"));

const initialState = user
    ? { isLoggedIn: true, user }
    : { isLoggedIn: false, user: null };

export default function (state = initialState, action){
    const {type, payload}= action;

    switch(type){
        case LOGIN_SUCCESS:
            console.log(payload);
            return{
                ...state,
                isLoggedIn: true,
                user: {
                    email: payload.email,
                    token: payload.token,
                    id: payload.id
                }
            };
        case LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                user: null
            };
        case LOGOUT:
            return{
                ...state,
                isLoggedIn: false,
                user: null
            };
        default:
            return state;
    }
}