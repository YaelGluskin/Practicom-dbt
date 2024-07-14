import React, { createContext, useState } from 'react';
export const UserContext = createContext(); // Context for managing user data.

/**
 * Provider component for UserContext.
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components.
 * @returns {React.ReactNode} The rendered component.
 */
export const UserProvider = ({ children }) => { // Provider component for UserContext.
    const [user, setUser] = useState(null); // State for user data.

    return ( // Return the provider with the user data.
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};
