'use client'
import UsuarioForm from "@/app/componentes/usuarioForm";
import httpClient from "@/app/utils/httpClient";
import { useEffect, useState } from "react";

export default function AlterarUsuario({ params: { id } }) {
    const [usuario, setUsuario] = useState(null);

    function carregarUsuario() {
        httpClient.get(`/usuario/obter/${id}`)
            .then(r => {
                return r.json();
            })
            .then(r => {
                setUsuario(r);
            })
    }

    useEffect(() => {
        carregarUsuario();
    }, [])

    return (
        <div className="tela-cad-admin">
            <div className="cad-admin-tit">
                <h1>Alterar Dados do Usuário</h1>
            </div>
            <div className="cad-admin-form">
                {usuario != null ? <UsuarioForm usuario={usuario}></UsuarioForm> : <h3>Carregando......</h3>}
            </div>
        </div>
    )
}