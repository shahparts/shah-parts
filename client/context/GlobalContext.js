import { isAuthenticated } from '@/components/Commons/Auth/Auth';
import { debounce } from 'lodash';
import { useRouter } from 'next/router';
import { createContext, useContext, useEffect, useState } from 'react';


const GlobalContext = createContext();

export function GlobalContextProvider({ children }) {
    function generateRandomId(length) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            result += characters.charAt(randomIndex);
        }

        return result;
    }
    const router = useRouter();
    const [userAuth, setUserAuth] = useState({});
    const [updateData, setUpdateData] = useState("");
    const [make, setMake] = useState("");
    const [model, setModel] = useState("");
    const [part, setPart] = useState("");
    const [partAccessorries, setPartAccessorries] = useState("");


    useEffect(() => {
        setUserAuth(isAuthenticated());

        return () => {

        }
    }, []);


    const setFilterValuesFun = async (mk, mdl, prt, prtaccry, NoRefresh) => {
        const randomId = generateRandomId(10);
        setMake(mk);
        setModel(mdl);
        setPart(prt);
        setPartAccessorries(prtaccry);
        if (NoRefresh !== "NoRefresh") {
            setUpdateData(randomId);
        }
    }


    useEffect(() => {
        console.log("context query", router?.query);
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