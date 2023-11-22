'use client'
import { useEffect, useRef, useState } from "react"
import httpClient from "../utils/httpClient";
import Link from "next/link";

export default function UsuarioForm(props){


    const[usuario, setUsuario] = props.usuario ? useState(props.usuario) : useState({id: 0, nome: "", email: "", perfilId: 0, ativo: "N", senha: ""})
    const nome = useRef("");
    const email = useRef("");
    const senha = useRef("");
    const perfil = useRef(0);

    const [listaPerfil, setListaPerfil] = useState([]);

    function AlterarUsuario(){
        let status = 0;
        if(nome.current.value != "" &&
        email.current.value != "" &&
        perfil.current.value != 0 &&
        senha.current.value != ""){

            httpClient.put('/usuario/alterar', {
                id: usuario.id,
                nome: nome.current.value,
                email: email.current.value,
                perfilId: perfil.current.value,
                senha: senha.current.value
            })
            .then(r=> {
                status = r.status;
                return r.json();
            })
            .then(r=> {
                alert(r.msg);
                if(status == 200){
                    window.location.href = "/admin/usuarios"
                }
            })
        }
    }

    function ListarPerfil(){
        httpClient.get("/perfil/listar")
        .then(r=>{
            return r.json();
        })
        .then(r=>{
            setListaPerfil(r);
        })
    }

    function cadastrarUsuario() {
        let status = 0;
        if(nome.current.value != "" && 
            email.current.value != "" &&
            perfil.current.value != 0 &&
            senha.current.value != "") {
            
            httpClient.post('/usuario/criar', {
                nome: nome.current.value,
                email: email.current.value,
                perfilId: perfil.current.value,
                senha: senha.current.value
              })
            .then(r=> {
                status = r.status;
                return r.json();
            })
            .then(r=> {
                alert(r.msg);
                if(status == 200){
                    nome.current.value = "";
                    email.current.value = "";
                    perfil.current.value = 0;
                    senha.current.value = "";
                }
            })
        }
        else{
            alert("Preencha os campos corretamente!");
        }
    }

    useEffect(() => {
        ListarPerfil();
    }, []);

    return(
        <div className="tela-cadastro cx-table-main">
            <form className="row">
                <div className="mb-6">
                    <label for="NomeUsuario" className="form-label">Nome:</label>
                    <input  defaultValue={usuario.nome} ref={nome} type="text" className="form-control" id="NomeUsuario" />
                </div>
                <div className="mb-6">
                    <label for="EmailUsuario" className="form-label">Email:</label>
                    <input  defaultValue={usuario.email} ref={email} type="email" className="form-control" id="EmailUsuario" />
                </div>
                <div className="mb-6">
                    <label for="senhaUsuario" className="form-label">Password:</label>
                    <input  defaultValue={usuario.senha} ref={senha} type="password" className="form-control" id="senhaUsuario"/>
                </div>

                <div className="mb-4">
                    <label for="inputState" className="form-label">Tipo de Usuário:</label>
                    <select defaultValue={usuario.perfilId}  ref={perfil} id="inputState" className="form-select">
                        <option selected value={0}>--SELECIONE--</option>
                        {
                            listaPerfil.map(function(value, index){
                                return <option value={value.per_id}>{value.per_nome}</option>
                            })
                        }
                    </select>
                </div>
                <div className="col-12">
                    <button onClick={usuario.id != 0 ? AlterarUsuario : cadastrarUsuario} type="submit" className="btn btn-primary btn-edit">{usuario.id != 0 ? "Alterar" : "Cadastrar"}</button>
                    <Link href="/admin/usuarios" className="btn btn-outline-danger">Voltar</Link>
                </div>
            </form>
        </div>
    )
}