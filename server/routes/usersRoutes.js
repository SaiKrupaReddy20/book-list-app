const express = require('express');
const asyncHandler = require('express-async-handler');
const usersRoute = express.Router();
const User = require('../models/User');
const generateToken = require('../utils/generateToken');

usersRoute.post('/register', asyncHandler(async (req, res) => {
    const data = req.body;
    const userExists = await User.findOne({email: data.email});
    if(userExists) {
        throw new Error('User Exist');
    }
    const userCreated = await User.create(data);
    res.send({
        _id: userCreated.id,
        name: userCreated.name,
        password: userCreated.password,
        email: userCreated.email,
        token: generateToken(userCreated._id)
    });
  })
);


usersRoute.post('/login', asyncHandler(async (req, res) => {
    const data = req.body;
    const userExists = await User.findOne({email: data.email});
    if(userExists && (await userExists.isPasswordMatch(data.password))) {
        res.status(200);
        res.json({
            _id: userExists.id,
            name: userExists.name,
            password: userExists.password,
            email: userExists.email,
            token: generateToken(userExists._id)
        });
    } else {
        res.status(401);
        throw new Error('Invalid credentials');
    }
  })
);

module.exports = usersRoute;