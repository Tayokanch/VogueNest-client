# Global Token Usage Guide

This document explains how to use the authentication token globally throughout the VogueNest application.

## Overview

The authentication token is now stored in the `AuthContext` and can be accessed from any component in the application. This provides a centralized way to manage authentication state and make authenticated API calls.

**Important**: The context now uses a simple and efficient approach - tokens are automatically synced between localStorage and React state, providing immediate access without complex backend validation on page refresh.

## How to Access the Token

### 1. Using the `userAuth` Hook

```tsx
import { userAuth } from '../contexts/AuthContext';

const MyComponent = () => {
  const { token, user, login, logout } = userAuth();
  
  // Use token for API calls
  const makeAuthenticatedRequest = async () => {
    if (token) {
      // Make authenticated request
    }
  };
  
  return (
    <div>
      {token ? (
        <p>Logged in as: {user?.username}</p>
      ) : (
        <p>Please log in</p>
      )}
    </div>
  );
};
```

### 2. Available Token Properties

- `token`: The current authentication token (string | null)
- `setToken`: Function to update the token (automatically syncs with localStorage)
- `user`: Current user information
- `login`: Function to authenticate user
- `logout`: Function to log out user
- `errorMessage`: Current error message
- `successMessage`: Current success message
- `refreshToken`: Function to manually refresh the token with backend validation

## Page Refresh Handling

### How It Works

When a user refreshes the page, the authentication context automatically:

1. **Reads from localStorage** - Token is immediately available from `useState(localStorage.getItem('token'))`
2. **No backend calls** - Token is instantly accessible without API delays
3. **Automatic sync** - `updateToken()` function keeps localStorage and state in sync
4. **Immediate access** - No loading states or initialization delays

### Benefits of This Approach

- **⚡ Instant**: Token available immediately on page refresh
- **🔄 Reliable**: Works even if backend is temporarily unavailable
- **🧹 Simple**: Less complex logic, easier to maintain
- **💾 Efficient**: No unnecessary API calls on page refresh

### When Backend Validation Happens

Backend validation only occurs when:
- User logs in (to verify credentials)
- User logs out (to invalidate session)
- Manual token refresh (when you call `refreshToken()`)
- API calls that return 401 (automatic cleanup)

### Best Practices

```tsx
// Simple usage - no need to check initialization
const MyComponent = () => {
  const { token, user } = userAuth();
  
  // Token is immediately available
  return (
    <div>
      {token ? `Welcome ${user?.username}` : 'Please log in'}
    </div>
  );
};

// For protected routes
const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { token } = userAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);
  
  if (!token) {
    return <div>Redirecting to login...</div>;
  }
  
  return <>{children}</>;
};
```

### Manual Token Refresh

You can manually refresh the token if needed:

```tsx
const { refreshToken } = userAuth();

// Refresh token manually (e.g., before making important API calls)
await refreshToken();
```

## Making Authenticated API Calls

### 1. Using the Updated API Client

The `VogueNestService` now accepts an optional token parameter:

```tsx
import VogueNestService from '../services/api-client';
import { userAuth } from '../contexts/AuthContext';

const MyComponent = () => {
  const { token } = userAuth();
  
  const fetchOrders = async () => {
    try {
      // Pass token to API calls
      const orders = await VogueNestService.getUserOrder(token);
      // Handle response
    } catch (error) {
      // Handle error
    }
  };
};
```

### 2. Manual API Calls with Token

```tsx
const makeCustomRequest = async () => {
  if (!token) {
    throw new Error('No authentication token available');
  }
  
  const response = await fetch('/api/protected-endpoint', {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  
  return response.json();
};
```

## Error Handling Best Practices

### 1. Token Validation

```tsx
const validateToken = () => {
  if (!token) {
    // Redirect to login or show login prompt
    navigate('/login');
    return false;
  }
  return true;
};
```

### 2. Using Error Handling Utilities

We've created utility functions to make error handling cleaner and more consistent:

```tsx
import { handleApiError, isAuthError, getErrorMessage } from '../utils/errorHandler';

const MyComponent = () => {
  const { setErrorMessage } = userAuth();
  
  const handleApiCall = async () => {
    try {
      const result = await apiCall();
      return result;
    } catch (error: any) {
      // Use centralized error handler
      handleApiError(error, setErrorMessage);
      
      // Or check specific error types
      if (isAuthError(error)) {
        // Handle authentication errors specifically
        logout();
        navigate('/login');
      }
    }
  };
};
```

### 3. Available Error Utilities

- `handleApiError(error, setErrorMessage)`: Automatically handles common error types
- `isAuthError(error)`: Checks if error is 401 (authentication failed)
- `isValidationError(error)`: Checks if error is 400 (validation failed)
- `isServerError(error)`: Checks if error is 500+ (server error)
- `getErrorMessage(error)`: Gets user-friendly error message

### 4. Component-Level Error Handling

```tsx
const MyComponent = () => {
  const { token, errorMessage, setErrorMessage } = userAuth();
  
  useEffect(() => {
    // Clear error messages when component unmounts
    return () => {
      setErrorMessage(null);
    };
  }, [setErrorMessage]);
  
  if (!token) {
    return <div>Please log in to access this feature</div>;
  }
  
  return (
    <div>
      {/* Component content */}
      {errorMessage && (
        <div className="error">{errorMessage}</div>
      )}
    </div>
  );
};
```

## Backend Error Response Mapping

Your backend returns specific error messages that are automatically handled:

- **400 - Missing fields**: "One of the fields is missing"
- **400 - User not found**: "Invalid email or password" 
- **400 - Wrong password**: "Email or password not correct"
- **500 - Server error**: "Internal Server Error"

These messages are automatically displayed to users through the `errorMessage` context value.

## Security Considerations

### 1. Token Storage

- Token is stored in both `localStorage` and context state
- Context state provides immediate access without localStorage calls
- Token is automatically cleared on logout

### 2. Token Expiration

```tsx
const checkTokenExpiration = () => {
  // You can implement JWT expiration checking here
  // For now, the token is cleared on logout or API 401 responses
};
```

### 3. Secure Logout

```
```