import axios from 'axios';

const api = axios.create({
    baseURL: 'https://vinifragaomnistack-backend.herokuapp.com'
});

export default api;