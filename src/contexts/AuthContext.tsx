import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
  useEffect,
} from 'react';
import { toast } from 'react-toastify';
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
  errorMessage: string | null;
  successMessage: string | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<LoggedUserI | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loginStatus, setLoginStatus] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

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
      try {
        setLoading(true);
        setErrorMessage(null);
        const user = await VogueNestService.Login(data);
        if (!user?.login) {
          setErrorMessage('Invalid login credentials.');
          return;
        }

        setUser(user);
        setLoginStatus(true);
        navigate('/');
      } catch (error: any) {
        setUser(null);
        setErrorMessage(error?.response?.data?.error || 'Login failed.');
      } finally {
        setLoading(false);
      }
    },
    [navigate]
  );

  const logout = useCallback(async () => {
    setLoading(true);
    try {
      const response = await VogueNestService.logOut();
      setUser(null);
      toast(response);
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  return (
    <AuthContext.Provider
      value={{ user, setUser, setLoading, loading, login, logout, signUp, successMessage, errorMessage }}
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
