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
  mutate: () => Promise<void>;
  setUser: (user: any) => void;
}

const AuthContext = createContext<AuthContextState>({
  login: async ({ email, password }: { email: string; password: string }) => {},
  logout: async (withNavigation?: boolean) => {},
  isAuthenticated: false,
  loading: false,
  user: undefined,
  mutate: async () => {},
  setUser: (user: any) => {},
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

  const mutate = useCallback(async () => {
    setLoading(true);
    try {
      const data = await AuthStorage.getAuth();
      if (!data) throw new Error(`session not found`);
      setUser(data);
      setIsAuthenticated(true);
    } catch (error) {}
    setLoading(false);
  }, []);

  useEffect(() => {
    const initialLoad = async () => {
      try {
        const data = await AuthStorage.getAuth();
        if (!data) throw new Error(`session not found`);
        setUser(data);
        setIsAuthenticated(true);
        router.navigate("/menu/home");
      } catch (error) {
        router.navigate("/login");
      }
    };
    initialLoad();
  }, []);

  const login = useCallback(
    async ({ email, password }: { email: string; password: string }) => {
      setLoading(true);
      try {
        const user = await UsersService.login({ email, password });
        console.log("==> user: ", user);
        await AuthStorage.saveAuth(user);

        setUser(user);
        setIsAuthenticated(true);
        router.navigate("/menu/home");
      } catch (error) {
        setLoading(false);
        throw error;
      }

      setLoading(false);
    },
    [isAuthenticated, user]
  );

  const logout = useCallback(
    async (withNavigation = true) => {
      setLoading(true);
      try {
        await AuthStorage.clearAuth();
        setUser(undefined);
        setIsAuthenticated(false);
        if (withNavigation) {
          router.navigate("/login");
        }
      } catch (error) {}
      setLoading(false);
    },
    [isAuthenticated, user]
  );
  return (
    <AuthContext.Provider
      value={{ login, logout, isAuthenticated, loading, user, setUser, mutate }}
    >
      {children}
    </AuthContext.Provider>
  );
};

interface AuthRequiredViewProps {
  children?: ReactNode;
}

export const AuthRequiredView = ({ children }: AuthRequiredViewProps) => {
  const { isAuthenticated, loading } = useAuth();
  if (!!isAuthenticated && !loading) {
    return <>{children}</>;
  }
  return <></>;
};
