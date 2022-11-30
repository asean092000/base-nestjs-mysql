import { STATUSCODE } from '../../constants/statusCode';

export class BaseResponse {
  code: STATUSCODE | number;
  message: string;
  data: any;

  constructor(code: STATUSCODE | number, data?: any, message?: string) {
    this.code = code;
    this.message = message;
    this.data = data || null;
  }
}

export class BaseErrorResponse extends BaseResponse{
}
