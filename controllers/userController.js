//Requiring all the necessary files and libraries
import generateToken from '../utils/generateToken.js'
//Importing userModel
import User from '../models/userModel.js'

// @desc        Register a new user
// @route       POST /api/users
// @access      Public

const registerUser = async (req, res) => {
  const { name, email, password } = req.body

  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    return res.json('Users already exists')
  }
  const user = await User.create({
    name,
    email,
    password,
  })

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user.id),
    })
  } else {
    res.status(400)
    return res.json('Invalid user data!')
  }
}

// @desc        Auth user & get token
// @route       GET /api/login
// @access      Public

const authUser = async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user.id),
    })
  } else {
    res.status(401)
    return res.json('Invalid email or password')
  }
}

// @desc        Fetch users data
// @route       GET /api/users/profile
// @access      Private

const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
    })
  } else {
    res.status(401)
    return res.json('User not found')
  }
}

export { authUser, getUserProfile, registerUser }
