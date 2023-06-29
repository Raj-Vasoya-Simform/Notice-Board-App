const notifier = require("node-notifier");

const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "notice_board",
  password: "Pranj@09",
  port: 5432,
});

const createUser = (req, res) => {
  const { id, name, password, email } = req.body;

  pool.query(
    'INSERT INTO "user" (id, name, password, email) VALUES($1,$2,$3,$4) RETURNING * ',
    [id, name, password, email],
    (err, result) => {
      if (err) {
        throw err;
      }

      res.status(200).json({
        msg: "You have Successfully Registered.",
        data: result.rows[0],
      });
    }
  );
};

const getUsers = (req, res) => {
  pool.query('SELECT * FROM "user"', (err, result) => {
    if (err) {
      throw err;
    }

    res.json({
      data: result.rows,
    });
  });
};

const getUserById = (req, res) => {
  let id = req.params.id;

  
  pool.query('SELECT * FROM "user" WHERE id=$1', [id], (err, result) => {
    if (err) {
      throw err;
    }
    res.json({
      msg: "Login Successfully!",
      data: result.rows,
    });
  });
};

const updateUser = (req, res) => {
  const { id, name, password, email, role, isActive } = req.body;

  pool.query(
    'UPDATE "user" SET name = $1, password = $2, email = $3, role = $4, isActive = $5 WHERE id = $6',
    [name, password, email, role, isActive, id],
    (err, result) => {
      if (err) {
        throw err;
      }

      res.json({
        data: "User Updated Successfully",
      });
    }
  );
};

const deleteUser = (req, res) => {
  let id = req.params.id;

  pool.query('DELETE FROM "user" where id = $1', [id], (err, result) => {
    if (err) {
      throw err;
    }

    res.json({
      data: "User Deleted Successfully",
    });
  });
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
