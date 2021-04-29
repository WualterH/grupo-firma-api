const { Router } = require("express");

module.exports = function ({ UsuarioController, checkMiddleware }) {
	const router = Router();

	router.get("/", checkMiddleware.checkToken, UsuarioController.getUsuarios.bind(UsuarioController));

	router.get(
		"/:id", checkMiddleware.checkToken,
		UsuarioController.getUsuario.bind(UsuarioController)
	);
	router.get(
		"/nombre/:nombreUsuario", checkMiddleware.checkToken,
		UsuarioController.getByName.bind(UsuarioController)
	);
	router.post("/", checkMiddleware.checkToken, UsuarioController.createUsuario.bind(UsuarioController));
	router.get('/default', checkMiddleware.checkToken, UsuarioController.createDefault.bind(UsuarioController));
	router.put("/:id", checkMiddleware.checkToken, UsuarioController.updateUsuario.bind(UsuarioController));
	router.delete(
		"/:id",
		checkMiddleware.checkToken, UsuarioController.deleteUsuario.bind(UsuarioController)
	);
	router.post("/login", UsuarioController.login.bind(UsuarioController));
	router.get("/loggout", (req, res) => {
		return res.status(200).send({ message: "hasta pronto" });
	});

	router.get("/validarUsuario/:usertoken", UsuarioController.validarUsuario.bind(UsuarioController));


	return router;
};
