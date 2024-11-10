import { Response } from "../../interfaces/Response.interface";
import Api from "../axiosConfig";
import { handleApiError } from "../responseHandlers/handleApiError";
import { handleApiResponse } from "../responseHandlers/handleApiResponse";

export const admEditProduct = async(id:string, productData:FormData):Promise<Response>=>{
    return Api.put(`admProduct/${id}`,productData,{headers:{
        'Content-Type':'multipart/form-data'
    }})
    .then(handleApiResponse)
    .catch(handleApiError)
}
