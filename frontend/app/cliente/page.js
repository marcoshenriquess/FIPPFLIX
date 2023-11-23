'use client'
import { useEffect, useState } from "react";
import httpClient from "../utils/httpClient"


export default function cliente() {

    const [listaCont, setListaCont] = useState([]);

    function listarConteudo() {
        httpClient.get('/conteudo/listar')
            .then(r => {
                return r.json();
            })
            .then(r => {
                setListaCont(r);
            })
    }
    function PlayVideo(id){
        window.location.href = `/cliente/video/${id}`;
    }
    useEffect(() => {
        listarConteudo();
    }, []);
    return (
        <div className="conteudos">
            <div className="cx-cards-conteudo">
                {
                    listaCont.map(function (value, index) {
                        return <div class="card card-edit card-thumb">
                            <div className="cx-video">
                                <img src={`https://i.ytimg.com/vi/${value.youtubeId}/hqdefault.jpg`} class="card-img-top" alt={`${value.titulo}`} />
                            </div>
                            <div className="cx-title-video">
                                <h5 class="card-title">{value.titulo}</h5>
                            </div>

                            <div className="cx-bt-video">
                                <button onClick={() => PlayVideo(value.youtubeId)} class="btn btn-primary">Assistir</button>
                            </div>
                        </div>
                    })
                }
                
            </div>
        </div>
    )
}