import { Product } from "./Product.interface";
import { userInfoInterface } from "./userInfo.interface";

export interface Response {
  success: boolean;
  data?:userInfoInterface | Product[];
  error?: string;
  status?: number;
}