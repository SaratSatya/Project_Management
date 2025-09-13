import dotenv from "dotenv";

dotenv.config({
    path:"./.env",
})

let myusername=process.env.usersrname;
let mydatabase=process.env.database;
console.log("Username is: "+myusername);
console.log("Database is: "+mydatabase);

console.log("start of awesome backend Project");
