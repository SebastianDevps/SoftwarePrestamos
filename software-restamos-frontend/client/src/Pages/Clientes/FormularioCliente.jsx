import './FormularioCliente.scss';
import './Clientes.scss';
const Formulario = () => {
  return (
    <div className="container-fluid">
      <div className="card shadow mb-4">
        <div className="card-header py-3">Nuevo Cliente</div>
        <div className="card-body">
          <form action="https://sistemasenoferta.com/sistemas/sys-cobranza/admin/customers/edit" method="post" acceptCharset="utf-8">
            <div className="form-row">
              <div className="form-group col-md-3">
                <label className="small mb-1" htmlFor="inputUsername">Ingresar Cedula</label>
                <input className="form-control" id="inputUsername" type="text" name="dni" value="" />
              </div>
              <div className="form-group col-md-3">
                <label className="small mb-1" htmlFor="inputUsername">Ingresar Nombre</label>
                <input className="form-control" id="inputUsername" type="text" name="nombre" value="" />
              </div>
              <div className="form-group col-md-3">
                <label className="small mb-1" htmlFor="exampleFormControlTextarea1">Ingresar Apellidos</label>
                <input className="form-control" id="inputUsername" type="text" name="apellido" value="" />
              </div>
              <div className="form-group col-md-3">
                <label className="small mb-1" htmlFor="inputUsername">Ingresar Telefono</label>
                <input className="form-control" id="inputUsername" type="text" name="telefono" value="" />
              </div>
              <div className="form-group col-md-3">
                <label className="small mb-1" htmlFor="inputUsername">Ingresar Dirección</label>
                <input className="form-control" id="inputUsername" type="text" name="direccion" value="" />
              </div>
              <div className="form-group col-md-3">
                <label className="small mb-1" htmlFor="inputUsername">Ingresar Correo</label>
                <input className="form-control" id="inputUsername" type="text" name="correo" value="" />
              </div>
            </div>

            {/* Resto del formulario ... */}

            <button className="btn btn-primary" type="submit">Registrar cliente</button>
            <a href="https://sistemasenoferta.com/sistemas/sys-cobranza/admin/customers/" className="btn btn-dark">Cancelar</a>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Formulario;