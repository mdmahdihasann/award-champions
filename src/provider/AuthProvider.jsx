'use client'
const { AuthContext } = require("@/context");
const { useState, useEffect } = require("react")


const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(null);

    useEffect(() => {
        const stored = localStorage.getItem("authUser");
        if (stored) setAuth(JSON.parse(stored));
    }, []);

    useEffect(() => {
        if (auth) localStorage.setItem("authUser", JSON.stringify(auth));
        else localStorage.removeItem("authUser");
    }, [auth]);

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;