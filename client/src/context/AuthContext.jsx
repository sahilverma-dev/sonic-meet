import { createContext, useContext, useEffect, useState } from "react";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, firestore } from "../firebase/config";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getUser = async () => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          setUser(user);
          setLoading(false);
        }
        if (!user) {
          setUser(null);
          setLoading(false);
        }
      });
    };
    return getUser();
  }, []);

  const login = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);
      await setDoc(
        doc(firestore, "user", `${user?.uid}`),
        {
          name: user?.displayName,
          email: user?.email,
          photo: user?.photoURL,
          lastLogin: serverTimestamp(),
        },
        { merge: true }
      );
      setUser(user);
      return user;
    } catch (error) {
      console.log(error);
      setUser(null);
      return error;
    }
  };

  const logout = async () => {
    console.log("Logout");
    signOut(auth);
    setUser(null);
    return user;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {loading || children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};

export { useAuth, AuthProvider };
