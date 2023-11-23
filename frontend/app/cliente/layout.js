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
                    <a href="/cliente">Videos</a>
                    <a href="#">Minha lista</a>
                    {
                        user.perfilId == 5
                        ?
                        <a href='/cliente/conteudo'>Criar Conteudo</a>
                        :
                        <></>
                    }
                    <div className="input-group mb-3 inpt-edit">
                        <input type="text" className="form-control edit-inpt-form" placeholder="Pesquisar" aria-label="Recipient's username" aria-describedby="button-addon2" />
                        <button className="btn btn-outline-danger" type="button" id="button-addon2"><i className='fa fa-search'></i></button>
                    </div>
                </div>

                <div className="cx-header-register">
                    <button onClick={logout} className='btn btn-primary'><i className="fas fa-sign-out-alt"></i>Sair</button>
                </div>
            </div>
            <div className="conteudo-cliente">
                {children}
            </div>
        </div>
    )
}