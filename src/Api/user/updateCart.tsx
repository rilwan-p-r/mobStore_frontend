import { Cart } from "../../interfaces/CartInterface";
import { Response } from "../../interfaces/Response.interface";
import Api from "../axiosConfig";
import { handleApiError } from "../responseHandlers/handleApiError";
import { handleApiResponse } from "../responseHandlers/handleApiResponse";

export const updateCart = async (productId: string, quantity: number): Promise<Response<Cart>> => {
    return Api.put(`/cart/${productId}`, { quantity })
        .then(handleApiResponse)
        .catch(handleApiError);
};