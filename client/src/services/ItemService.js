import http from "../http-common";

// Get item of corresponding type and rarity

export function getItem(type, rarity) {
    return http.get(`/items?type=${type}?rarity=${rarity}`);
}

export function getAllItems() {
    return http.get("/items");
};

export function getUserItems(id){
    return http.get(`/useritems/${id}`);
};
  
  export function addUserItems(id){
    return http.post(`/useritems/${id}`);
};
  
  export function updateUserItem(data){
    return http.put(`/useritems`, data);
};