const { Router } = require("express");

const multer = require("multer");
var express = require("express");
var app = express();
const path = require("path");

var DIR = "../uploads/egresoHostal";
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

module.exports = function ({ EgresoHostalController, checkMiddleware }) {
	const router = Router();

	router.get(
		"/", checkMiddleware.checkToken,
		EgresoHostalController.getEgresos.bind(EgresoHostalController)
	);

	router.get(
		"/:id", checkMiddleware.checkToken,
		EgresoHostalController.getEgreso.bind(EgresoHostalController)
	);

	router.post(		
		"/conRespaldo", checkMiddleware.checkToken,
		EgresoHostalController.createEgresoWithRespaldo.bind(EgresoHostalController)
	);
	router.post(		
		"/upload",
		upload.single("photo"),
		EgresoHostalController.upload.bind(EgresoHostalController)
	);

	app.use("/api/egresoHostal/download", express.static(DIR));
	router.get("/download/*", function (req, res) {
		var filename = req.params[0];
		var filepath =
			path.join(__dirname, "../../../../uploads") + "/egresoHostal/" + filename;

		return res.sendFile(filepath);
	});


	return router;
};
