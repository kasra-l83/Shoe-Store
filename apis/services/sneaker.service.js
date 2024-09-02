import {urls} from "../urls";
import {httpClient} from "../client";
export async function getSneakers(){
    const response= await httpClient().get(urls.sneaker.list, {params: {
        page: 1,
        lomit: 10
    }});
    console.log(response);
    return response.data;
}