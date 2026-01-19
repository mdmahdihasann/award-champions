'use client'
const { AuthContext } = require("@/context");
const { useState, useEffect } = require("react")


const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(null); 
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const stored = sessionStorage.getItem("authUser");
        if (stored) {
            setAuth(JSON.parse(stored));
        } else {
            setAuth(null);
        }
        setLoading(false); 
    }, []);

    useEffect(() => {
        if (auth !== null) {
            if (auth) sessionStorage.setItem("authUser", JSON.stringify(auth));
            else sessionStorage.removeItem("authUser");
        }
    }, [auth]);

    if (loading) return null;

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;