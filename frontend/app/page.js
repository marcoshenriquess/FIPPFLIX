'use client'
import imgLogo from '../public/img/LOGO.png';
import httpClient from './utils/httpClient';
import { useEffect, useRef, useState, useContext } from "react"
import UserContext from "./context/userContext";
import { Alert } from '@/public/template/js/bootstrap.bundle';

export default function Home() {

  const nome = useRef("");
  const email = useRef("");
  const senha = useRef("");
  const plano = useRef();
  const { user, setUser } = useContext(UserContext);

 function cadastrarUsuario() {
    let status = 0;
    if(nome.current.value != "" && 
        email.current.value != "" &&
        plano.current.value != 0 &&
        senha.current.value != "") {
        let PlanoAt = plano.current.value;
        let NomeAt = nome.current.value;

        httpClient.post('/usuario/criar', {
            nome: nome.current.value,
            email: email.current.value,
            plano: plano.current.value,
            senha: senha.current.value,
            perfilId: 1
          })
        .then(r=> {
            status = r.status;
            return r.json();
        })
        .then( r=> {
            if(status == 200){      
              nome.current.value = "";
              email.current.value = "";
              plano.current.value = 0;
              senha.current.value = "";  
              realizarPagamento(500,PlanoAt,NomeAt,1,1); 
            }
        })
      }
    else{
        alert("Preencha os campos corretamente!");
    }
}
function realizarPagamento(valor, plano, nome, planoId,usuId) {
  let status = 0;
  httpClient.post('/pagamento/checkout', {
      valor: valor,
      plano: plano,
      nome: nome,
      planoId: planoId,
      usuId: usuId
  })
      .then(r => {
          status = r.status;
          return r.json();
      })
      .then(r => {
          if (status == 200) {
              window.location.href = r.url;
          }
      })
}
  return (

    <div>
      <div class="home-header">
        <section class="cx-header-logo">
                    <a href="/"><img src="/img/LOGO.png" className='img-logo'></img></a>
        </section>
        <section class="cx-header-link">
          <a href="#home-planos">Planos</a>
          <a href="#home-sobre">Sobre</a>
        </section>{
          user != null ? <a class="cx-header-register" href="/cliente">{user.nome}  <br></br> Área do cliente</a> :    
            <section class="cx-header-register">
            <a href="/login">Entrar</a>
            <hr />
            <a href="#home-cadastrar">Cadastrar</a>         
        </section>
        }

      </div>
      <div class="home-nav">
        <div className='nav-title'>
          <h3>Conectando paixões, transmitindo emoções. </h3>
          <h1>Bem-vindo ao FippFlix da sua diversão!</h1>
        </div>
        <div className='nav-btt'>
          <a href="#home-cadastrar" className="btn btn-primary">Cadastrar-se</a>
        </div>
      </div>
      <div id='home-sobre'>
        <div className='cx-sobre'>
          <div className='cx-title-sobre'>
            <h1>O que é a FIPPFLIX?</h1>

            <p>Bem-vindo à FIPPFLIX, a sua nova plataforma de streaming que oferece uma experiência única de entretenimento online. Na FIPPFLIX, acreditamos em conectar pessoas por meio de conteúdo envolvente e cativante. Seja filmes emocionantes, séries originais, ou documentários inspiradores, temos algo para todos os gostos.</p>
            <p>Explore nossa vasta biblioteca de conteúdo, que abrange desde clássicos atemporais até as últimas novidades. Esteja você procurando por ação, comédia, drama, ou documentários educativos, a FIPPFLIX tem tudo a seu alcance.</p>
            <p>Assista à FIPPFLIX em qualquer lugar, a qualquer momento. Esteja você no seu computador, tablet ou smartphone, proporcionamos uma experiência de streaming perfeita em todas as plataformas.</p>
          </div>
        </div>
      </div>
      <div id="home-planos">
        <dv className="title-planos">
          <h1>Confira nossos planos</h1>
        </dv>
        <dic class="row">
          <div class="card card-edit col">
            <div className="cx-card-title">
              <h5 class="card-title">Plano 01</h5>
            </div>
            <div className="cx-card-img">
              <img src="https://files.tecnoblog.net/wp-content/uploads/2015/07/netflix-logo.png" class="card-img-top"
                alt="..."></img>
            </div>
            <div class="card-body cx-card-item">
              <div class="item-ul">
                <ul class="list-group">
                  <li class="list-group-item"><i class="icon-edit fas fa-check"></i> An item</li>
                  <li class="list-group-item"><i class="icon-edit fas fa-check"></i> A second item</li>
                  <li class="list-group-item"><i class="icon-edit fas fa-check"></i> A third item</li>
                </ul>
              </div>
            </div>
            <div className="cx-card-bt">
              <a href="#home-cadastrar" class="btn btn-primary btn-edit">Assinar</a>
            </div>
          </div>
          <div class="card card-edit col">
            <div className="cx-card-title">
              <h5 class="card-title">Plano 02</h5>
            </div>
            <div className="cx-card-img">
              <img src="https://files.tecnoblog.net/wp-content/uploads/2015/07/netflix-logo.png" class="card-img-top"
                alt="..."></img>
            </div>
            <div class="card-body cx-card-item">
              <div class="item-ul">
                <ul class="list-group">
                  <li class="list-group-item"><i class="icon-edit fas fa-check"></i> An item</li>
                  <li class="list-group-item"><i class="icon-edit fas fa-check"></i> A second item</li>
                  <li class="list-group-item"><i class="icon-edit fas fa-check"></i> A third item</li>
                  <li class="list-group-item"><i class="icon-edit fas fa-check"></i> A fourth item</li>
                </ul>
              </div>
            </div>
            <div className="cx-card-bt">
              <a href="#home-cadastrar" class="btn btn-primary btn-edit">Assinar</a>
            </div>
          </div>
          <div class="card card-edit col">
            <div className="cx-card-title">
              <h5 class="card-title">Plano 03</h5>
            </div>
            <div className="cx-card-img">
              <img src="https://files.tecnoblog.net/wp-content/uploads/2015/07/netflix-logo.png" class="card-img-top"
                alt="..."></img>
            </div>
            <div class="card-body cx-card-item">
              <div class="item-ul">
                <ul class="list-group">
                  <li class="list-group-item"><i class="icon-edit fas fa-check"></i> An item</li>
                  <li class="list-group-item"><i class="icon-edit fas fa-check"></i> A second item</li>
                  <li class="list-group-item"><i class="icon-edit fas fa-check"></i> A third item</li>
                  <li class="list-group-item"><i class="icon-edit fas fa-check"></i> A fourth item</li>
                  <li class="list-group-item"><i class="icon-edit fas fa-check"></i> And a fifth one</li>
                </ul>
              </div>
            </div>
            <div className="cx-card-bt">
              <a href="#home-cadastrar" class="btn btn-primary btn-edit">Assinar</a>
            </div>
          </div>
        </dic>
      </div>

      <div id='home-cadastrar'>
        <div className='title-cadastro'>
          <h1>Cadastra-se e adquira <br />um dos nossos planos</h1>
        </div>
        <div className='formulario'>
          <form>
            <div class="mb-3">
              <label for="exampleInputNome" class="form-label">Seu nome:</label>
              <input ref={nome} type="text" class="form-control" id="exampleInputNome" />
            </div>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">Email:</label>
              <input ref={email} type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
            </div>
            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label">Senha:</label>
              <input ref={senha} type="password" class="form-control" id="exampleInputPassword1" />
            </div>
            <div class="mb-3">
              <label for="disabledSelect" class="form-label">Escolha o plano:</label>
              <select ref={plano} id="disabledSelect" class="form-select">
                <option>Plano 01</option>
                <option>Plano 02</option>
                <option>Plano 03</option>
              </select>
            </div>
            <button onClick={cadastrarUsuario} type="submit" class="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
      <div className='footer'>
        Todos os direitos reservados
      </div>
    </div>
  )
}
