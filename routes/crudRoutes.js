const express = require('express')
const { createUser, readUser, deleteUser, updateUser } = require('../controllers/crudController')
const { createUserValidator, updateUserValidator } = require('../helper/validation')

const router1=express()

router1.post('/createuser',createUserValidator, createUser)

router1.post('/readuser',readUser)

router1.post('/updateuser',updateUserValidator, updateUser)

router1.post('/deleteuser',deleteUser)


module.exports=router1