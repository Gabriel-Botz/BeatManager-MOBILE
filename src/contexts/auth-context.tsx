import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import type { Administrador } from '@/lib/types';
import * as api from '@/lib/api';

interface AuthContextType {
  admin: Administrador | null;
  token: string | null;
  carregando: boolean;
  login: (email: string, senha: string) => Promise<boolean>;
  register: (nome: string, email: string, senha: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const CHAVE_TOKEN = 'beatmanager_token';
const CHAVE_ADMIN = 'beatmanager_admin';

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [admin, setAdmin] = useState<Administrador | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregar() {
      try {
        const [tokenSalvo, adminSalvo] = await AsyncStorage.multiGet([CHAVE_TOKEN, CHAVE_ADMIN]);
        if (tokenSalvo[1] && adminSalvo[1]) {
          setToken(tokenSalvo[1]);
          setAdmin(JSON.parse(adminSalvo[1]));
        }
      } catch {} finally {
        setCarregando(false);
      }
    }
    carregar();
  }, []);

  useEffect(() => {
    api.setOnUnauthorized(() => {
      AsyncStorage.multiRemove([CHAVE_TOKEN, CHAVE_ADMIN]);
      setToken(null);
      setAdmin(null);
      router.push('/login');
    });
  }, [router]);

  useEffect(() => {
    if (token && admin) {
      api.buscarPerfil(token).catch(() => {
        AsyncStorage.multiRemove([CHAVE_TOKEN, CHAVE_ADMIN]);
        setToken(null);
        setAdmin(null);
      });
    }
  }, [token, admin]);

  async function login(email: string, senha: string): Promise<boolean> {
    try {
      const res = await api.login({ email, senha });
      const administrador: Administrador = { id: res.id, nome: res.nome, email: res.email };
      setToken(res.token);
      setAdmin(administrador);
      await AsyncStorage.setItem(CHAVE_TOKEN, res.token);
      await AsyncStorage.setItem(CHAVE_ADMIN, JSON.stringify(administrador));
      return true;
    } catch {
      return false;
    }
  }

  async function register(nome: string, email: string, senha: string): Promise<boolean> {
    try {
      await api.cadastrar({ nome, email, senha });
      return true;
    } catch {
      return false;
    }
  }

  function logout() {
    setToken(null);
    setAdmin(null);
    AsyncStorage.multiRemove([CHAVE_TOKEN, CHAVE_ADMIN]);
  }

  return (
    <AuthContext.Provider value={{ admin, token, carregando, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}
