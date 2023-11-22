

export default function NaoAutorizado() {

    return (
        <div className="container-fluid">
            <div className="text-center">
                <div className="error mx-auto" data-text="401">401</div>
                <p className="lead text-gray-800 mb-5">Acesso não autorizado</p>
            </div>

        </div>
    )
}