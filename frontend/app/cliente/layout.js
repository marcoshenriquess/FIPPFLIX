'use client'

export default function BarSerachNav({ children }) {
    return (
        <div className="body-cliente">
            <div class="home-header">
                <section class="cx-header-logo">
                    <a href="/"><img src="/img/LOGO.png" className='img-logo'></img></a>
                </section>
                <section class="cx-header-link">
                    <a href="#">Minha lista</a>
                    <a href="#">Meu Plano</a>
                    <div class="input-group mb-3 inpt-edit">
                        <input type="text" class="form-control edit-inpt-form" placeholder="Pesquisar" aria-label="Recipient's username" aria-describedby="button-addon2" />
                        <button class="btn btn-outline-danger" type="button" id="button-addon2">Button</button>
                    </div>
                </section>

                <section class="cx-header-register">
                    <a href="#home-cadastrar"><i class="fas fa-sign-out-alt"></i>Log-out</a>
                </section>
            </div>
            <div className="conteudo-cliente">
                {children}
            </div>
        </div>
    )
}