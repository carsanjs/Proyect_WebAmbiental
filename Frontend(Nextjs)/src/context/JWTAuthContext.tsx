'use client'
import { createContext, useEffect, useReducer, useRef } from "react";
import { validateToken } from "../utils/jwt";
import { setSession, resetSession } from "../utils/session";
import axiosInstance from "../services/axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

interface User {
  user_id: string;
  user_name: string;
  nombre: string;
  correo: string;
  carrera: string;
  rol: string;
  last_login:string
}

export interface AuthState {
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: User | null;
}

interface AuthContextProps extends AuthState {
  login: (credentials: FormValues) => Promise<void>;
  logout: () => void;
}

interface Action {
  type: string;
  payload?: any;
}

interface FormValues {
  username: string;
  password: string;
}

const initialState: AuthState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null
};

export const AuthContext = createContext<AuthContextProps>({
  ...initialState,
  login: () => Promise.resolve(),
  logout: () => {}
});

const handlers: Record<string, (state: AuthState, action: Action) => AuthState> = {
  INITIALIZED: (state: AuthState, action: Action) => {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user
    };
  },
  LOGIN: (state: AuthState, action: Action) => {
    const { user } = action.payload;
    return {
      ...state,isAuthenticated: true,user

    };
  },
  LOGOUT: (state: AuthState) => {
    return {
      ...state,
      isAuthenticated: false,
      user: null
    };
  }
};

const reducer = (state: AuthState, action: Action): AuthState => {
  return handlers[action.type] ? handlers[action.type](state, action) : state;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) return;
    const initialize = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken && validateToken(accessToken)) {
          setSession(accessToken);
          const response = await axiosInstance.get("/users/detail/logged");
          const { data: user } = response;
          const rol = user?.rol;

          dispatch({
            type: "INITIALIZED",
            payload: {
              isAuthenticated: true,
              user,
              rol
            }
          });
        } else {
          dispatch({
            type: "INITIALIZED",
            payload: {
              isAuthenticated: false,
              user: null
            }
          });
        }
      } catch (error) {
        console.log(error);
        dispatch({
          type: "INITIALIZED",
          payload: {
            isAuthenticated: false,
            user: null
          }
        });
      }
    };
    initialize();
    isMounted.current = true;
  }, []);

  const getTokens = async ({ username, password }: FormValues) => {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    try {
      const response = await axiosInstance.post("/auth/login", formData);
      setSession(response.data.access_token, response.data.refresh_token);
    } catch (error) {
      console.log(error);
    }
  };

  const login = async ({ username, password }: FormValues)=> {
    try { 
      await getTokens({username, password});
      const response = await axiosInstance.get("/users/detail/logged");
      const { data: user } = response;
      console.log(response);
      dispatch({
        type: "LOGIN",
        payload: {
          user
        }
      });
      return user;
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        const axiosError = error;
        if (axiosError.response) {
          const errorMessage = axiosError.response.data.detail;
          toast.error(errorMessage);
        } else if (axiosError.request) {
          toast.error(
            "Error de conexión. Por favor, inténtelo de nuevo más tarde." + axiosError.message
          );
        } else {
          // Si ocurre un error en la configuración de la solicitud o durante la transformación de la respuesta
          toast.error("Error interno en la solicitud.");
        }
      } else {
        // Si el error no es de tipo AxiosError
        toast.error("Error desconocido.");
     
      }
      return undefined;
    }
  };

  const logout = () => {
    try {

      // Limpiar la sesión localmente
      resetSession();
  
      // Actualizar el estado local
      dispatch({
        type: "LOGOUT"
      });
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
    
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};