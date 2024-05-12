import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://astounding-cassata-365edd.netlify.app/',
    headers: { 
        'Content-Type': 'application/json',
    },
});

export default axiosInstance