// user session management on client side

interface Session {
  /** user email */
  sub: string;
  /** timestamp */
  exp: number;
}

type getUserOutput = Session | null;

const ACCESS_TOKEN_KEY = 'access-token';
const REFRESH_TOKEN_KEY = 'refresh-token';

export const setUser = async (access_token: string) => {
  localStorage.setItem(ACCESS_TOKEN_KEY, access_token);
};

export const getUser = (): getUserOutput => {
  /**
   * 세션에 사용자가 저장되어 있을 때 사용자 반환
   */
  const token = localStorage.getItem(ACCESS_TOKEN_KEY);
  if (token === null) return null;

  // handle invalid token
  try {
    const [_b64header, b64payload, _b64signature] = token.split('.');
    const strpayload = Buffer.from(b64payload, 'base64').toString('ascii');
    const payload = JSON.parse(strpayload);
    console.log('user info:',payload)
    return payload;
  } catch (e) {
    return null;
  }
};

export const clearUser = () => {
  localStorage.clear();
  return true;
};
