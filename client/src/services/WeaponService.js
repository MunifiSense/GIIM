import http from "../http-common";
import authHeader from '../services/AuthHeader';

export function getAllWeapons() {
  return http.get("/weapons");
}

export function getByName(name) {
  return http.get(`/weapons/${name}`);
};

export function getUserWeapons(){
  return http.get(`/userweapons/`, { headers: authHeader() });
};

export function addUserWeapon(data){
  return http.post(`/userweapons`, data, { headers: authHeader() });
}

export function updateUserWeapon(data){
  return http.put(`/userweapons`, data, { headers: authHeader() });
}

export function removeUserWeapon(weaponid){
  return http.delete(`/userweapons/${weaponid}`, { headers: authHeader() });
}

export function getLocalUserWeapons(){
  return JSON.parse(localStorage.getItem("userWeapons"));
}