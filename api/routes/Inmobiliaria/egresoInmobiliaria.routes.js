const { Router } = require("express");

const multer = require("multer");
var express = require("express");
var app = express();
const path = require("path");

var DIR = "../uploads/egresoInmobiliaria";
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

module.exports = function ({ EgresoInmobiliariaController, checkMiddleware }) {
	const router = Router();

	router.get(
		"/", checkMiddleware.checkToken,
		EgresoInmobiliariaController.getEgresos.bind(EgresoInmobiliariaController)
	);

	router.get(
		"/:id", checkMiddleware.checkToken,
		EgresoInmobiliariaController.getEgreso.bind(EgresoInmobiliariaController)
	);

	router.post(
		"/conRespaldo", checkMiddleware.checkToken,
		EgresoInmobiliariaController.createEgresoWithRespaldo.bind(
			EgresoInmobiliariaController
		)
	);
	router.post(
		"/upload",
		upload.single("photo"),
		EgresoInmobiliariaController.upload.bind(EgresoInmobiliariaController)
	);

	app.use("/api/egresoInmobiliaria/download", express.static(DIR));
	router.get("/download/*", function (req, res) {
		let filename = req.params[0];
		let filepath =
			path.join(__dirname, "../../../../uploads") +
			"/egresoInmobiliaria/" +
			filename;

		return res.sendFile(filepath);
	});
	/*  router.put(
	"/:id",
	EgresoInmobiliariaController.updateEgreso.bind(EgresoInmobiliariaController)
  );
  router.delete(
	"/:id",
	EgresoInmobiliariaController.deleteEgreso.bind(EgresoInmobiliariaController)
  ); */

	return router;
};
