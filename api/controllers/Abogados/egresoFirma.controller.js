class EgresoFirmaController {
	constructor({ EgresoFirmaService }) {
		this._service = EgresoFirmaService;
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

	async createEgresoWithRespaldo(req, res) {
		try {
			const { body } = req;
			const created = await this._service.createWithRespaldos(body);
			return res.status(201).send({ payload: created, });
		} catch (error) {
			return res.status(404).send({ message: "Error en el servidor" });
		}
	}
	async getEgresos(req, res) {
		let egresos = await this._service.getAllWithJoin();
		//egresos = egresos.map((usuario) => mapper(UsuarioDto, usuario));
		return res.status(200).send(egresos);
	}
	async getEgreso(req, res) {
		const { id } = req.params;
		let egreso = await this._service.getOneWithJoin(id);
		return res.send(egreso);
	}
}
module.exports = EgresoFirmaController;
