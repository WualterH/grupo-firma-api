

class IngresoInmobiliariaController {
  constructor({ IngresoInmobiliariaService }) {
    this._service = IngresoInmobiliariaService;
  }

  async upload(req, res) {
    if (!req.file) {
      console.log("No file received");
      return res.send({
        success: false,
      });
    } else {
      console.log("file received successfully");

      setTimeout(() => {
        return res.status(200).send(req.file.filename);
      }, 2000);
    }
  }

  async createIngresoWithRespaldo(req, res) {
    try {
      const { body } = req;
      const created = await this._service.createWithRespaldos(body);
      return res.status(201).send({ payload: created, });
    } catch (error) {
      return res.status(404).send({ message: "Error en el servidor" });
    }
  }
  async getIngresos(req, res) {
    let ingresos = await this._service.getAllWithJoin();

    return res.status(200).send(ingresos);
  }

  async getIngreso(req, res) {
    const { id } = req.params;
    let ingreso = await this._service.getOneWithJoin(id);
    return res.send(ingreso);
  }
}

module.exports = IngresoInmobiliariaController;
