'use client'
import {  useRef, useContext, useState } from "react"
import httpClient from '../utils/httpClient';
import UserContext from "../context/userContext";

export default function Login() {

    const email = useRef('');
    const senha = useRef('');
    const { user, setUser } = useContext(UserContext);

    const[carregando, setCarregando] = useState(false);
    function autenticar() {
        setCarregando(true);
        let status = 0;
        if(email.current.value != '' && senha.current.value != ''){
            httpClient.post('/login/autenticar', {
                email: email.current.value,
                senha: senha.current.value
            })
            .then(r=> {
                status = r.status;
                return r.json();
            })
            .then(r=> {
                if(status == 200){
                    setUser(r.usuario);
                    localStorage.setItem("usuarioLogado", JSON.stringify(r.usuario));
                    if(r.usuario.perfilId == 4)
                        window.location.href = "/admin";
                    else
                        window.location.href = "/cliente";
                }
                else{
                    alert(r.msg);
                }
            })
            .catch(r => {

            })
            .finally(r=> {
                setCarregando(false);
            })
        }
        else{
            alert("Preencha os campos corretamente!");
        }
    }

    return (
        <div className="container h-100">
            <div className="d-flex justify-content-center h-100">
                <div className="user_card">
                    <div className="d-flex justify-content-center">
                        <div className="brand_logo_container">
                            <img src="/img/LOGO.png" className="brand_logo" alt="Logo" />
                        </div>
                    </div>
                    <div className="d-flex justify-content-center form_container">
                        <form>
                            <div className="input-group mb-3">
                                <div className="input-group-append">
                                    <span className="input-group-text"><i className="fas fa-user"></i></span>
                                </div>
                                <input ref={email} type="text" className="form-control input_user" placeholder="E-Mail" />
                            </div>
                            <div className="input-group mb-2">
                                <div className="input-group-append">
                                    <span className="input-group-text"><i className="fas fa-key"></i></span>
                                </div>
                                <input ref={senha} type="password" className="form-control input_pass" placeholder="Senha" />
                            </div>
                            <div className="d-flex justify-content-center mt-3 login_container">
                            <button type="button" onClick={autenticar} className="btn login_btn">
                                {carregando ? "Carregando..." : "Login"}
                            </button>                                
                            <a href="/" type="button" className="btn voltar_btn">Voltar</a>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    )
}