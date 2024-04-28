import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";

interface AuthContextState {
  login: ({ email, password }: { email: string; password: string }) => void;
  logout: (withNavigation?: boolean) => void;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextState>({
  login: ({ email, password }: { email: string; password: string }) => {},
  logout: (withNavigation?: boolean) => {},
  isAuthenticated: false,
  loading: false,
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
  const login = useCallback(
    async ({ email, password }: { email: string; password: string }) => {
      setLoading(true);
      try {
      } catch (error) {}
      setLoading(false);
    },
    [isAuthenticated]
  );

  const logout = useCallback(async (withNavigation = true) => {
    setLoading(true);
    try {
    } catch (error) {}
    setLoading(false);
  }, []);
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
