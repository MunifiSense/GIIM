import {authenticate} from '../../services/AuthService';
import {addUserCharacter, getAllCharacters, getUserCharacters, updateUserCharacter, removeUserCharacter} from "../../services/CharacterService";
import {addUserItems, getAllItems, getUserItems, updateUserItem} from "../../services/ItemService";
import {addUserWeapon, getAllWeapons, getUserWeapons, updateUserWeapon, removeUserWeapon} from "../../services/WeaponService";

import {
    UPDATE_CHARACTER_DATA,
    GET_ITEM_DATA,
    GET_USERCHARACTER_DATA,
    GET_USERITEM_DATA,
    GET_USERWEAPON_DATA,
    UPDATE_USERWEAPON_DATA,
    GET_WEAPON_DATA,
    GET_CHARACTER_DATA_FAIL,
    GET_ITEM_DATA_FAIL,
    GET_USERCHARACTER_DATA_FAIL,
    GET_USERITEM_DATA_FAIL,
    GET_USERWEAPON_DATA_FAIL,
    GET_WEAPON_DATA_FAIL,
    UPDATE_USERCHARACTER_DATA
} from "./types";

const set = require('set-value');

export function getCharacterData(){
    return (dispatch) => {
        getAllCharacters()
        .then((res) => {
            dispatch({
                type: UPDATE_CHARACTER_DATA,
                payload: res.data
            });
        });
    }  
};

export const getWeaponData = () => (dispatch) => {
    getAllWeapons()
    .then((res) => {
        dispatch({
            type: GET_WEAPON_DATA,
            payload: res.data
        });

        return;
    },
    (error) => {
        dispatch({
            type: GET_WEAPON_DATA_FAIL
        });

        return;
    })
};

export const getItemData = () => (dispatch) => {
    getAllItems()
    .then((res) => {
        dispatch({
            type: GET_ITEM_DATA,
            payload: res.data
        });

        return;
    },
    (error) => {
        dispatch({
            type: GET_ITEM_DATA_FAIL
        });

        return;
    })
};

export const getUserItemData = () => (dispatch) => {
    getUserItems()
    .then((res) => {
        dispatch({
            type: GET_USERITEM_DATA,
            payload: res.data
        });

        return;
    },
    (error) => {
        dispatch({
            type: GET_USERITEM_DATA_FAIL
        });

        return;
    })
};

export const getUserItemDataNotSignedIn = () => (dispatch) => {
    getAllItems()
    .then((res) => {
        res.data.forEach(element => {
            element.Users = [];
            set(element.Users[0], 'UserItems.amount', 0);
            set(element.Users[0], 'Users.0.UserItems.forge', 0);
        });
        dispatch({
            type: GET_USERITEM_DATA,
            payload: res.data
        });

        return;
    },
    (error) => {
        dispatch({
            type: GET_USERITEM_DATA_FAIL
        });

        return;
    })
};

export const getUserCharData = () => (dispatch) => {
    getUserCharacters()
    .then((res) => {
        dispatch({
            type: GET_USERCHARACTER_DATA,
            payload: res.data
        });

        return;
    },
    (error) => {
        dispatch({
            type: GET_USERCHARACTER_DATA_FAIL
        });

        return;
    })
};

export const getUserCharDataNotSignedIn = () => (dispatch) => {
    getAllCharacters()
    .then((res) => {
        res.data.forEach(element => {
            element.Users = [];
            set(element.Users[0], 'UserCharacters.level', 0);
            set(element.Users[0], 'UserCharacters.desired_level', 0);
            set(element.Users[0], 'UserCharacters.ascended', 0);
            set(element.Users[0], 'UserCharacters.ascend_next_max', 0);
            set(element.Users[0], 'UserCharacters.normal_atk_level', 0);
            set(element.Users[0], 'UserCharacters.normal_atk_desired_level', 0);
            set(element.Users[0], 'UserCharacters.q_atk_level', 0);
            set(element.Users[0], 'UserCharacters.q_atk_desired_level', 0);
            set(element.Users[0], 'UserCharacters.e_atk_level', 0);
            set(element.Users[0], 'UserCharacters.e_atk_desired_level', 0);
            set(element.Users[0], 'UserCharacters.managed', 0);
        });
        dispatch({
            type: GET_USERCHARACTER_DATA,
            payload: res.data
        });

        return;
    },
    (error) => {
        dispatch({
            type: GET_USERCHARACTER_DATA_FAIL
        });

        return;
    })
};

