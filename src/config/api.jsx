import axios from 'axios';


// VARIAVEL DE CONEXÃO COM API
const api = axios.create({
    baseURL: 'http://brampwsapp002:3050'
})

export default api;

