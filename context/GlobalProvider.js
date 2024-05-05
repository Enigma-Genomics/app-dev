import { useContext, createContext, useState, useEffect } from "react";
import { getCurrentUser } from "../lib/appwrite";

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({children}) => {
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
      getCurrentUser()
      .then((res) => {
        console.log(res);
        if(res){
            setIsSignedIn(true);
            setUser(res);
        } else {
            setIsSignedIn(false);
            setUser(null);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      })
    }, [])
    
    return(
    <GlobalContext.Provider
    value={{
        isSignedIn,
        setIsSignedIn,
        isLoading,
        setIsLoading,
        user,
        setUser
    }}
    >
        {children}
    </GlobalContext.Provider>
    )
}

export default GlobalProvider;