'use client'
import httpClient from "@/app/utils/httpClient";
import { useEffect, useState } from "react"


export default function Usuario() {

    const [listaUsuario, setListaUsuario] = useState([]);

    function ListaUsu() {
        httpClient.get('/usuario/listar')
            .then(r => {
                return r.json();
            })
            .then(r => {
                setListaUsuario(r);
            })
    }

    useEffect(() => {
        ListaUsu();
    }, [])
    return (
        <div>
            <div className="cx-titulo-tela-admin">
                <h1>Usuário Cadastrados</h1>
                <a className="btn btn-primary" href="/admin/usuarios/cadastrar">Cadastrar novo usuário</a>
            </div>

            <div className="table-responsive cx-table-main">
                {
                    listaUsuario.length > 0 ?
                        <table className="table table-hover ">
                            <thead>
                                <th className="id-valor">Id</th>
                                <th>Nome</th>
                                <th>Email</th>
                                <th>Perfil</th>
                                <th className="coluna-acoes">Ações</th>
                            </thead>
                            <tbody>
                                {
                                    listaUsuario.map(function (value, index) {
                                        return <tr key={index}>
                                            <td className="id-valor">{value.id}</td>
                                            <td>{value.email}</td>
                                            <td>{value.nome}</td>
                                            <td>{value.perfilId}</td>
                                            <td className="coluna-acoes">
                                                <button onClick={() => excluirUsuario(value.id)} className="btn btn-success">
                                                    <i className="fas fa-pen"></i>
                                                </button>
                                                <button onClick={() => excluirUsuario(value.id)} className="btn btn-primary">
                                                    <i className="fas fa-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </table>
                        :
                        <>Nenhum usuário encontrado</>
                }
            </div>
        </div>
    )
}