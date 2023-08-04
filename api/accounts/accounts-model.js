const db = require('../data/db-config'); // adjust the path to your actual db config file

const getAll = () => {
  return db('accounts'); // returns all records in the 'accounts' table
}

const getById = id => {
  return db('accounts').where({ id }).first(); // returns the first record that matches the id
}

const create = async account => {
  const [id] = await db('accounts').insert(account);
  return getById(id);
}

const updateById = async (id, account) => {
  await db('accounts').where({ id }).update(account);
  return getById(id);
}

const deleteById = async id => {
  const toBeDeleted = await getById(id);
  await db('accounts').where({ id }).del();
  return toBeDeleted;
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}

