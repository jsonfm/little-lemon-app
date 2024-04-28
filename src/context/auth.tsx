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
const AuthContextProvider = ({ children }: AuthContextProvider) => {
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const login = useCallback(
    async ({ email, password }: { email: string; password: string }) => {},
    [isAuthenticated]
  );

  const logout = useCallback(async (withNavigation = true) => {}, []);
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
