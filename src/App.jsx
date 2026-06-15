/**
 * App.jsx — Root component
 * Wraps the app in BrowserRouter and renders centralized routes.
 * Ready for future Supabase AuthProvider context wrapper.
 */
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import './styles/global.css';

const App = () => {
  return (
    <BrowserRouter>
      {/*
       * TODO: Wrap with <AuthProvider> once Supabase Auth is integrated.
       * <AuthProvider>
       *   <AppRoutes />
       * </AuthProvider>
       */}
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;
