import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/nav";
import { AuthProvider, useAuth } from "./contexts/authcontext";
import Home from "./pages/home";
import Login from "./pages/login";
import PropertyDetails from "./pages/details";
import Cart from "./pages/cart";
import Like from "./pages/like";
import Profile from "./pages/profile";
import { Outlet } from "react-router-dom";
import "./index.css";
import Properties from "./pages/properties";
import Services from "./pages/services";
import Contact from "./pages/contact";

function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
}

function Layout() {
  const { user } = useAuth();
  return (
    <>
      {user && <Navbar />}
      <Outlet />
    </>
  );
}

function LoginWrapper() {
  const { user } = useAuth();
  return user ? <Navigate to="/" replace /> : <Login />;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/login" element={<LoginWrapper />} />
            <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
            <Route path="/property/:id" element={<PrivateRoute><PropertyDetails /></PrivateRoute>} />
            <Route path="/cart" element={<PrivateRoute><Cart /></PrivateRoute>} />
            <Route path="/like" element={<PrivateRoute><Like /></PrivateRoute>} />
            <Route path="/properties" element={<PrivateRoute><Properties /></PrivateRoute>} />
            <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} /> 
            <Route path="/services" element={<PrivateRoute><Services /></PrivateRoute>} /> ]
            <Route path="/contact" element={<PrivateRoute><Contact /></PrivateRoute>} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
