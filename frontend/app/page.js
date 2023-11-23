'use client'
import httpClient from './utils/httpClient';
import { useEffect, useRef, useState, useContext } from "react"
import UserContext from "./context/userContext";
import '../public/template/js/bootstrap.bundle';


export default function Home() {

  const nome = useRef("");
  const email = useRef("");
  const senha = useRef("");
  const plano = useRef(0);
  let idUsuAtual = "";
  const { user, setUser } = useContext(UserContext);
  const [ListaPlano, setListaPlano] = useState([]);

  function logout() {
    let status = 0;
    httpClient.get('/login/logout')
      .then(r => {
        status = r.status;
      })
      .then(r => {
        if (status == 200) {
          setUser(null);
          localStorage.removeItem("usuarioLogado")
          window.location.href = '/';
        }
      })
  }
  function carregarPlano() {
    httpClient.get('/plano/listar')
      .then(r => {
        return r.json();
      })
      .then(r => {
        setListaPlano(r);
      })
  }
  function realizaCadastro(){
    cadastrarUsuario();
     
  }
  function cadastrarUsuario() {
    let status = 0;
    if (nome.current.value != "" &&
      email.current.value != "" &&
      plano.current.value != 0 &&
      senha.current.value != "") {


      httpClient.post('/usuario/criar', {
        nome: nome.current.value,
        email: email.current.value,
        plano: plano.current.value,
        senha: senha.current.value,
        perfilId: 3
      })
        .then(r => {
          status = r.status;
          return r.json();
        })
        .then(r => {
          
          if (status == 200) {
            realizarPagamento(r.usu.id);
            nome.current.value = "";
            email.current.value = "";
            plano.current.value = 0;
            senha.current.value = "";
          }
        })
    }
    else {
      alert("Preencha os campos corretamente!");
    }
  }
  function realizarPagamento(id) {
    let status = 0;
    httpClient.post('/pagamento/checkout', {
      nome: nome.current.value,
      planoId: plano.current.value,
      usuId: id
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


  useEffect(() => {
    carregarPlano();
  }, [])
  return (

    <div>



      <div className="home-header">
        <div className="cx-header-logo">
          <a href="/"><img src="/img/LOGO.png" className='img-logo'></img></a>
        </div>
        <div className="cx-header-link">
          <a href="#home-planos">Planos</a>
          <a href="#home-sobre">Sobre</a>
          <a href="#footer">Desenvolvedores</a>
        </div>
        {
          user != null
            ?
            <div class="cx-dropdown">
              <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                {user.nome}
              </button>
              <ul class="dropdown-menu edit-menu-drop" aria-labelledby="dropdownMenuButton1">
                {
                  user.perfilId == 3
                    ?
                    <li><a class="dropdown-item" href="/cliente">Área do cliente</a></li>
                    :
                    user.perfilId == 4
                      ?
                      <li><a class="dropdown-item" href="/admin">Área do Administrador</a></li>
                      :
                      <li><a class="dropdown-item" href="/admin">Área de Criação</a></li>

                }
                <a href='/' class="dropdown-item" onClick={logout}>Sair</a>
              </ul>
            </div>
            :
            <div className="cx-header-register">
              <a href="/login">Entrar</a>
              <hr />
              <a href="#home-cadastrar">Cadastrar</a>
            </div>
        }
      </div>



      <div className="home-nav">
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
        <div className="title-planos">
          <h1>Confira nossos planos</h1>
        </div>
        <div className="row">
          {
            ListaPlano.map(function (value, index) {
              return <div className="card card-edit col">
                <div className="cx-card-title">
                  <h5 className="card-title">{value.pla_nome}</h5>
                </div>
                <div className="card-body cx-card-item">
                  <div className="item-ul">
                    <p>{value.pla_descricao}</p>
                  </div>
                </div>
                <div className="cx-card-bt">
                  {
                    user != null
                      ?
                      <a href="#home-sobre" className="btn btn-primary btn-edit">Assinar</a>
                      :
                      <a href="#home-cadastrar" className="btn btn-primary btn-edit">Assinar</a>
                  }
                </div>
              </div>
            })
          }
        </div>
      </div>

      <div id='home-cadastrar'>
        <div className='title-cadastro'>
          <h1>Cadastra-se e adquira <br />um dos nossos planos</h1>
        </div>
        <div className='formulario'>
          <form>
            <div className="mb-3">
              <label htmlFor="exampleInputNome" className="form-label">Seu nome:</label>
              <input ref={nome} type="text" className="form-control" id="exampleInputNome" />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Email:</label>
              <input ref={email} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Senha:</label>
              <input ref={senha} type="password" className="form-control" id="exampleInputPassword1" />
            </div>
            <div className="mb-3">
              <label htmlFor="selectPlano" className="form-label">Plano:</label>
              <select ref={plano} id="inputState" className="form-select">
                <option value={0}>---SELECIONE---</option>
                {
                  ListaPlano.map(function (value, index) {
                    return <option value={value.pla_id}>{value.pla_nome} - R${value.pla_valor}</option>
                  })
                }
              </select>

            </div>

            <button onClick={realizaCadastro} type="button" className="btn btn-primary">Cadastrar</button>
          </form>
        </div>
      </div>
      <div id='footer'>
        Todos os direitos reservados
      </div>
    </div>
  )
}
