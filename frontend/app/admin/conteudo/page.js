'use client'


export default function Conteudo() {

    return (
        <div>
            <div className="cx-titulo-tela-admin">
                <h1>Conteúdos Cadastrados</h1>
                <a className="btn btn-primary" href="/admin/conteudo/cadastrar">Cadastrar novo conteúdo</a>
            </div>

            <div className="table-responsive cx-table-main">
                <table className="table table-hover ">
                    <thead>
                        <th className="id-valor">Id</th>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Perfil</th>
                        <th className="coluna-acoes">Ações</th>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="id-valor">TESTE</td>
                            <td>TESTE</td>
                            <td>TESTE</td>
                            <td>TESTE</td>
                            <td className="coluna-acoes">
                                <button className="btn btn-success">
                                    <i className="fas fa-pen"></i>
                                </button>
                                <button className="btn btn-primary">
                                    <i className="fas fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div >
    )
}