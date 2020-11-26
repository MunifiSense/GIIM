import http from "../http-common";
import authHeader from '../services/AuthHeader';

// Get item of corresponding type and rarity

export function getItem(type, rarity) {
    return http.get(`/items?type=${type}?rarity=${rarity}`);
}

export function getAllItems() {
    return http.get("/items");
};

export function getUserItems(){
    return http.get(`/useritems/`, { headers: authHeader() });
};
  
  export function addUserItems(){
    return http.post(`/useritems/`,{}, { headers: authHeader() });
};
  
  export function updateUserItem(data){
    return http.put(`/useritems`, data, { headers: authHeader() });
};