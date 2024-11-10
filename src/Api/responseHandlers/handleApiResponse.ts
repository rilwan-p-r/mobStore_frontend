import { AxiosResponse } from "axios";
import { Response } from "../../interfaces/Response.interface";


export const handleApiResponse = (response: AxiosResponse): Response => {
    console.log(handleApiResponse);
    
    return {
        success: true,
        data:response.data,
        status: response.status,

    };
};