import {authenticate, authlogout} from '../../services/AuthService';

import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT
} from "./types";

export const login = (response) => (dispatch) => {
    authenticate(response.tokenId)
    .then((res) => {
        // Check if first login
        // If first login, check if local data exists
        // Add local data to DB if data exists
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res
        });

        return;
    },
    (error) => {
        dispatch({
            type: LOGIN_FAIL
        });

        return;
    })
};

export const logout = () => (dispatch) => {
    authlogout();
    dispatch({
        type: LOGOUT
    });
};