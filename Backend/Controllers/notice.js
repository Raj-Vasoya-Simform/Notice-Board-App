const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "notice_board",
  password: "Pranj@09",
  port: 5432,
});

const createNotice = (req, res) => {
  const { title, description, uploadDate } = req.body;

  pool.query(
    'INSERT INTO "notice" (title, description, uploadDate) VALUES($1, $2, $3) RETURNING *',
    [title, description, uploadDate],
    (err, result) => {
      if (err) {
        throw err;
      }

      res.status(200).json({
        msg: "Notice created Successfully",
        data: result.rows[0],
      });
    }
  );
};

const getNotices = (req, res) => {
  pool.query('SELECT * FROM "notice"', (err, result) => {
    if (err) {
      throw err;
    }

    res.json({
      data: result.rows,
    });
  });
};

const getNoticeById = (req, res) => {
  let id = parseInt(req.params.id);

  pool.query('SELECT * FROM "notice" WHERE id=$1', [id], (err, result) => {
    if (err) {
      throw err;
    }

    res.json({
      data: result.rows,
    });
  });
};

const updateNotice = (req, res) => {
  const { id, title, description, uploadDate } = req.body;

  const formattedDate = new Date(uploadDate).toLocaleDateString('en-GB');

  pool.query(
    'UPDATE "notice" SET title = $2, description = $3, uploadDate = $4 WHERE id = $1',
    [id, title, description, formattedDate],
    (err, result) => {
      if (err) {
        throw err;
      }

      res.json({
        data: "Notice Updated Successfully",
      });
    }
  );
};

const deleteNotice = (req, res) => {
  let id = parseInt(req.params.id);

  pool.query('DELETE FROM "notice" where id = $1', [id], (err, result) => {
    if (err) {
      throw err;
    }

    res.json({
      data: "Notice Deleted Successfully",
    });
  });
};

module.exports = {
  createNotice,
  getNotices,
  getNoticeById,
  updateNotice,
  deleteNotice,
};
