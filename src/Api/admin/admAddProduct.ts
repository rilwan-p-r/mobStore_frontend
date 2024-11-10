import { Response } from "../../interfaces/Response.interface";
import Api from "../axiosConfig";
import { handleApiError } from "../responseHandlers/handleApiError";
import { handleApiResponse } from "../responseHandlers/handleApiResponse";


export const  admAddProduct = async(productData:FormData):Promise<Response>=>{ 
    return Api.post('admProduct',productData,{headers:{
        'Content-Type':'multipart/form-data'
    }})
    .then(handleApiResponse)
    .catch(handleApiError)
};