import { isAuthenticated } from '@/components/Commons/Auth/Auth';
import { createContext, useContext, useEffect, useState } from 'react';


const GlobalContext = createContext();

export function GlobalContextProvider({ children }) {
    const [userAuth, setUserAuth] = useState({});
    const [make, setMake] = useState("");
    const [model, setModel] = useState("");
    const [part, setPart] = useState("");
    const [partAccessorries, setPartAccessorries] = useState("");


    useEffect(() => {
        setUserAuth(isAuthenticated());

        return () => {

        }
    }, []);

    const setFilterValuesFun = (mk, mdl, prt, prtaccry) => {
        console.log(mk, mdl, prt, prtaccry);
        setMake(mk);
        setModel(mdl);
        setPart(prt);
        setPartAccessorries(prtaccry);
    }


    return (
        <GlobalContext.Provider
            value={{
                userAuth,
                setFilterValuesFun,
                make,
                model,
                part,
                partAccessorries
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
}

export function useGlobalContext() {
    return useContext(GlobalContext);
}