import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
  useEffect,
} from 'react';
import VogueNestService from '../services/api-client';
import { useNavigate } from 'react-router-dom';

export interface LoggedUserI {
  login: boolean;
  role: string;
  id: string;
  name: string;
}


interface AuthContextType {
  user: LoggedUserI | null;
  setUser: React.Dispatch<React.SetStateAction<LoggedUserI | null>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  login: (data: { email: string; password: string }) => Promise<void>;
  signUp: (data: {
    name: string;
    email: string;
    password: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<LoggedUserI | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loginStatus, setLoginStatus] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  // Validate session on mount (cookie validation)
  useEffect(() => {
    async function validateSession() {
      try {
        const response = await VogueNestService.validateCookie();
        if (response?.login) {
          setUser(response);
        } else {
          setUser(null);
          navigate('/login');
        }
      } catch {
        setUser(null);
        navigate('/login');
      } finally {
        setLoading(false);
      }
    }
    validateSession();
  }, [navigate]);

  const signUp = useCallback(
    async (data: { name: string; email: string; password: string }) => {
      setLoading;
      true;
      try {
        await VogueNestService.createUser(data);
        setSuccessMessage('Sign up successful! ');
        navigate('/login');
      } catch (error) {
        setLoading(false);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [navigate]
  );

  const login = useCallback(
    async (data: { email: string; password: string }) => {
      setLoading(true);
      try {
        const user = await VogueNestService.Login(data);
        if (user.login) {
          setLoading(false);
          setLoginStatus(true);
          setUser(user);
          navigate('/');
        }
      } catch (error) {
        setUser(null);
        throw error; // propagate error for UI handling
      } finally {
        setLoading(false);
      }
    },
    [navigate]
  );

  const logout = useCallback(async () => {
    setLoading(true);
    try {
      await VogueNestService.logOut();
      setUser(null);
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  return (
    <AuthContext.Provider
      value={{ user, setUser, setLoading, loading, login, logout, signUp }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for ease of use in components
export function userAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('userAuth must be used within an AuthProvider');
  }
  return context;
}
