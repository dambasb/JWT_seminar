//Requiring all the necessary files and libraries
import express from 'express'
import generateToken from '../utils/generateToken.js'
//Creating express router
const router = express.Router()

import {
  authUser,
  getUserProfile,
  registerUser,
} from '../controllers/userController.js'
//Importing userModel
import User from '../models/userModel.js'

router.route('/').post(registerUser)
router.post('/login', authUser)
router.route('/profile').get(getUserProfile)

export default router
