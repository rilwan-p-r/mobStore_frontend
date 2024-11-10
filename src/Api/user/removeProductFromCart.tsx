import { Response } from "../../interfaces/Response.interface";
import Api from "../axiosConfig";
import { handleApiError } from "../responseHandlers/handleApiError";
import { handleApiResponse } from "../responseHandlers/handleApiResponse";

export const removeProductFromCart = async(productId:string):Promise<Response>=>{
    return Api.delete(`/cart/${productId}`)
    .then(handleApiResponse)
    .catch(handleApiError)
}