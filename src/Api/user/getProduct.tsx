import Api from "../axiosConfig";
import { handleApiResponse } from "../responseHandlers/handleApiResponse";
import { handleApiError } from "../responseHandlers/handleApiError";
import { Response } from "../../interfaces/Response.interface";

export const getProducts = async (): Promise<Response> => {
    return Api.get('getProduct')
    .then(handleApiResponse)
    .catch(handleApiError)
};