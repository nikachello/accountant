import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import Cookies from "js-cookie";

interface Seller {
  id: string;
  name: string;
  comission: number;
}

interface AuthContextType {
  isLoggedIn: boolean;
  seller: Seller | null;
  loading: boolean;
  login: (sellerData: { token: string; seller: Seller }) => void;
  logout: () => void;
}

const initialAuthContext: AuthContextType = {
  isLoggedIn: false,
  seller: null,
  loading: true,
  login: () => {},
  logout: () => {},
};

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType>(initialAuthContext);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [seller, setSeller] = useState<Seller | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get("jwt");
    if (token) {
      setIsLoggedIn(true);
      setLoading(false);
    } else {
      setIsLoggedIn(false);
      setSeller(null);
      setLoading(false);
    }
  }, []);

  const login = (sellerData: { token: string; seller: Seller }) => {
    Cookies.set("jwt", sellerData.token, { expires: 7 });
    setIsLoggedIn(true);
    setSeller(sellerData.seller);
  };

  const logout = () => {
    Cookies.remove("jwt");
    setIsLoggedIn(false);
    setSeller(null);
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, seller, loading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
