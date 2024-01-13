import axios from 'axios';

interface signInRequest {
  username: string;
  password: string;
}

interface signinSuccessResponse {
  success: true;
  access_token: string;
  refresh_token: string;
  token_type: 'bearer';
}

interface signinFailureResponse {
  success: false;
  message: string;
  detail: any;
}

interface signupRequest {
  name: string;
  email: string;
  plain_password: string;
}

type signinResponse = signinSuccessResponse | signinFailureResponse;

export const request_signin = async ({
  username,
  password,
}: signInRequest): Promise<signinResponse> => {
  const response = await axios
    .post<any>(
      '/_f/signin',
      { username, password },
      { headers: { 'Content-Type': 'multipart/form-data' } }
    )
    .then(({ data }) => ({
      success: true,
      ...data,
    }))
    .catch(({ response }) => {
      switch (response.status) {
        case 422:
          return {
            success: false,
            message: '',
          };
        case 401:
          return {
            success: false,
            message: response.data.detail,
          };
        default:
          return {
            success: false,
            message: 'Unknown error',
          };
      }
    });
  return response;
};

export const request_signup = async ({
  name,
  email,
  plain_password,
}: signupRequest): Promise<any> => {
  const response = await axios
    .post<any>(
      'http://localhost:6002/user',
      {name, email, plain_password}
    )
    .then(({data}) => (data))
    .catch(({ response}) => {
      switch (response.status) {
        case 409:
          return {
            success: false,
            message: response.data.detail
          };
        default:
          return {
            success: false,
            message: "Unkown error",
          }
      }
    })
  return response
}

export const email_exist = async (
  email
: string): Promise<any> => {
  const response = await axios
    .get('http://localhost:6002/user/' + email)
    .then(({data}) => (data))

  return response

  
}