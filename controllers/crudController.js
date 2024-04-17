const pool = require('../db/db.js')
const bcrypt = require('bcrypt')
const {validationResult}=require('express-validator')
const { produceMessage, consumeMessages } = require('../kafka/kafka.js')
const createUser = async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: 'Errors',
                errors: errors.array()
            })
        }
        const { username, email, password } = req.body

        const query1 = 'SELECT * FROM users where username=$1 OR email=$2'
        const values1 = [username, email]

        const result1 = await pool.query(query1, values1)

        if (result1.rowCount != 0) {
            return res.status(400).json({
                success: false,
                message: "User with this credentials exists"
            })
        }
        const encryptedPass = await bcrypt.hash(password, 10)

       const query2 = 'INSERT INTO users (username,email,password) VALUES ($1, $2, $3) RETURNING *'
       const values2 = [username, email, encryptedPass]

        const result2=await pool.query(query2,values2)

       await produceMessage({ username, email }).catch(console.error);

        res.status(201).json({
            success:true,
            message:"User created successfully",
            user:result2.rows
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

const readAllUser = async (req, res) => {
    try {
        let query1 = 'SELECT * FROM users '

        let result1 = await pool.query(query1)

        res.status(201).json({
            success:true,
            users:result1.rows
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}
const readUser = async (req, res) => {
    try {
        const{id}=req.params
        let query1 = 'SELECT * FROM users WHERE id=$1'
        let value1 = [id]

        let result1 = await pool.query(query1,value1)

        if(result1.rowCount==0)
        {
            return res.status(404).json({
                success:false,
                message:"User not found"
            })
        }

        res.status(201).json({
            success:true,
            user:result1.rows
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

const deleteUser = async (req, res) => {
    try {
        const {id}=req.params

        let query1='DELETE FROM users WHERE id=$1 RETURNING *'
        let values1=[id]

        let result1=await pool.query(query1,values1)

        if(result1.rowCount==0)
        {
            return res.status(404).json({
                success:false,
                message:"User not found"
            })
        }

        res.status(201).json({
            success:true,
            user:result1.rows
        })


    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

const updateUser = async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: 'Errors',
                errors: errors.array()
            })
        }
        const { username, email, password } = req.body
        const {id}=req.params
        const encryptedPass = await bcrypt.hash(password, 20)
        const currentDate= new Date()
        let query1='UPDATE users SET username=$1, email=$2, password=$3,updated_at=$4 WHERE id=$5 RETURNING *'
        let values1=[username,email,encryptedPass,currentDate,id]

        let result1=await pool.query(query1,values1)

        if(result1.rowCount==0)
        {
            return res.status(404).json({
                success:false,
                message:"User not found"
            })
        }

        res.status(201).json({
            success:true,
            user:result1.rows
        })


    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

module.exports = { createUser, readUser, deleteUser, updateUser ,readAllUser}