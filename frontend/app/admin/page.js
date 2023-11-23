'use client'
import { useContext, useEffect, useState } from "react";
import LoadingPage from "../componentes/loadingPage";
import NaoAutorizado from "../componentes/naoAutorizado";
import UserContext from "../context/userContext";


export default function Admin() {

    const [isClient, setIsClient] = useState(false);
    const { user, setUser } = useContext(UserContext);

    useEffect(() => {
        setIsClient(true);
    })

    if(isClient == false){
        return (<LoadingPage></LoadingPage>)
    }
    if(isClient && user.perfilId != 4) {
        return (<NaoAutorizado></NaoAutorizado>)
    }
    return (
        <div className="text-rotas">
            <h1>Rota Inicial</h1>
        </div>
    )
}