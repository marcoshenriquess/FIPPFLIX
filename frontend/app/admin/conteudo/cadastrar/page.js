'use client'
import { useRef } from "react"
import httpClient from "@/app/utils/httpClient"
import { Alert } from "@/public/template/js/bootstrap.bundle";

export default function CriarConteudo() {
    //Precisa setar o id da categoria na referência e setar o disponivel true/false baseado no checked
    const youtubeId = useRef("");
    const titulo = useRef("");
    const disponivel = useRef("");
    const cat_id = useRef("");
  
   function cadastrarConteudo() {
      let status = 0;
      if(youtubeId.current.value != "" && 
          titulo.current.value != ""
          ) {
  
          httpClient.post('/conteudo/criar', {
              youtubeId: youtubeId.current.value,
              titulo: titulo.current.value,
              cat_id: 1,
              disponivel: 'S',
            })
          .then(r=> {
              status = r.status;
              return r.json();
          })
          .then( r=> {
              if(status == 200){      
                youtubeId.current.value = "";
                titulo.current.value = "";
                cat_id.current.value = "";
              }
              alert(r.msg);
          })
        }
      else{
          alert("Preencha os campos corretamente!");
      }
  }
    return (
        <div className="tela-cadastro cx-table-main">
            <form className="row g-3">
                <div className="col-md-6">
                    <label for="idConteudo" className="form-label">ID do Video</label>
                    <input ref={youtubeId} type="titulo" className="form-control" id="idConteudo"/>
                </div>
                <div className="col-md-6">
                    <label for="tituloConteudo" className="form-label">Título</label>
                    <input ref={titulo} type="text" className="form-control" id="tituloConteudo"/>
                </div>
                <div className="col-md-4">
                    <label for="inputState" className="form-label">Categoria</label>
                    <select ref={cat_id} id="inputState" className="form-select">
                        <option selected>Choose...</option>
                        <option>...</option>
                    </select>
                </div>
                <div className="col-12">
                    <div className="form-check">
                        <input ref={disponivel} className="form-check-input" type="checkbox" id="gridCheck"/>
                            <label className="form-check-label" for="gridCheck">
                                Conteúdo Disponível?
                            </label>
                    </div>
                </div>
                <div className="col-12">
                    <button onClick={cadastrarConteudo} className="btn btn-primary btn-edit" >Cadastrar</button>
                    <a href="/admin/conteudo" className="btn btn-primary btn-edit">Cancelar</a>
                </div>
            </form>
        </div>
    )
}