const { Router } = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

const compression = require('compression');

module.exports = function ({
	RolRoutes,
	UsuarioRoutes,
	AuthRoutes,
	EmpresaRoutes,
	SucursalRoutes,
	EgresoHostalRoutes,
	IngresoHostalRoutes,
	EgresoLubricentroRoutes,
	IngresoLubricentroRoutes,
	ClienteRoutes,
	CausaRoutes,
	ContratoClienteAbogadoRoutes,
	CuotasContratoAbogadoRoutes,
	AbogadoRoutes,
	EgresoFirmaRoutes,
	IngresoRentacarRoutes,
	EgresoRentacarRoutes,
	BancoRoutes,
	ProyectoAgrofirmaRoutes,
	IngresoAgrofirmaRoutes,
	EgresoAgrofirmaRoutes,
	IngresoInmobiliariaRoutes,
	EgresoInmobiliariaRoutes,
	GetIngresosEgresosRoutes,
	CuentasRegistradasRoutes,
	MovimientosCuentasRoutes,
	checkMiddleware
}) {
	const router = Router();
	router.use(morgan('short'));
	const apiRoute = Router();
	const whitelist = [
		'https://localhost:4200',
		'https://www.imlchile.cl',
		'http://localhost',
	];
	//
	apiRoute.use(bodyParser.json()).use(compression()).use(cors());
	apiRoute.use('/dash', checkMiddleware.checkToken, GetIngresosEgresosRoutes);
	apiRoute.use('/empresa', checkMiddleware.checkToken, EmpresaRoutes);
	apiRoute.use('/sucursal', checkMiddleware.checkToken, SucursalRoutes);
	apiRoute.use('/rol', checkMiddleware.checkToken, RolRoutes);
	apiRoute.use('/auth', checkMiddleware.checkToken, AuthRoutes);
	apiRoute.use('/cliente', checkMiddleware.checkToken, ClienteRoutes);
	apiRoute.use('/causa', checkMiddleware.checkToken, CausaRoutes);
	apiRoute.use('/contratoCienteAbogado', checkMiddleware.checkToken, ContratoClienteAbogadoRoutes);
	apiRoute.use('/abogado', checkMiddleware.checkToken, AbogadoRoutes);
	apiRoute.use('/banco', checkMiddleware.checkToken, BancoRoutes);
	apiRoute.use('/cuentasRegistradas', checkMiddleware.checkToken, CuentasRegistradasRoutes);
	apiRoute.use('/proyectoAgrofirma', checkMiddleware.checkToken, ProyectoAgrofirmaRoutes);

	//middlewares token agregado directamente en las rutas hijas
	apiRoute.use('/usuarios', UsuarioRoutes);
	apiRoute.use('/ingresoRentacar', IngresoRentacarRoutes);
	apiRoute.use('/egresoRentacar', EgresoRentacarRoutes);
	apiRoute.use('/egresoLubricentro', EgresoLubricentroRoutes);
	apiRoute.use('/ingresoLubricentro', IngresoLubricentroRoutes);
	apiRoute.use('/ingresoInmobiliaria', IngresoInmobiliariaRoutes);
	apiRoute.use('/egresoInmobiliaria', EgresoInmobiliariaRoutes);
	apiRoute.use('/egresoHostal', EgresoHostalRoutes);
	apiRoute.use('/ingresoHostal', IngresoHostalRoutes);
	apiRoute.use('/ingresoAgrofirma', IngresoAgrofirmaRoutes);
	apiRoute.use('/egresoAgrofirma', EgresoAgrofirmaRoutes);
	apiRoute.use('/cuotasContrato', CuotasContratoAbogadoRoutes);
	apiRoute.use('/egresoFirma', EgresoFirmaRoutes);
	apiRoute.use('/movimientosCuentas', MovimientosCuentasRoutes);

	//!prefj
	router.use('/api', apiRoute);

	return router;
};
