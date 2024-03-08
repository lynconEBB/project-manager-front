import axios from "axios";

const api = axios.create({
    baseURL: "http://es2.tomiodarim.io:8080",
});

export const useApi = () => {
    const authApi = axios.create({
        baseURL: "http://es2.tomiodarim.io:8080",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`
        }
    });

    return {
        authApi
    }
}

export default api;