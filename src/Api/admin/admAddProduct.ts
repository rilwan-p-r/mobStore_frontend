import { Response } from "../../interfaces/Response.interface";
import Api from "../axiosConfig";
import { handleApiError } from "../responseHandlers/handleApiError";
import { handleApiResponse } from "../responseHandlers/handleApiResponse";


export const  admAddProduct = async(productData:FormData):Promise<Response>=>{
    for (const [key, value] of productData.entries()) {
        console.log(`${key}: ${value}`);
    }
    return Api.post('Product',productData,{headers:{
        'Content-Type':'multipart/form-data'
    }})
    .then(handleApiResponse)
    .catch(handleApiError)
};