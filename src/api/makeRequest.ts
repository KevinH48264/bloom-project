import axios, { Method } from "axios";

const BASE_URL = "https://bloom-website.herokuapp.com/"|| "http://localhost:5000/";

export default async function makeRequest<T extends object>(method: Method, url: string, body?: object): Promise<T> {

    let response = await axios({
        method,
        url: `${BASE_URL}${url}`,
        data: body
    });

    return response.data;
}