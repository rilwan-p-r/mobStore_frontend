import { Response } from "../../interfaces/Response.interface";
import Api from "../axiosConfig";
import { handleApiError } from "../responseHandlers/handleApiError";
import { handleApiResponse } from "../responseHandlers/handleApiResponse";

export const viewUserCart = async(userId:string):Promise<Response>=>{
    return Api.get(`viewUserCart/${userId}`)
    .then(handleApiResponse)
    .catch(handleApiError);
}