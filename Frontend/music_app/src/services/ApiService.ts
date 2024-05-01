import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000',
});

const ApiService = {
    get(endpoint, config = {}) {
        return axiosInstance.get(endpoint, config);
    },

    post(endpoint, data = {}, config = {}) {
        return axiosInstance.post(endpoint, data, config);
    },

    put(endpoint, data = {}, config = {}) {
        return axiosInstance.put(endpoint, data, config);
    },

    delete(endpoint, config = {}) {
        return axiosInstance.delete(endpoint, config);
    }
};

export default ApiService;
