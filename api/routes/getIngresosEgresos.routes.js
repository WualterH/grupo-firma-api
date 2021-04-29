const { Router } = require('express');

module.exports = function ({ GetIngresosEgresosController, checkMiddleware }) {
	const router = Router();

	router.get(
		'/obtenerIngresos',
		checkMiddleware.checkToken,
		GetIngresosEgresosController.obtenerIngresosEmpresas.bind(GetIngresosEgresosController)
	);
	router.get(
		'/obtenerEgresos',
		checkMiddleware.checkToken,
		GetIngresosEgresosController.obtenerEgresosEmpresas.bind(GetIngresosEgresosController)
	);
	router.get('/obtenerIngresosMensuales/:year', checkMiddleware.checkToken, GetIngresosEgresosController.obtenerIngresosMensuales.bind(GetIngresosEgresosController));


	return router;
};


