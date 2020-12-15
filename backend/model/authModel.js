const { Pool } = require("pg");
const connectionString = "postgresql://postgres@localhost:5432/postgres";
//                       'postgresql://dbuser:secretpassword@database.server.com:3211/mydb'

const pool = new Pool({
  /*
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: null,
    port: 5432,
    */
  connectionString,
});

pool.on("error", (err, client) => {
  console.error("Error:", err);
  process.exit(-1);
});

exports.addNewUser = async (data) => {
  const query = `
        INSERT INTO users(username,password,email)
        VALUES ('${data.username}','${data.password}','${data.email}');
        `;
  pool.query(query, (err, res) => {
    if (err !== undefined) {
      console.log("Postgres INSERT error:", err.detail);
    }

    if (res !== undefined) {
      if (res.rowCount > 0) {
        console.log("# of records inserted:", res.rowCount);
      } else {
        console.log("No records were inserted.");
      }
    }
    pool.end();
  });
};
