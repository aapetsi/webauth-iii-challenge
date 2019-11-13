const db = require("../data/db-config");

module.exports = {
  find,
  findById,
  save
};

function find(arg) {
  let { email, username } = arg ? arg : "";
  if (!email || !username) {
    return db("users");
  }
  return db("users").where(qb => {
    if (email) {
      qb.where({ email }).first()[0];
    }
    if (username) {
      qb.orWhere({ username }).first()[0];
    }
  });
}

function save(user) {
  return db("users")
    .insert(user)
    .then(ids => ({ id: ids[0] }));
}

function findById(id) {
  return db("users")
    .where({ id: Number(id) })
    .first();
}
