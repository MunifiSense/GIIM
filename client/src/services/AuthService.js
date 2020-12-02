import http from "../http-common";

export function authenticate(token){
    return http.post(`/auth`, null, {headers: { Authorization: `Bearer ${token}` }});
};

export function authlogout(){
    localStorage.removeItem("user");
}

export function getCurrentUser(){
    return JSON.parse(localStorage.getItem("user"));
}