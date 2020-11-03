import http from "../http-common";

// Get item of corresponding type and rarity

export function getItem(type, rarity) {
    return http.get(`/items/${type}/${rarity}`);
}