export const getUserWeaponsData = () => (dispatch) => {
    getUserWeapons()
    .then((res) => {
        dispatch({
            type: GET_USERWEAPON_DATA,
            payload: res.data
        });

        return;
    },
    (error) => {
        dispatch({
            type: GET_USERWEAPON_DATA_FAIL
        });

        return;
    })
};

export const getUserWeaponsDataNotSignedIn = () => (dispatch) => {
    getAllWeapons()
    .then((res) => {
        res.data.forEach(element => {
            element.Users = [];
            set(element.Users[0], 'UserWeapons.level', 0);
            set(element.Users[0], 'UserWeapons.desired_level', 0);
            set(element.Users[0], 'UserWeapons.ascended', 0);
            set(element.Users[0], 'UserWeapons.ascend_next_max', 0);
            set(element.Users[0], 'UserWeapons.managed', 0);
        });
        dispatch({
            type: UPDATE_USERWEAPON_DATA,
            payload: res.data
        });

        return;
    },
    (error) => {
        dispatch({
            type: GET_USERWEAPON_DATA_FAIL
        });

        return;
    })
};

// Add user character
// Add user character not logged in
export function addUserCharDataNotSignedIn(cid){
    return (dispatch, getState) =>{

        const state = getState();
        state.characters.forEach(character => {
            if(character.character_id === cid){
                const newUserChar = character;
                newUserChar.Users = [];
                set(newUserChar.Users[0], 'UserCharacters.level', 0);
                set(newUserChar.Users[0], 'UserCharacters.desired_level', 0);
                set(newUserChar.Users[0], 'UserCharacters.ascended', 0);
                set(newUserChar.Users[0], 'UserCharacters.ascend_next_max', 0);
                set(newUserChar.Users[0], 'UserCharacters.normal_atk_level', 0);
                set(newUserChar.Users[0], 'UserCharacters.normal_atk_desired_level', 0);
                set(newUserChar.Users[0], 'UserCharacters.q_atk_level', 0);
                set(newUserChar.Users[0], 'UserCharacters.q_atk_desired_level', 0);
                set(newUserChar.Users[0], 'UserCharacters.e_atk_level', 0);
                set(newUserChar.Users[0], 'UserCharacters.e_atk_desired_level', 0);
                set(newUserChar.Users[0], 'UserCharacters.managed', 1);
                state.userCharacters.push(newUserChar);
            }
        })

        dispatch({
            type: UPDATE_USERCHARACTER_DATA,
            payload: state.userCharacters
        });
    }
};
// Add user weapon
// Add user weapon not logged in
// Update user character
// Update user character not logged in
export function updateUserCharDataNotSignedIn(value){
    return (dispatch, getState) =>{
        const data ={
            level: value.level,
            desired_level: value.desired_level,
            ascended: value.ascended,
            ascend_next_max: value.ascend_next_max,
            normal_atk_level: value.normal_atk_level,
            normal_atk_desired_level: value.normal_atk_desired_level,
            q_atk_level: value.q_atk_level,
            q_atk_desired_level: value.q_atk_desired_level,
            e_atk_level: value.e_atk_level,
            e_atk_desired_level: value.e_atk_desired_level,
            managed: value.managed
        };
        const state = getState();
        state.userCharacters.forEach(character => {
            if(character.character_id === value.character_id){
                character.Users[0].UserCharacters = data;
            }
        })

        dispatch({
            type: UPDATE_USERCHARACTER_DATA,
            payload: state.userCharacters
        });
    }
};
// Update user weapon
// Update user weapon not logged in
// Update user item
// Update user item not logged in
// Remove user weapon
// Remove user weapon not logged in
// Remove user character
// Remove user character not logged in
export function removeUserCharDataNotSignedIn(cid){
    return (dispatch, getState) =>{
        const state = getState();

        state.userCharacters.splice(state.userCharacters.findIndex((character) => {
            return character.character_id === cid;
        }, 1));

        dispatch({
            type: UPDATE_USERCHARACTER_DATA,
            payload: state.userCharacters
        });
    }
};