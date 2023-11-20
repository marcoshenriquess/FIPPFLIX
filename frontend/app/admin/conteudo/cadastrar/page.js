'use client'
import { useRef } from "react"

export default function CriarConteudo() {
    const youtubeId = useRef("");
    const titulo = useRef("");
    const disponivel = useRef("");
    const cat_id = useRef("");
  
   function cadastrarConteudo() {
      let status = 0;
      if(youtubeId.current.value != "" && 
          titulo.current.value != "" &&
          cat_id.current.value != "" 
          ) {
  
          httpClient.post('/conteudo/criar', {
              youtubeId: youtubeId.current.value,
              titulo: titulo.current.value,
              cat_id: cat_id.current.value,
              disponivel: disponivel.current.value,
              perfilId: 1
            })
          .then(r=> {
              status = r.status;
              return r.json();
          })
          .then( r=> {
              if(status == 200){      
                youtubeId.current.value = "";
                titulo.current.value = "";
                cat_id.current.value = 0;
                disponivel.current.value = "";  
                realizarPagamento(500,cat_idAt,youtubeIdAt,1,1); 
              }
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
                    <input type="titulo" class="form-control" id="idConteudo"/>
                </div>
                <div class="col-md-6">
                    <label for="tituloConteudo" class="form-label">Título</label>
                    <input type="text" class="form-control" id="tituloConteudo"/>
                </div>
                <div class="col-md-4">
                    <label for="inputState" class="form-label">Categoria</label>
                    <select id="inputState" class="form-select">
                        <option selected>Choose...</option>
                        <option>...</option>
                    </select>
                </div>
                <div class="col-12">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="gridCheck"/>
                            <label class="form-check-label" for="gridCheck">
                                Conteúdo Disponível?
                            </label>
                    </div>
                </div>
                <div class="col-12">
                    <a href="#" class="btn btn-primary btn-edit">Cadastrar</a>
                    <a href="/admin/conteudo" class="btn btn-primary btn-edit">Cancelar</a>
                </div>
            </form>
        </div>
    )
}