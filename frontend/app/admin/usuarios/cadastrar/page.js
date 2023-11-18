
export default function CriarUsuario() {
    return (
        <div className="tela-cadastro cx-table-main">
            <form class="row g-3">
                <div class="col-md-6">
                    <label for="NomeUsuario" class="form-label">Nome:</label>
                    <input type="email" class="form-control" id="NomeUsuario" />
                </div>
                <div class="col-md-6">
                    <label for="EmailUsuario" class="form-label">Email:</label>
                    <input type="email" class="form-control" id="EmailUsuario" />
                </div>
                <div class="col-md-6">
                    <label for="senhaUsuario" class="form-label">Password:</label>
                    <input type="password" class="form-control" id="senhaUsuario"/>
                </div>

                <div class="col-md-4">
                    <label for="inputState" class="form-label">Tipo de Usuário:</label>
                    <select id="inputState" class="form-select">
                        <option selected>Choose...</option>
                        <option>...</option>
                    </select>
                </div>
                <div class="col-12">
                    <a href="#" class="btn btn-primary btn-edit">Cadastrar</a>
                    <a href="/admin/usuarios" class="btn btn-primary btn-edit">Cancelar</a>
                </div>
            </form>
        </div>
    )
}