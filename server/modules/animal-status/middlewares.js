const pool = require("../../../database");

exports.duplicateData = async (req, res, next) => {
  try {
    let { body } = req;
    let { name } = body;

    const statement = `SELECT * FROM tolfa_animal_status WHERE name = '${name}'`;
    console.log(statement);
    const query = (statement) => {
      pool.query(statement, (error, results, fields) => {
        console.log("results", results);
        if (results && results.length) {
          res.status(422).json({
            message: "Data already exist with this name",
          });
        } else {
          next();
        }
      });
    };
    query(statement);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};
