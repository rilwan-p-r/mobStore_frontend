import { Cart } from "../../interfaces/CartInterface";
import { Response } from "../../interfaces/Response.interface";
import Api from "../axiosConfig";
import { handleApiError } from "../responseHandlers/handleApiError";
import { handleApiResponse } from "../responseHandlers/handleApiResponse";

export const getCartProducts = async (userId: string): Promise<Response<Cart>> => {
    return Api.get(`/cart/${userId}`)
      .then(handleApiResponse)
      .catch(handleApiError);
  };