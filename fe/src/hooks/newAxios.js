import axios from 'axios';

const newAxios = axios.create({
    baseURL: 'http://localhost:8800',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

export default newAxios