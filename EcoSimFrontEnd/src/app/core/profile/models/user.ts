export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

export interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
}