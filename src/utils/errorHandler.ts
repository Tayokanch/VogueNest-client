import { userAuth } from '../contexts/AuthContext';

/**
 * Centralized error handler for API responses
 * Automatically sets error messages in the auth context
 */
export const handleApiError = (error: any, setErrorMessage: (message: string | null) => void) => {
  // Handle backend error responses
  if (error?.response?.data?.error) {
    setErrorMessage(error.response.data.error);
  } else if (error?.message === 'Network Error') {
    setErrorMessage('Network error. Please check your internet connection.');
  } else {
    setErrorMessage('An unexpected error occurred. Please try again.');
  }
  
  // Log error for debugging
  console.error('API Error:', error);
};

/**
 * Check if an error is an authentication error (401)
 */
export const isAuthError = (error: any): boolean => {
  return error?.response?.status === 401;
};

/**
 * Check if an error is a validation error (400)
 */
export const isValidationError = (error: any): boolean => {
  return error?.response?.status === 400;
};

/**
 * Check if an error is a server error (500+)
 */
export const isServerError = (error: any): boolean => {
  return error?.response?.status >= 500;
};

/**
 * Get user-friendly error message based on error type
 */
export const getErrorMessage = (error: any): string => {
  if (error?.response?.data?.error) {
    return error.response.data.error;
  }
  
  if (error?.message === 'Network Error') {
    return 'Network error. Please check your internet connection.';
  }
  
  if (isAuthError(error)) {
    return 'Authentication failed. Please log in again.';
  }
  
  if (isServerError(error)) {
    return 'Server error. Please try again later.';
  }
  
  return 'An unexpected error occurred. Please try again.';
};
