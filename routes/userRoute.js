// Requiring all the necessary files and libraries
import express from 'express'
// Creating express router
const router = express.Router()
// Users controllers
import {
  authUser,
  getUserProfile,
  registerUser,
} from '../controllers/userController.js'
// Import middleware for protecting route
import { protect } from '../middleware/authMiddleware.js'

router.route('/').post(registerUser)
router.post('/login', authUser)
router.route('/profile').get(protect, getUserProfile)

export default router
