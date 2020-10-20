/* confirmarRegistros.js
 * Version: 1.0
 * Fecha: 2019/06/18
 *
 * Aplicacion Node.js que consume el servicio "registrar" de un Web Service mediante cliente SOAP
 *
 * Para mas informacion, visitar la siguiente URL del CTT: https://rgecopruebas.preappjava.seap.minhap.es/rgeco/doc/htmlsingle/index.html#operacionConfirmar
 */

// Soluciona el error: "self signed certificate in certificate chain" cuando se crea el cliente SOAP
// https://stackoverflow.com/questions/31032520/how-to-ignore-self-signed-certificate-error-node-js-soap-js#31058131
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const soap = require("soap");

const endPoint = "https://rgecopruebas.preappjava.seap.minhap.es/rgeco/services/RegistroWebService?wsdl";

const paramData = {
	authentication: {
		aplicacion: "",
		password:   "",
		cdAmbito:   "",
		usuario:    "",
		version:    "V1",
	},
	peticion: {
		nuRegistro: "",
		motivo:     "",
	}
};

console.log("\n");
console.log("Confirmar asientos de GEISER por WSDL");
console.log("-------------------------------------");
console.log("URL: " + endPoint + "\n");
console.log(paramData);


// Crea el client SOAP
soap.createClient(endPoint, function(err, client) {
	if (err) {
		console.log(err);
	}
	else {
		// Llama al servicio "confirmar"
		client.confirmar(paramData, function(err, result, rawResponse, soapHeader, rawRequest) {
			console.log("\nRespuesta:\n");
			console.log(rawResponse);
			if (err) {
				console.log(rawRequest);
			}
			console.log("\n");
		});
	}
});

