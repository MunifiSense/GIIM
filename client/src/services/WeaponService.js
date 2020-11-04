import http from "../http-common";

export function getAllWeapons() {
  return http.get("/weapons");
}

export function getByName(name) {
  return http.get(`/weapons/${name}`);
};

export function getUserWeapons(id){
  return http.get(`/userweapons/${id}`);
};

export function addUserWeapon(data){
  return http.post(`/userweapons`, data);
}

export function updateUserWeapon(data){
  return http.put(`/userweapons`, data);
}

export function removeUserWeapon(id, weaponid){
  return http.delete(`/userweapons/${id}?weaponid=${weaponid}`);
}