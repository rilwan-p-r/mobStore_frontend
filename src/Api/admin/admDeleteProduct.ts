import { Response } from "../../interfaces/Response.interface";
import Api from "../axiosConfig";
import { handleApiError } from "../responseHandlers/handleApiError";
import { handleApiResponse } from "../responseHandlers/handleApiResponse";

export const admDeleteProduct = async(id:string):Promise<Response>=>{
    return  Api.delete(`admProduct/${id}`)
    .then(handleApiResponse)
    .catch(handleApiError)
};