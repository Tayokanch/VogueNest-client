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
import { handleApiError } from '../utils/errorHandler';

export interface LoggedUserI {
  login: boolean;
  role: string;
  id: string;
  username: string;
  accessToken: string;
}

interface AuthContextType {
  user: LoggedUserI | null;
  setUser: (user: LoggedUserI | null) => void;
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
  setErrorMessage: React.Dispatch<React.SetStateAction<string | null>>;
  successMessage: string | null;
  setSuccessMessage: React.Dispatch<React.SetStateAction<string | null>>;
  token: string | null;
  setToken: (token: string | null) => void;
  refreshToken: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<LoggedUserI | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const navigate = useNavigate();

  // Automatically restore token from localStorage on component mount
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken && storedToken !== token) {
      setToken(storedToken);
    }
  }, []);

  const updateToken = useCallback((newToken: string | null) => {
    setToken(newToken);
    if (newToken) {
      localStorage.setItem('token', newToken);
    } else {
      localStorage.removeItem('token');
    }
  }, []);

  // Simple user management
  const updateUser = useCallback((newUser: LoggedUserI | null) => {
    setUser(newUser);
  }, []);

  const signUp = useCallback(
    async (data: { name: string; email: string; password: string }) => {
      setLoading(true);
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
        setSuccessMessage(null);
        
        const response = await VogueNestService.Login(data);
        
        if (response && response.accessToken) {
          const accessToken = response.accessToken;
          
          // Update both token and user
          updateToken(accessToken);
          updateUser({
            login: true,
            role: response.role,
            id: response.id,
            username: response.username,
            accessToken: accessToken,
          });
          
          setSuccessMessage('Login successful!');
          navigate('/');
        } else {
          setErrorMessage('Invalid response from server. Please try again.');
        }
      } catch (error: any) {
        // Clear everything on error
        updateToken(null);
        updateUser(null);
        handleApiError(error, setErrorMessage);
      } finally {
        setLoading(false);
      }
    },
    [navigate, updateToken, updateUser]
  );

  const logout = async () => {
    setLoading(true);
    try {
      // Call logout API first if we have a token
      if (token) {
        await VogueNestService.logOut(token);
      }
      
      // Clear local state after successful API call
      updateToken(null);
      updateUser(null);
      
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      // Even if API call fails, clear local data
      updateToken(null);
      updateUser(null);
      navigate('/login');
    } finally {
      setLoading(false);
    }
  };

  const refreshToken = useCallback(async () => {
    const storedToken = localStorage.getItem('token');
    
    if (storedToken) {
      try {
        const response = await VogueNestService.validateCookie(storedToken);
        
        if (response && response.login) {
          updateToken(storedToken);
          updateUser({
            login: true,
            role: response.role,
            id: response.id,
            username: response.username,
            accessToken: storedToken,
          });
        } else {
          // Token is invalid, clear it
          updateToken(null);
          updateUser(null);
        }
      } catch (error) {
        console.error('Token refresh failed:', error);
        updateToken(null);
        updateUser(null);
      }
    }
  }, [updateToken, updateUser]);

  return (
    <AuthContext.Provider
      value={{ 
        user, 
        setUser: updateUser, 
        setLoading, 
        loading, 
        login, 
        signUp, 
        logout, 
        errorMessage, 
        setErrorMessage, 
        successMessage, 
        setSuccessMessage, 
        token, 
        setToken: updateToken, 
        refreshToken 
      }}
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
