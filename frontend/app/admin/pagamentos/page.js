'use client'
import UserContext from "@/app/context/userContext";
import httpClient from "@/app/utils/httpClient";
import Link from "next/link";
import { useContext, useEffect, useState } from "react"


    







export default function Pagamentos(){
    const { user, setUser } = useContext(UserContext);
    const [listaPagamento, setlistaPagamento] = useState([]);


    function ListaPAg() {
        httpClient.get('/pagamento/listar')
            .then(r => {
                return r.json();
            })
            .then(r => {
                setlistaPagamento(r);
            })
    }

    useEffect(() => {
        ListaPAg();
    }, []);
    return(
        <div>
            <div className="cx-titulo-tela-admin">
                <h1>Usuário Cadastrados</h1>
                <a className="btn btn-primary" href="/admin/usuarios/cadastrar">Cadastrar novo usuário</a>
            </div>

            <div className="table-responsive cx-table-main">
                {
                    listaPagamento.length > 0 ?
                        <table className="table table-hover ">
                            <thead>
                                <th className="id-valor">Id</th>
                                <th>Cliente</th>
                                <th>Plano</th>
                                <th>Valor</th>
                                <th>Data de Pagamento</th>
                            </thead>
                            <tbody>
                                {
                                    listaPagamento.map(function (value, index) {
                                        return <tr key={index}>
                                            <td className="id-valor">{value.id}</td>
                                            <td>{value.usuario}</td>
                                            <td>{value.plano}</td>
                                            <td>{value.valor}</td>
                                            <td>{value.dataPgto}</td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </table>
                        :
                        <>Nenhum pagamento encontrado</>
                }
            </div>
        </div >
    )
}