import axios from "axios";

const instance = axios.create({
    baseURL: "http://newsapi.org/v2/"
});

instance.interceptors.request.use(
    (config) => {
        const token = "0c831c8a820c4dc58d41bc64c0ac0187";
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }   
        return config;     
    },
    (err) => {
        return Promise.reject(err);
    }
)

export default instance;