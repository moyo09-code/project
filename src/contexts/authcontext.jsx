import { createContext, useState, useEffect, useContext } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const login = ({ fullName, email, password }) => {
  if (!fullName || !email || !password) return;

  setUser({
    fullName,
    email,
    cart: [],
    likes: [],
  });
};

  const logout = () => setUser(null);

  const toggleLike = (property) => {
    setUser((prev) => {
      if (!prev) return prev;

      const exists = prev.likes.some((p) => p.id === property.id);
      return {
        ...prev,
        likes: exists
          ? prev.likes.filter((p) => p.id !== property.id)
          : [...prev.likes, property],
      };
    });
  };

  const addToCart = (property) => {
    setUser((prev) => {
      if (!prev) return prev;

      const exists = prev.cart.some((p) => p.id === property.id);
      if (exists) return prev;

      return {
        ...prev,
        cart: [...prev.cart, property],
      };
    });
  };

  const removeFromCart = (property) => {
    setUser((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        cart: prev.cart.filter((p) => p.id !== property.id),
      };
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        toggleLike,
        addToCart,
        removeFromCart,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
