'use client'
import httpClient from '../utils/httpClient';
import UserContext from "../context/userContext";
import { useContext } from "react";

export default function BarSerachNav({ children }) {
    const { user, setUser } = useContext(UserContext);

    function logout() {
        let status = 0;
        httpClient.get('/login/logout')
        .then(r=> {
            status = r.status;
        })
        .then(r=> {
            if(status == 200){
                setUser(null);
                localStorage.removeItem("usuarioLogado")
                window.location.href = '/';
            }
        })
      }
    return (
        <div className="body-cliente">
            <div className="home-header">
                <div className="cx-header-logo">
                    <a href="/"><img src="/img/LOGO.png" className='img-logo'></img></a>
                </div>
                <div className="cx-header-link">
                <a  href="/cliente">Videos</a>
                    {
                        user.perfilId == 5
                        ?
                        <a href='/cliente/conteudo'>Criar Conteudo</a>
                        :
                        <></>
                    }
                    
                <button onClick={logout} className='btn btn-primary'><i className="fas fa-sign-out-alt"></i>Sair</button>
                </div>
            </div>
            <div className="conteudo-cliente">
                {children}
            </div>
        </div>
    )
}