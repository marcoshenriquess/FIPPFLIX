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
        <div class="container h-100">
            <div class="d-flex justify-content-center h-100">
                <div class="user_card">
                    <div class="d-flex justify-content-center">
                        <div class="brand_logo_container">
                            <img src="/img/LOGO.png" class="brand_logo" alt="Logo" />
                        </div>
                    </div>
                    <div class="d-flex justify-content-center form_container">
                        <form>
                            <div class="input-group mb-3">
                                <div class="input-group-append">
                                    <span class="input-group-text"><i class="fas fa-user"></i></span>
                                </div>
                                <input ref={email} type="text" class="form-control input_user" placeholder="E-Mail" />
                            </div>
                            <div class="input-group mb-2">
                                <div class="input-group-append">
                                    <span class="input-group-text"><i class="fas fa-key"></i></span>
                                </div>
                                <input ref={senha} type="password" class="form-control input_pass" placeholder="Senha" />
                            </div>
                            <div class="d-flex justify-content-center mt-3 login_container">
                            <button type="button" onClick={autenticar} className="btn login_btn">
                                {carregando ? "Carregando..." : "Login"}
                            </button>                                
                            <a href="/" type="button" class="btn voltar_btn">Voltar</a>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    )
}