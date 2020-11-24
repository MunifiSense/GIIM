import {authenticate} from '../../services/AuthService';

import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    SET_LOGIN_INFO
} from "./types"

export const login = (response) => (dispatch) => {
    authenticate(response.tokenId)
    .then((res) => {
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

    dispatch({
        type: LOGOUT,
    });
};