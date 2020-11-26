import {
    GET_CHARACTER_DATA,
    GET_ITEM_DATA,
    GET_USERCHARACTER_DATA,
    GET_USERITEM_DATA,
    GET_USERWEAPON_DATA,
    GET_WEAPON_DATA,
    GET_CHARACTER_DATA_FAIL,
    GET_ITEM_DATA_FAIL,
    GET_USERCHARACTER_DATA_FAIL,
    GET_USERITEM_DATA_FAIL,
    GET_USERWEAPON_DATA_FAIL,
    GET_WEAPON_DATA_FAIL,
    UPDATE_CHARACTER_DATA,
    UPDATE_USERCHARACTER_DATA,
    LOGOUT
} from "../actions/types"

const characters = JSON.parse(localStorage.getItem("Characters"));
const weapons = JSON.parse(localStorage.getItem("Weapons"));
const items = JSON.parse(localStorage.getItem("Items"));
const userCharacters = JSON.parse(localStorage.getItem("UserCharacters"));
const userWeapons = JSON.parse(localStorage.getItem("UserWeapons"));
const userItems = JSON.parse(localStorage.getItem("UserItems"));

const initialState = {
    characters: [],
    weapons: [],
    items: [],
    userCharacters: userCharacters,
    userWeapons: userItems,
    userItems: userItems
}

export default function (state = initialState, action){
    const {type, payload}= action;

    switch(type){
        case UPDATE_CHARACTER_DATA:
            return {
                ...state,
                characters: payload
            };
        case UPDATE_USERCHARACTER_DATA:
            return {
                ...state,
                userCharacters: payload
            };
        case LOGOUT:
            return{
                ...state,
                characters: [],
                weapons: [],
                items: [],
                userCharacters: [],
                userWeapons: [],
                userItems: []
            };
        default:
            return state;
    }
}