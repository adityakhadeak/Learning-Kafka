const express = require('express')
const { createUser, readUser, deleteUser, updateUser, readAllUser } = require('../controllers/crudController')
const { createUserValidator, updateUserValidator } = require('../helper/validation')

const router1=express()

router1.post('/createuser',createUserValidator, createUser)

router1.get('/readalluser',readAllUser)
router1.get('/readuser/:id',readUser)

router1.put('/updateuser/:id',updateUserValidator, updateUser)

router1.delete('/deleteuser/:id',deleteUser)


module.exports=router1