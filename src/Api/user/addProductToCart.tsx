import { Response } from "../../interfaces/Response.interface";
import Api from "../axiosConfig";
import { handleApiError } from "../responseHandlers/handleApiError";
import { handleApiResponse } from "../responseHandlers/handleApiResponse";

export const addProductToCart = async (productId: string): Promise<Response> => {
    return Api.post(`/cart/${productId}`, { quantity: 1 })
        .then(handleApiResponse)
        .catch(handleApiError)
};