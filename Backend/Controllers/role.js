const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "notice_board",
  password: "Pranj@09",
  port: 5432,
});

const createRole = (req, res) => {
  const { id, name } = req.body;

  pool.query(
    'INSERT INTO "role" (id, name) VALUES($1,$2) RETURNING * ',
    [id, name],
    (err, result) => {
      if (err) {
        console.log(err);
        throw err;
      }

      res.status(200).json({
        msg: "Role created Successfully",
        data: result.rows[0],
      });
    }
  );
};

const getRoles = (req, res) => {
  pool.query("SELECT * FROM role", (err, result) => {
    if (err) {
      throw err;
    }

    res.json({
      data: result.rows,
    });
  });
};

module.exports = {
  createRole,
  getRoles,
};
