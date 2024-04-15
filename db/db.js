const {Pool}= require('pg')

const pool =new Pool({
    host:"localhost",
    user:"postgres",
    port:5432,
    password:"2915",
    database:"users"
})

module.exports=pool