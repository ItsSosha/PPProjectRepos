import { useContext, createContext } from "react";

const AuthContext = createContext();

const AuthProvider = ({children, value}) => {
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuthContext = () => useContext(AuthContext);

export {
    AuthProvider,
    useAuthContext,
}