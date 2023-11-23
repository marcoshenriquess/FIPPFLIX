'use client'
import { useEffect, useRef, useState } from "react"
import httpClient from "@/app/utils/httpClient"

export default function CriarConteudo() {
    //Precisa setar o id da categoria na referência e setar o disponivel true/false baseado no checked
    const youtubeId = useRef("");
    const titulo = useRef("");
    const disponivel = useRef("");
    const cat_id = useRef("");

    const [listaCat, setListaCat] = useState([]);

    function ListarCategoria() {
        httpClient.get('/categoria/listar')
            .then(r => {
                return r.json();

            })
            .then(r => {
                setListaCat(r);
            })
    }

    function cadastrarConteudo() {
        let status = 0;
        if (youtubeId.current.value != "" &&
            titulo.current.value != ""
        ) {

            httpClient.post('/conteudo/criar', {
                youtubeId: youtubeId.current.value,
                titulo: titulo.current.value,
                cat_id: cat_id.current.value,
                disponivel: disponivel.current.checked ? "S" : "N"
            })
                .then(r => {
                    status = r.status;
                    return r.json();
                })
                .then(r => {
                    alert(r.msg);
                    if (status == 200) {
                        youtubeId.current.value = "";
                        titulo.current.value = "";
                        cat_id.current.value = 0;
                        disponivel.current.checked = false;
                    }
                })
        }
        else {
            alert("Preencha os campos corretamente!");
        }
    }
    useEffect(() => {
        ListarCategoria();
    }, []);
    return (
        <div className=" form-cad-conteudo">
            <div className="tela-cadastro cx-table-main form-edit">
                <form className="row g-3">
                    <div className="col-ml-6">
                        <label for="idConteudo" className="form-label">ID do Video</label>
                        <input ref={youtubeId} type="text" className="form-control" id="idConteudo" />
                    </div>
                    <div className="col-ml-6">
                        <label for="tituloConteudo" className="form-label">Título</label>
                        <input ref={titulo} type="text" className="form-control" id="tituloConteudo" />
                    </div>
                    <div className="col-ml-4">
                        <label for="inputState" className="form-label">Categoria</label>
                        <select ref={cat_id} id="inputState" className="form-select">
                            <option selected >---SELECIONE---</option>
                            {
                                listaCat.map(function (value, index) {
                                    return <option value={value.id}>{value.nome}</option>
                                })
                            }
                        </select>
                    </div>
                    <div className="col-12">
                        <div className="form-check">
                            <input ref={disponivel} className="form-check-input" type="checkbox" id="gridCheck" />
                            <label className="form-check-label" for="gridCheck">
                                Conteúdo Disponível?
                            </label>
                        </div>
                    </div>
                    <div className="col-12">
                        <button onClick={cadastrarConteudo} className="btn btn-primary btn-edit" >Cadastrar</button>
                        <a href="/admin/conteudo" className="btn btn-outline-danger btn-edit">Cancelar</a>
                    </div>
                </form>
            </div>
        </div>
    )
}