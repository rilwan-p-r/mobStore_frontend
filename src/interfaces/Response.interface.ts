export interface Response<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  status?: number;
}