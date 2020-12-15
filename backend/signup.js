const { Pool } = require('pg');
const connectionString = 'postgresql://postgres@localhost:5432/postgres'
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

pool.on('error', (err, client) => {
    console.error('Error:', err);
    process.exit(-1);
});

const signup_details = {
    username:"user2",
    password:"pwd",
    email:"hi@bye.com"
};

const query = `
INSERT INTO users(username,password,email)
VALUES ('${signup_details.username}','${signup_details.password}','${signup_details.email}');
`;

pool.query(query, (err,res) => {
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
})
