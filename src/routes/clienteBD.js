'use strict';

const mysqlConnection  = require('../database.js');

// Respuesta
function response(statusCode, message) {
  return {
    statusCode: statusCode,
    body: JSON.stringify(message)
  };
};

// Insertar un Cliente
module.exports.createCliente = async event => {
  const oCliente = JSON.parse(event.body);

  if (
    !oCliente.Nombre ||
    oCliente.Nombre.trim() === '' ||
    !oCliente.Sexo ||
    oCliente.Sexo.trim() === '' ||
    !oCliente.Correo ||
    oCliente.Correo.trim() === ''
  ) {
    return response(400, { error: 'Los campos Nombre, Sexo y Correo son requeridos.' });
  }

  const {Nombre, Sexo, Correo} = oCliente;

  const p = new Promise((resolve) => {
    mysqlConnection.query("INSERT INTO Cliente(Nombre, Sexo, Correo) VALUES(?, ?, ?)", [Nombre, Sexo, Correo], function(err, results) {
      resolve(results);
    })
  });

  const result = await p;

  return response(201, { results: 'Cliente creado.' });
};

// Listar todos los Clientes
module.exports.getAllClientes = async event => {

  const p = new Promise((resolve) => {
    mysqlConnection.query("SELECT * FROM Cliente", function(err, results) {
      resolve(results);
    })
  })

  const result = await p;

  return response(200, { results: result });
};

// Obtener un Cliente
module.exports.getCliente = async event => {
  const IDCliente = event.pathParameters.id;

  const p = new Promise((resolve) => {
    mysqlConnection.query("SELECT * FROM Cliente WHERE IDCliente = ?", [IDCliente], function(err, results) {
      resolve(results);
    })
  })

  const result = await p;

  return response(200, { results: result });
};