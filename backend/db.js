const mysql= require("mysql2/promise");
require("dotenv").config();


//Connection String
const db= mysql.createPool({
    host:process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password:process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "sample_db"
});

//Test Connection
(async()=>{
    try{
        const connection=await db.getConnection();
        console.log("MySQL Server is running...");
        connection.release();
    }
    catch(error){
        console.error("MySQL Conn failed :", error);
    }
})();
module.exports = db;
