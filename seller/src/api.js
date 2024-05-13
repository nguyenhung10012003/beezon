import axios from 'axios';
// Set up default config for http requests here
// Please have a look at here `https://github.com/axios/axios#request` for the full list of configs
const axiosClient = axios.create({
                                     baseURL: process.env.API_URL || 'http://localhost:3001',
                                     headers: {
                                         'content-type': 'application/json',
                                     },
                                 });

axiosClient.interceptors.request.use(async (config) => {
    // Handle token here ...
    return config;
}, (error) => {
    console.log(error);
});
axiosClient.interceptors.response.use((response) => {
    if (response && response.data) {
        return response.data;
    }
    return response;
}, (error) => {
    // Handle errors
    console.log(error);
});
export default axiosClient;
