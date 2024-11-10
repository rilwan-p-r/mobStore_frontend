import Api from "../axiosConfig";
import { handleApiResponse } from "../responseHandlers/handleApiResponse";
import { handleApiError } from "../responseHandlers/handleApiError";
import { Response } from "../../interfaces/Response.interface";

export const checkout = async (summary:any): Promise<Response> => {
    console.log(summary);
    return Api.post('checkout', { summary })
      .then(handleApiResponse)
      .catch(handleApiError);
  };