import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import ShopContextProvider from './contexts/ProductContext.tsx';
import { AuthProvider } from './contexts/AuthContext.tsx';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <AuthProvider>
      <ShopContextProvider>
        <App />
      </ShopContextProvider>
    </AuthProvider>
  </BrowserRouter>
);
