import { Response } from "../../interfaces/Response.interface";
import Api from "../axiosConfig";
import { handleApiError } from "../responseHandlers/handleApiError";
import { handleApiResponse } from "../responseHandlers/handleApiResponse";

export const getUsers = async():Promise<Response>=>{
    return Api.get('getUsers')
    .then(handleApiResponse)
    .catch(handleApiError);
}