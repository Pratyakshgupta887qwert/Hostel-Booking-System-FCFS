import {
  useCallback,
  createContext,
  startTransition,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  getAdminProfile,
  getErrorMessage,
  getStudentProfile,
  loginAdmin,
  loginStudent,
} from "../services/api";

const defaultAuthContext = {
  session: null,
  user: null,
  role: null,
  isAuthenticated: false,
  isBootstrapping: true,
  signIn: async () => {},
  signOut: () => {},
  refreshProfile: async () => null,
};

const AuthContext = createContext(defaultAuthContext);

const STORAGE_KEYS = {
  token: "auth_token",
  role: "auth_role",
  user: "auth_user",
};

const readStoredSession = () => {
  const token = localStorage.getItem(STORAGE_KEYS.token);
  const role = localStorage.getItem(STORAGE_KEYS.role);
  const userJson = localStorage.getItem(STORAGE_KEYS.user);

  if (!token || !role) return null;

  try {
    return { token, role, user: userJson ? JSON.parse(userJson) : null };
  } catch {
    return { token, role, user: null };
  }
};

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(() => readStoredSession());
  const [isBootstrapping, setIsBootstrapping] = useState(true);
  const pendingLoginRef = useRef(null);

  const persistSession = useCallback(({ token, role, user }) => {
    localStorage.setItem(STORAGE_KEYS.token, token);
    localStorage.setItem(STORAGE_KEYS.role, role);
    localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(user));
    startTransition(() => setSession({ token, role, user }));
  }, []);

  const clearSession = useCallback(() => {
    pendingLoginRef.current = null;
    localStorage.removeItem(STORAGE_KEYS.token);
    localStorage.removeItem(STORAGE_KEYS.role);
    localStorage.removeItem(STORAGE_KEYS.user);
    startTransition(() => setSession(null));
  }, []);

  const refreshProfile = useCallback(
    async (roleOverride) => {
      const currentSession = readStoredSession();
      const activeRole = roleOverride || currentSession?.role;
      const token = currentSession?.token;
      if (!activeRole || !token) return null;

      const response =
        activeRole === "admin"
          ? await getAdminProfile()
          : await getStudentProfile();
      persistSession({ token, role: activeRole, user: response.user });
      return response.user;
    },
    [persistSession],
  );

  const signIn = useCallback(
    async ({ role, email, password }) => {
      if (pendingLoginRef.current) return pendingLoginRef.current;

      const loginFn = role === "admin" ? loginAdmin : loginStudent;
      const request = (async () => {
        const loginResponse = await loginFn({ email, password });
        localStorage.setItem(STORAGE_KEYS.token, loginResponse.token);
        localStorage.setItem(STORAGE_KEYS.role, role);

        try {
          await refreshProfile(role);
        } catch (error) {
          clearSession();
          throw new Error(
            getErrorMessage(
              error,
              "Login worked, but profile could not be loaded.",
            ),
          );
        }
      })();

      pendingLoginRef.current = request;
      try {
        await request;
      } finally {
        pendingLoginRef.current = null;
      }
    },
    [clearSession, refreshProfile],
  );

  useEffect(() => {
    const bootstrap = async () => {
      const stored = readStoredSession();
      if (!stored?.token || !stored?.role) {
        setIsBootstrapping(false);
        return;
      }
      try {
        await refreshProfile(stored.role);
      } catch {
        clearSession();
      } finally {
        setIsBootstrapping(false);
      }
    };
    bootstrap();
  }, [clearSession, refreshProfile]);

  return (
    <AuthContext.Provider
      value={{
        session,
        user: session?.user ?? null,
        role: session?.role ?? null,
        isAuthenticated: Boolean(session?.token),
        isBootstrapping,
        signIn,
        signOut: clearSession,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
