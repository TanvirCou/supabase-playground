/**
 * AppRoutes — Central routing configuration.
 * Uses React Router DOM v6.
 * Extend with ProtectedRoute and AuthContext for real Supabase integration.
 */
import { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import { supabase } from '../utils/supabase';

const AppRoutes = () => {
  const [session, setSession] = useState(null);

  const handleSetSession = (session) => {
    setSession(session);
  };

  
  

  useEffect(() => {

    (async () => {
      const {data: {session: sessionData}} = await supabase.auth.getSession();
      if(sessionData){
        setSession(sessionData);
      }
    })()
    

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        setSession(session);
      } else if (event === 'SIGNED_OUT') {
        setSession(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);


 
  return (
    <Routes>
      <Route path="/login"    element={<Login onSetSession={handleSetSession} />} />
      <Route path="/register" element={<Register onSetSession={handleSetSession} />} />
      {/* Dashboard */}
      <Route path="/" element={<Home onSetSession={handleSetSession} userId={session?.user?.id}/>} />

      {/* Fallback — redirect unknown paths to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
