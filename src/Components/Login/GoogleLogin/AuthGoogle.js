import { useContext, createContext } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {auth} from '../../../firebase'

const AuthContext = createContext()

export const AuthContextProvider = ({children}) =>{

    const googleSignIn = () =>{
        const provider = new GoogleAuthProvider()
        signInWithPopup(auth,provider)
    }
   console.log("googleSignIn123123")
    return(
        <AuthContextProvider value = {{}}>
            {children}
        </AuthContextProvider>
    )
}

export const UserAuth=()=>{
    return useContext(AuthContext)
}