export interface UserData {
  id: string;
  email: string;
  full_name: string;
  avatar: string;
}
export interface AuthContextType {
  userData?: UserData;
  isLoggedIn?: boolean;
  authLoading?: boolean;
}
