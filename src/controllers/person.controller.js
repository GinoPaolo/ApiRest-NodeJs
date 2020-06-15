/**
 * person.controller.js
 * Responsable por recibir las solicitudes http desde el router person.route.js
 */
const PersonRepository = require('../repositories/person.repository')
const repository = new PersonRepository()

module.exports = class PersonController {
  /**
   *
   * @param {object} ctx: contexto de koa que contiene los parámetros de la solicitud, en este caso
   * desde el url de donde sacaremos el valor del parámetro index (ctx.params.index)
   */
  async getByIndex(ctx) {
    const index = ctx.params.index && !isNaN(ctx.params.index) ? parseInt(ctx.params.index) : 0
    if (index > 0) {
      const filter = { index: index }
      const data = await repository.findOne(filter)
      if (data) {
        ctx.body = data
      } else {
        ctx.throw(404, `No se ha encontrado la persona con el indice ${index}`)
      }
    } else {
      ctx.throw(422, `Valor ${ctx.params.index} no soportado`)
    }
  }

  /**
   *
   * @param {object} ctx: contexto de koa que contiene los parámetros de la solicitud, en ete caso
   * desde la url de donde scaremos los valores de los parámetros eyeColor, countr y gender
   */
  async getByFilter(ctx) {
    const { skip, limit } = ctx.query
    const eyeColor = ctx.params.eyeColor
    const country = ctx.params.country
    const gender = ctx.params.gender

    const filters = { eyeColor: eyeColor, country: country, gender: gender }
    const data = await repository.findMany(filters, skip, limit)
    if (data) {
      ctx.body = data
    } else {
      ctx.throw(404, `No se ha encontrado la persona con los filtros: ${eyeColor}, ${country}, ${gender}`)
    }
  }

  /**
   *
   * @param {object} ctx: contexto de koa que contiene los parámetros solicitados, en este caso desde el body,
   * obtendremos las propiedades de la persona a guardar a traves de ctx.request.body
   */
  async save(ctx) {
    const person = ctx.request.body
    await repository.save(person, true)
    ctx.body = person
  }
}
