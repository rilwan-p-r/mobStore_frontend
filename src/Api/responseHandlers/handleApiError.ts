import axios, { AxiosError } from "axios";
import { ApiErrorResponse } from "../../interfaces/ApiErrorResponse";
import { Response } from "../../interfaces/Response.interface";


export const handleApiError = (error: unknown): Response => {
    if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ApiErrorResponse>;
        console.log(axiosError);
        
        return {
            success: false,
            error: axiosError.response?.data?.message || axiosError.message,
            status: axiosError.response?.status
        };
    } else {
        console.error('Unexpected error:', error);
        return {
            success: false,
            error: 'An unexpected error occurred'
        };
    }
};
