import Axios from "axios";


export const httpRequest = Axios.create({
    baseURL: 'http://localhost:8080',

})

export const baseURL= 'http://localhost:8080';
