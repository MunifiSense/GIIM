import http from "../http-common";
import authHeader from '../services/AuthHeader';

export function getAllCharacters() {
  return http.get("/characters");
}

export function getByName(name) {
  return http.get(`/characters/${name}`);
};

export function getUserCharacters(){
  return http.get(`/usercharacters/`, { headers: authHeader() });
};

export function addUserCharacter(data){
  return http.post(`/usercharacters`, data, { headers: authHeader() });
}

export function updateUserCharacter(data){
  return http.put(`/usercharacters`, data, { headers: authHeader() });
}

export function removeUserCharacter(charid){
  return http.delete(`/usercharacters/${charid}`, { headers: authHeader() });
}

export function getLocalUserCharacters(){
  return JSON.parse(localStorage.getItem("userCharacters"));
}