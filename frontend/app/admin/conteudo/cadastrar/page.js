'use client'
import { useRef } from "react"
import httpClient from "@/app/utils/httpClient"
import { Alert } from "@/public/template/js/bootstrap.bundle";

export default function CriarConteudo() {
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
            <form class="row g-3">
                <div class="col-md-6">
                    <label for="idConteudo" class="form-label">ID do Video</label>
                    <input ref={youtubeId} type="titulo" class="form-control" id="idConteudo"/>
                </div>
                <div class="col-md-6">
                    <label for="tituloConteudo" class="form-label">Título</label>
                    <input ref={titulo} type="text" class="form-control" id="tituloConteudo"/>
                </div>
                <div class="col-md-4">
                    <label for="inputState" class="form-label">Categoria</label>
                    <select ref={cat_id} id="inputState" class="form-select">
                        <option selected>Choose...</option>
                        <option>...</option>
                    </select>
                </div>
                <div class="col-12">
                    <div class="form-check">
                        <input ref={disponivel} class="form-check-input" type="checkbox" id="gridCheck"/>
                            <label class="form-check-label" for="gridCheck">
                                Conteúdo Disponível?
                            </label>
                    </div>
                </div>
                <div class="col-12">
                    <button onClick={cadastrarConteudo} class="btn btn-primary btn-edit" >Cadastrar</button>
                    <a href="/admin/conteudo" class="btn btn-primary btn-edit">Cancelar</a>
                </div>
            </form>
        </div>
    )
}