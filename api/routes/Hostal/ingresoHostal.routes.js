const { Router } = require("express");

const multer = require("multer");
var express = require("express");
var app = express();
const path = require("path");

var DIR = "../uploads/ingresoHostal";
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

module.exports = function ({ IngresoHostalController, checkMiddleware }) {
	const router = Router();

	router.get(
		"/", checkMiddleware.checkToken,
		IngresoHostalController.getIngresos.bind(IngresoHostalController)
	);

	router.get(
		"/:id", checkMiddleware.checkToken,
		IngresoHostalController.getIngreso.bind(IngresoHostalController)
	);

	router.post(
		"/conRespaldo", checkMiddleware.checkToken,
		IngresoHostalController.createIngresoWithRespaldo.bind(
			IngresoHostalController
		)
	);
	router.post(
		"/upload",
		upload.single("photo"),
		IngresoHostalController.upload.bind(IngresoHostalController)
	);

	app.use("/api/egresoHostal/download", express.static(DIR));
	router.get("/download/*", function (req, res) {
		let filename = req.params[0];
		let filepath =
			path.join(__dirname, "../../../../uploads") +
			"/ingresoHostal/" +
			filename;

		return res.sendFile(filepath);
	});
	/*  router.put(
	"/:id",
	EgresoHostalController.updateEgreso.bind(EgresoHostalController)
  );
  router.delete(
	"/:id",
	EgresoHostalController.deleteEgreso.bind(EgresoHostalController)
  ); */

	return router;
};
