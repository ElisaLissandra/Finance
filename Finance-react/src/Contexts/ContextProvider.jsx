import { createContext, useContext, useState } from 'react';


const stateContext = createContext({
    user:null,
    token:null,
    setUser: () => {},
    setToken: () => {}
});


export const ContextProvider = ({children}) => {
    
    const [user, setUser ] = useState({});

    // Recupera o token armazenado no localStorage
    const [token, _setToken ] = useState(localStorage.getItem('ACCESS_TOKEN'));
    
    const setToken = (token) => {
        _setToken(token);
        if(token) {
            localStorage.setItem('ACCESS_TOKEN', token);

        }else {
            localStorage.removeItem('ACCESS_TOKEN');
        }
    }

    return (
        <stateContext.Provider value={{user, setUser, token, setToken }}>
            {children}
        </stateContext.Provider>
    );
}

export const useStateContext = () => useContext(stateContext);



