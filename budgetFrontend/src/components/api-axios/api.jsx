import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080",
});

// May need to add logged in userId?

export default api;