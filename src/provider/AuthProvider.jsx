'use client'
const { AuthContext } = require("@/context");
const { useState, useEffect } = require("react")


const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedTeam, setSelectedTeam] = useState(null);

    useEffect(() => {
        const storedAuth = sessionStorage.getItem("authUser");
        const storedTeam = sessionStorage.getItem("selectedTeam");
        if (storedAuth) setAuth(JSON.parse(storedAuth));
        if (storedTeam) setSelectedTeam(JSON.parse(storedTeam));
        setLoading(false);
    }, []);

    //login email and password session storage
    useEffect(() => {
        if (auth !== null) {
            if (auth) {
                sessionStorage.setItem("authUser", JSON.stringify(auth))
            }
            else { sessionStorage.removeItem("authUser") };
        }
    }, [auth]);

    //login admin than selected team team data storage session
    useEffect(() => {
        if (selectedTeam) sessionStorage.setItem("selectedTeam", JSON.stringify(selectedTeam));
        else sessionStorage.removeItem("selectedTeam");
    }, [selectedTeam]);

    if (loading) return null;

    return (
        <AuthContext.Provider value={{ auth, setAuth, selectedTeam, setSelectedTeam }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;