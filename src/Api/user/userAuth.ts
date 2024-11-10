import Api from "../axiosConfig";
import { signupBody } from "../../interfaces/signup.interface";
import { signInValues } from "../../interfaces/SignInValues.interface";
import { handleApiResponse } from "../responseHandlers/handleApiResponse";
import { handleApiError } from "../responseHandlers/handleApiError";
import { Response } from "../../interfaces/Response.interface";

export const signUp = async (body: signupBody): Promise<Response> => {
  return Api.post('signup', body)
      .then(handleApiResponse)
      .catch(handleApiError)
};

export const signIn = async(body:signInValues):Promise<Response>=>{
  return Api.post('signin',body)
  .then(handleApiResponse)
  .catch(handleApiError)
};