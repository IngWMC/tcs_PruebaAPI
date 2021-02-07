'use strict';

const fetch = require('node-fetch');

// Respuesta
function response(statusCode, message) {
  return {
    statusCode: statusCode,
    body: JSON.stringify(message)
  };
};

// Obtener una Persona
module.exports.getPersona = async event => {
    const id = event.pathParameters.id;

    const result = await fetch(`https://swapi.py4e.com/api/people/${id}/`);

    if(result.ok) {
      const person = await result.json();
      const array = [];
      array.push(person)

      let persona = array.map(
        obj => {
          return {
            "nombre" : obj.name,
            "año_nacimiento" : obj.birth_year,
            "color_ojo" : obj.eye_color,
            "sexo" : obj.gender,
            "color_cabello" : obj.hair_color,
            "talla" : obj.height,
            "peso" : obj.mass,
            "color_piel" : obj.skin_color,
            "planeta_natal" : obj.homeworld,
            "peliculas" : obj.films,
            "especies" : obj.species,
            "naves_espaciales" : obj.starships,
            "vehículos" : obj.vehicles,
            "url" : obj.url,
            "fecha_creación" : obj.created,
            "fecha_modificación" : obj.edited,
          }
        }
      );
      return response(200, { results: persona[0] });
    } else {
      return response(404, { error: 'No se encontro datos.' });
    }
};