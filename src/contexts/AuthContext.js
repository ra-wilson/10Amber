import React, { useContext, useEffect } from "react";
import { auth } from "../firebase";

const AuthContext = React.CreateContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }
useEffect(() => {
    auth.onAuthStateChanged(user => {
        setCurrentUser(user)
    })
})



  const value = {
    currentUser,
  };

  return <AuthContext>{children}</AuthContext>;
}
