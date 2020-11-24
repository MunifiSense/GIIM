import http from "../http-common";

export function authenticate(token){
    return http.post(`/auth`, null, {headers: { Authorization: `Bearer ${token}` }});
};