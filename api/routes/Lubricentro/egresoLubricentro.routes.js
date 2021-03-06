const { Router } = require("express");

const multer = require("multer");
var express = require("express");
var app = express();
const path = require("path");

var DIR = "../uploads/egresoLubricentro";
express.static(DIR);
let storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, DIR);
	},
	filename: (req, file, cb) => {
		cb(
			null,
			file.fieldname + "-" + Date.now() + path.extname(file.originalname)
		);
	},
});

const upload = multer({ storage: storage });

module.exports = function ({ EgresoLubricentroController, checkMiddleware }) {
	const router = Router();

	router.get(
		"/", checkMiddleware.checkToken,
		EgresoLubricentroController.getEgresos.bind(EgresoLubricentroController)
	);

	router.get(
		"/getDetalle/:id", checkMiddleware.checkToken,
		EgresoLubricentroController.getDetalleEgreso.bind(EgresoLubricentroController)
	);
	router.get(
		"/getEgreso/:id", checkMiddleware.checkToken,
		EgresoLubricentroController.getEgreso.bind(EgresoLubricentroController)
	);
	router.post(
		"/conRespaldo", checkMiddleware.checkToken,
		EgresoLubricentroController.createEgresoWithRespaldo.bind(
			EgresoLubricentroController
		)
	);
	router.post(
		"/upload",
		upload.single("photo"),
		EgresoLubricentroController.upload.bind(EgresoLubricentroController)
	);

	app.use("/api/egresoLubricentro/download", express.static(DIR));
	router.get("/download/*", function (req, res) {
		let filename = req.params[0];
		let filepath =
			path.join(__dirname, "../../../../uploads") +
			"/egresoLubricentro/" +
			filename;

		return res.sendFile(filepath);
	});
	/*  router.put(
	"/:id",
	EgresoLubricentroController.updateEgreso.bind(EgresoLubricentroController)
  );
  router.delete(
	"/:id",
	EgresoLubricentroController.deleteEgreso.bind(EgresoLubricentroController)
  ); */

	return router;
};
