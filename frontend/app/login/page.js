'use client'

export default function Login() {


    return (
        <div class="container h-100">
            <div class="d-flex justify-content-center h-100">
                <div class="user_card">
                    <div class="d-flex justify-content-center">
                        <div class="brand_logo_container">
                            <img src="/img/LOGO.png" class="brand_logo" alt="Logo" />
                        </div>
                    </div>
                    <div class="d-flex justify-content-center form_container">
                        <form>
                            <div class="input-group mb-3">
                                <div class="input-group-append">
                                    <span class="input-group-text"><i class="fas fa-user"></i></span>
                                </div>
                                <input type="text" class="form-control input_user" placeholder="username" />
                            </div>
                            <div class="input-group mb-2">
                                <div class="input-group-append">
                                    <span class="input-group-text"><i class="fas fa-key"></i></span>
                                </div>
                                <input type="password" class="form-control input_pass" placeholder="password" />
                            </div>
                            <div class="d-flex justify-content-center mt-3 login_container">
                                <button type="button" class="btn login_btn">Login</button>
                                <a href="/" type="button" class="btn voltar_btn">Voltar</a>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    )
}