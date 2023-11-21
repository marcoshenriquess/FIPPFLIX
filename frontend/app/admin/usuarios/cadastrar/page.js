import UsuarioForm from "@/app/componentes/usuarioForm";

export default function CriarUsuario() {
    return (
        <div className="tela-cad-admin">
            <div className="cad-admin-tit">
                <h1>Cadastrar novo usuário</h1>
            </div>
            <div className="cad-admin-form">
                <UsuarioForm></UsuarioForm>
            </div>
        </div>
    )
}