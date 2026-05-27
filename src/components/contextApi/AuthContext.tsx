import {
  removeRefreshToken,
  removeToken,
  setRefreshToken,
  setToken,
} from "@/utility/authService";
import { createContext, useContext } from "react";
import {useGetInit} from "@/components/api/Api.ts";

export interface ModuleItem {
  name: string;
  icon: string;
  path: string | null;
  code: string;
  moduleList: ModuleItem[];
}
export interface UserData {
  userId?: number;
  fullName: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  username?: string;
  email: string;
  phone?: string;
  gender?: string;
  role?: string | null;
  roleCode?: string | null;
  isActive: boolean;
  moduleList: ModuleItem[];
}

export interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string, refreshToken: string) => void;
  logout: () => void;
  refetchInit: () => void;
  user: UserData | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  login: () => { },
  logout: () => { },
  refetchInit: () => { },
  user: null,
  loading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const {
    data: fetchedInit,
    isPending: loading,
    refetch: refetchInit,
  } = useGetInit();

  const user: UserData | null = fetchedInit?.data
      ? Array.isArray(fetchedInit.data)
          ? fetchedInit.data[0]
          : fetchedInit.data
      : null;

  const isAuthenticated = !!user;

  const login = async (token: string, refreshToken: string) => {
    setToken(token);
    setRefreshToken(refreshToken);
    await refetchInit();
  };

  const logout = () => {
    removeToken();
    removeRefreshToken();
  };

  return (
      <AuthContext.Provider
          value={{
            isAuthenticated,
            login,
            logout,
            user,
            loading,
            refetchInit,
          }}
      >
        {children}
      </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
