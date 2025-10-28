const db = require('../../data/dbConfig.js')

module.exports = {
  insert,
  update,
  remove,
  getAll,
  getById,
}

function getAll() {
  return db('hobbits')
}

function getById(id) {
  return db('hobbits').where('id', id).first()
}

async function insert(hobbit) {
  return await db('hobbits').insert(hobbit).then(([id]) => {
    return db('hobbits').where('id', id).first()
  })
}

async function update(id, changes) {
  await db('hobbits').where({ id }).update(changes)
  return db('hobbits').where({ id }).first()
}

async function remove(id) {
  const deleted = await db('hobbits').where({ id }).first()
  await db('hobbits').where({ id }).del()
  return deleted
}
