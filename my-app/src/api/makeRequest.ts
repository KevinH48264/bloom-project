import axios, { Method } from "axios";

const BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000/";

export default async function makeRequest<T extends object>(method: Method, url: string, body?: object): Promise<T> {

    let response = await axios({
        method,
        url: `${BASE_URL}${url}`,
        data: body
    });

    return response.data;
}