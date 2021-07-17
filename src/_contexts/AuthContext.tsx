import React from 'react';
import { firebase, auth } from '../_services/firebase';

type AuthContextProps = {
    children: React.ReactNode;
}
type User = {
    id: string,
    name: string,
    avatar: string
  }
  
  type AuthContextType = {
    user: User | undefined,
    signInWithGoogle: () => void;
  }
  
export const AuthContext = React.createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProps) {
    const [ user, setUser ] = React.useState<User>();

    React.useEffect(() => {
      // Aqui o firebase confere se o usuário já logou na aplicação
      // Se sim, ele retorna suas informações
      
      // Ao adicionar um event listener no useEffect 
      // é recomendado atribuí-lo a uma variável para que possa ser "desligado" depois
      const unsubscribe = auth.onAuthStateChanged( user => {
        if(user) {
          const { displayName, photoURL, uid } = user;
  
          if( !displayName || !photoURL ) {
            throw new Error("Missing information from Google Account");
          }
  
          setUser({
            id: uid,
            name: displayName,
            avatar: photoURL
          })
        }
      })
  
      return () => unsubscribe(); // "Delisga" o event listener
    }, []);
  
    function signInWithGoogle() {
      const provider = new firebase.auth.GoogleAuthProvider();
  
      auth.signInWithPopup(provider)
      .then( response => {
        if(response.user) {
          const { displayName, photoURL, uid } = response.user;
  
          if( !displayName || !photoURL ) {
            throw new Error("Missing information from Google Account");
          }
  
          setUser({
            id: uid,
            name: displayName,
            avatar: photoURL
          })
        }
      })
      
    }

    return(
        <AuthContext.Provider value={{ user, signInWithGoogle }}>
            {props.children}
        </AuthContext.Provider>
    );
}