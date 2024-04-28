import { UsersService } from "@/services/users";
import { AuthStorage } from "@/storage/auth";
import { router } from "expo-router";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

interface AuthContextState {
  login: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => Promise<void>;
  logout: (withNavigation?: boolean) => Promise<void>;
  isAuthenticated: boolean;
  loading: boolean;
  user?: any;
}

const AuthContext = createContext<AuthContextState>({
  login: async ({ email, password }: { email: string; password: string }) => {},
  logout: async (withNavigation?: boolean) => {},
  isAuthenticated: false,
  loading: false,
  user: undefined,
});

export const useAuth = () => {
  const state = useContext(AuthContext);
  return state;
};

interface AuthContextProvider {
  children: ReactNode;
}

export const AuthContextProvider = ({ children }: AuthContextProvider) => {
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(undefined);
  useEffect(() => {
    const getCurrentUser = async () => {
      setLoading(true);
      try {
        const data = await AuthStorage.getCurrentUser();
        setUser(data);
        setIsAuthenticated(true);
        console.log("user: ", data);
        router.navigate("/home");
      } catch (error) {
        router.navigate("/login");
      }

      setLoading(false);
    };
    getCurrentUser();
  }, []);

  const login = useCallback(
    async ({ email, password }: { email: string; password: string }) => {
      setLoading(true);
      try {
        const user = await UsersService.login({ email, password });
        await AuthStorage.saveAuth(user);
        router.navigate("/home");
      } catch (error) {}
      setLoading(false);
    },
    [isAuthenticated]
  );

  const logout = useCallback(
    async (withNavigation = true) => {
      setLoading(true);
      try {
      } catch (error) {
        await AuthStorage.clearAuth();
        if (withNavigation) {
          router.navigate("/login");
        }
      }
      setLoading(false);
    },
    [isAuthenticated]
  );
  return (
    <AuthContext.Provider value={{ login, logout, isAuthenticated, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

interface AuthRequiredViewProps {
  children?: ReactNode;
}

export const AuthRequiredView = ({ children }: AuthRequiredViewProps) => {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) {
    return <>{children}</>;
  }
  return <></>;
};
