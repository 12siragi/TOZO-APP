// src/hooks/useAuthentication.ts (or .js if you're not using TypeScript)
import { useState, useEffect } from 'react';

function useAuthentication() {
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        // Check if token exists in localStorage
        const token = localStorage.getItem('access_token');
        setIsAuthorized(!!token);  // Set isAuthorized to true if token exists
    }, []);

    const logout = () => {
        // Remove token from localStorage on logout
        localStorage.removeItem('access_token');
        setIsAuthorized(false);
    };

    return {
        isAuthorized,
        logout,
    };
}

export default useAuthentication;
