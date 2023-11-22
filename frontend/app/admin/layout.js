'use client'

import { useContext, useEffect, useState } from "react";
import UserContext from "../context/userContext";


export default function AdminLayout({ children }) {

    const {user, setUser} = useContext(UserContext);

    return (
        <div className="cx-full-tela">
            <div className="navigation-components">
                <div className="cx-nav-admin">
                    <div className="logo-nav">
                        <a href="/"><img src="/img/LOGO.png" /></a>
                    </div>
                    <hr />
                    <div className="btn-nav">
                        <div className="cx-items-nav">
                            <a href="/" className="btn btn-primary btn-edit-nav"><span className="cx-icon-nav"><i className="fas fa-home"></i></span><hr />Home</a>
                            {
                                user.perfilId == 4 ? <a href="/admin/usuarios" className="btn btn-primary btn-edit-nav"><span className="cx-icon-nav"><i className="fa fa-user"></i></span><hr />Usuarios</a>
                                :
                                <a href="/admin/conteudo" className="btn btn-primary btn-edit-nav"><span className="cx-icon-nav"><i className="fa fa-play"></i></span><hr />Conteúdo</a>
                            }
                            <a href="/admin/pagamentos" className="btn btn-primary btn-edit-nav"><span className="cx-icon-nav"><i className="fa fa-money-check"></i></span><hr />Pagamentos</a>
                        </div>
                    </div>
                    <div className="footer-nav">
                        Todos os Direitos Reservados
                    </div>
                </div>
            </div>
            <div className="conteudo-admin">
                {children}
            </div>
        </div>
    )
}