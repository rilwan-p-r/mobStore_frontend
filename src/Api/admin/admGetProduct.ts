import { Response } from "../../interfaces/Response.interface";
import Api from "../axiosConfig";
import { handleApiError } from "../responseHandlers/handleApiError";
import { handleApiResponse } from "../responseHandlers/handleApiResponse";

export const admGetProduct = async():Promise<Response>=>{
    return Api.get('admProduct')
    .then(handleApiResponse)
    .catch(handleApiError);
}