const mapper = require("automapper-js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const BaseBusiness = require("../base.business");
const { Usuario } = require("../../models/");
const { SECRET } = require("../../../config/environments");

class UsuarioBusiness extends BaseBusiness {
	constructor({ UsuarioRepository }) {
		super(UsuarioRepository, Usuario);
		this._usuarioRepository = UsuarioRepository;
		this._usuario = Usuario;

	}

	async validarUsuario(usertoken) {
		try {
			const { id } = jwt.verify(usertoken, SECRET);
			const usuario = await this._usuarioRepository.get(id);
			return { success: true, data: usuario };
		} catch (error) {
			return { success: false, message: "No token no corresponde" }
		}
	}


	async getByName(nombreUsuario) {
		const usuario = await this._usuarioRepository.getByName(nombreUsuario);
		if (!usuario) return null;
		return mapper(this._usuario, usuario.toJSON());
	}
	async encriptarPassword(pass) {
		const salt = await bcrypt.genSalt(10);
		return bcrypt.hash(pass, salt);
	}
	async compararPassword(pass, ver) {
		const verificado = bcrypt.compare(pass, ver);
		return verificado;
	}
}

module.exports = UsuarioBusiness;
