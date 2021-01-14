import axios from 'axios';

const api = axios.create({
    baseURL: 'http://https://api.codestack.me/gobarber',
});

export default api;
