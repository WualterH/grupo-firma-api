
const jwt = require("jsonwebtoken");
const { SECRET } = require("../../config/environments");
const checkToken = (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) {
        console.log("No posee token de seguridad");
        return res
            .status(320)
            .send({ auth: false, message: "No posee token de seguridad" });
    }
    try {
        const decoded = jwt.verify(token, SECRET);
        next();
    } catch (error) {
        console.log("No token no corresponde");

        return res
            .status(320)
            .send({ auth: false, message: "No token no corresponde" });
    }


}


module.exports = {
    checkToken: checkToken,
};