export interface AuthResponse {
  token: string;
  username: string;
  email: string;
  role: string;
}

export interface LoginReq {
  email: string;
  password: string;
}

export interface RegisterReq {
  username?: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}


export interface User {
  username: string;
  email: string;
  role: string;
}