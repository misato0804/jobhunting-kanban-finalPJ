import React, {createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState} from "react";
import {Seeker} from "../../types/Seeker";
import Seeker1 from "../../data/Seeker"
import axios from "axios";
import {useCookies} from "react-cookie";
import {useNavigate} from "react-router-dom";

type Props = {
    children: ReactNode
};

type seekerContext = {
    seeker: Seeker | undefined,
    setSeeker: Dispatch<SetStateAction<Seeker | undefined>>,
    loadingSeeker: boolean,
    setLoadingSeeker: Dispatch<SetStateAction<boolean>>,
    createSeeker: (data: Seeker) => void,
    loginSeeker: (email: string, password: string) => void,
    updateSeeker: (seeker_id: string, data: Seeker) => void,
    getSeekerData: (seeker_id: string) => void
}

const seekerContext = createContext({} as seekerContext);

export const useSeekerContext = () => {
    return useContext(seekerContext)
}

export const SeekerProvider = ({children}: Props) => {

    const [loadingSeeker, setLoadingSeeker] = useState<boolean>(true)
    const [seeker, setSeeker] = useState<Seeker | undefined>();
    const [cookies, setCookie] = useCookies();
    const navigate = useNavigate();

    const createSeeker = async (newUser: Seeker) => {
        if (newUser === null) {
            console.log("no user");
            return;
        }
        try {
            let res = await axios({
                    method: "post",
                    url: "http://localhost:8080/auth/signup",
                    data: newUser,
                    withCredentials: true
                }
            );
            console.log(res.data)
            setCookie("JWT_TOKEN", res.data.token);
            setCookie("seeker_id", res.data.seeker_id)
            setSeeker(newUser!)
            navigate("/user", {replace: true});
        } catch (e: any) {
            console.log(e);
        }
    };

    const loginSeeker = async (email: string, password: string) => {
        try {
            let res = await axios({
                method: "post",
                url: "http://localhost:8080/auth/login",
                data: {email, password},
                withCredentials: true
            })
            console.log(res.data)
            setCookie("JWT_TOKEN", res.data.token);
            setCookie("seeker_id", res.data.seeker.seeker_id)
            setSeeker(res.data.seeker)
            navigate("/user", {replace: true});
        } catch (e: any) {
            console.log(e)
        }
    }

    const updateSeeker = async (seeker_id: string, data: Seeker) => {
        try {
            let res = await axios({
                method: "patch",
                url: `http://localhost:8080/seekers/${seeker_id}`,
                data,
                withCredentials: true,
                headers: {
                    authorization: `Bearer ${cookies.JWT_TOKEN}`
                }
            })
            setSeeker(res.data.updatingSeeker.rows[0])
        } catch (e: any) {
            console.log(e.message)
        }
    }

    const getSeekerData = async (seeker_id: string) => {
        try {
            let res = await axios({
                method: "get",
                url: `http://localhost:8080/seekers/${seeker_id}`,
                withCredentials: true,
                headers: {
                    authorization: `Bearer ${cookies.JWT_TOKEN}`
                }
            })
            console.log(res.data)
            setSeeker(res.data.seeker)
        } catch (e : any) {
            console.log(e.message)
        }
    }

    return (
        <seekerContext.Provider value={{seeker, setSeeker, loadingSeeker, setLoadingSeeker,createSeeker, loginSeeker, updateSeeker, getSeekerData}}>
            {children}
        </seekerContext.Provider>
    )
}