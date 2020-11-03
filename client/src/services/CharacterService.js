import http from "../http-common";

export function getAllCharacters() {
  return http.get("/characters");
}

export function getByName(name) {
  return http.get(`/characters/${name}`);
};

export function getUserCharacters(id){
  return http.get(`/usercharacters/${id}`);
};

export function addUserCharacter(data){
  return http.post(`/usercharacters`, data);
}

export function updateUserCharacter(data){
  return http.put(`/usercharacters`, data);
}

export function removeUserCharacter(data){
  return http.delete(`/usercharacters`, data);
}