'use client'


export default function AdminLayout({ children }) {


    return (
        <div className="cx-full-tela">
        <div className="navigation-components">
            <div className="cx-nav-admin">
                <div className="logo-nav">
                    <img src="/img/LOGO.png"/>
                </div>
                <hr/>
                <div className="btn-nav">
                    <div className="cx-items-nav">
                        <a href="/" className="btn btn-primary btn-edit-nav"><span className="cx-icon-nav"><i className="fas fa-home"></i></span><hr/>Home</a>
                        <a href="/admin/conteudo" className="btn btn-primary btn-edit-nav"><span className="cx-icon-nav"><i class="fa fa-play"></i></span><hr/>Conteúdo</a>
                        <a href="/admin/pagamentos" className="btn btn-primary btn-edit-nav"><span className="cx-icon-nav"><i class="fa fa-money-check"></i></span><hr/>Pagamentos</a>
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