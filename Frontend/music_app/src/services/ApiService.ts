import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000',
});

const ApiService = {
    get(endpoint: string, config = {}) {
        return axiosInstance.get(endpoint, config);
    },

    post(endpoint: string, data = {}, config = {}) {
        return axiosInstance.post(endpoint, data, config);
    },

    put(endpoint: string, data = {}, config = {}) {
        return axiosInstance.put(endpoint, data, config);
    },

    delete(endpoint: string, config = {}) {
        return axiosInstance.delete(endpoint, config);
    }
};

export default ApiService;
