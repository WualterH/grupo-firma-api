const { Router } = require("express");
const multer = require("multer");
var express = require("express");
var app = express();
const path = require("path");

var DIR = "../uploads/ingresoAgrofirma";
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
module.exports = function ({ IngresoAgrofirmaController, checkMiddleware }) {
	const router = Router();

	app.use("/api/ingresoAgrofirma/download", express.static(DIR));
	router.get("/download/*", function (req, res) {
		let filename = req.params[0];
		let filepath =
			path.join(__dirname, "../../../../uploads") +
			"/ingresoAgrofirma/" +
			filename;

		return res.sendFile(filepath);
	});

	router.post(
		"/registrarIngreso", checkMiddleware.checkToken,
		IngresoAgrofirmaController.registrarIngreso.bind(IngresoAgrofirmaController)
	);
	router.post(
		"/upload",
		upload.single("photo"),
		IngresoAgrofirmaController.upload.bind(IngresoAgrofirmaController)
	);

	router.get(
		"/obtenerIngresos", checkMiddleware.checkToken,
		IngresoAgrofirmaController.obtenerIngresos.bind(IngresoAgrofirmaController)
	);

	router.get(
		"/obtenerIngreso/:id", checkMiddleware.checkToken,
		IngresoAgrofirmaController.obtenerIngreso.bind(IngresoAgrofirmaController)
	);
	router.get(
		"/obtenerIngresosByProyecto/:id", checkMiddleware.checkToken,
		IngresoAgrofirmaController.obtenerIngresoByProyecto.bind(
			IngresoAgrofirmaController
		)
	);

	return router;
};
