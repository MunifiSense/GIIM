import http from "../http-common";

export function authenticate(token){
    return http.post(`/auth`, null, {headers: { Authorization: `Bearer ${token}` }})
    .then((response) => {
        if(response.data.token){
            localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response;
    });
};

export function logout(){
    localStorage.removeItem("user");
}