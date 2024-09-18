import { isAuthenticated } from '@/components/Commons/Auth/Auth';
import { useRouter } from 'next/router';
import { createContext, useContext, useEffect, useState } from 'react';


const GlobalContext = createContext();

export function GlobalContextProvider({ children }) {
    const router = useRouter();
    const [userAuth, setUserAuth] = useState({});
    const [updateData, setUpdateData] = useState(false);
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
        setUpdateData(false);
        setMake(mk);
        setModel(mdl);
        setPart(prt);
        setPartAccessorries(prtaccry);
        setUpdateData(true);
    }

    useEffect(() => {
        console.log(router?.query?.Make);
        setFilterValuesFun(router?.query?.Make, router?.query?.Model, router?.query?.Part, router?.query?.PartAccessory);


        return () => {

        }
    }, [router.query]);


    return (
        <GlobalContext.Provider
            value={{
                userAuth,
                setFilterValuesFun,
                make,
                model,
                part,
                partAccessorries,
                updateData
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
}

export function useGlobalContext() {
    return useContext(GlobalContext);
}