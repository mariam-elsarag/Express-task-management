import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import Cookies from "js-cookie";
import { io } from "socket.io-client";
import { apiUrl } from "../servicses/axiosInstance";

interface userType {
  full_name: string | undefined;
  avatar: string | undefined;
  role: string | undefined;
}
interface AuthContextType {
  token: string | undefined;
  setToken: React.Dispatch<React.SetStateAction<string | undefined>>;
  user: userType;
  setUser: React.Dispatch<React.SetStateAction<userType>>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);
const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // for socket
  const [socket, setSocket] = useState(null);
  const [token, setToken] = useState<string | undefined | null>(
    Cookies.get("token")
  );
  const [user, setUser] = useState<userType>({
    full_name: Cookies.get("full_name"),
    avatar: Cookies.get("avatar"),
    role: Cookies.get("role"),
  });
  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("full_name");
    Cookies.remove("avatar");
    Cookies.remove("role");
    setToken(null);
    setUser({ full_name: undefined, role: undefined, avatar: undefined });
  };
  useEffect(() => {
    if (token) {
      const connectSocket = io(apiUrl, {
        auth: {
          token,
        },
      });
      setSocket(connectSocket);
      console.log("connect to socket");
      return () => connectSocket.close();
    } else {
      if (socket) {
        socket.disconnect();
        setSocket(null);
      }
    }
  }, [token]);
  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        user,
        setUser,
        socket,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth() {
  const context = useContext(AuthContext);
  if (context === null)
    throw new Error("AuthContext used outside the AuthProvider");
  return context;
}

export { AuthProvider, useAuth };
