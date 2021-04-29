const { Router } = require("express");

module.exports = function ({ IngresoRentacarController, checkMiddleware }) {
	const router = Router();

	router.get(
		"/arriendos", checkMiddleware.checkToken,
		IngresoRentacarController.getArriendos.bind(IngresoRentacarController)
	);
	router.get(
		"/detallePago/:idArriendo", checkMiddleware.checkToken,
		IngresoRentacarController.getDetallePagos.bind(IngresoRentacarController)
	);

	return router;
};
