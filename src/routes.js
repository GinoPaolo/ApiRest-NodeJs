/**
 * Expone una colección de todos los routes de nuestra api,
 * a pesar que en este ejemplo solo se expone en personRoute,
 * en la vida real deberían exponerse todos.
 */
const personRoute = require('./routes/person.route')
// aqui podría exponer todos los routes,
// por ejemplo module.exports=[personRoute, route2, route3, routen]
module.exports = [personRoute]
