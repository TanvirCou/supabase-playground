/**
 * AppRoutes — Central routing configuration.
 * Uses React Router DOM v6.
 * Extend with ProtectedRoute and AuthContext for real Supabase integration.
 */
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Auth routes */}
      <Route path="/login"    element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Dashboard */}
      <Route path="/" element={<Home />} />

      {/* Fallback — redirect unknown paths to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
