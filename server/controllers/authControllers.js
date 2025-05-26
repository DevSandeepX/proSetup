const asyncHandler = require('express-async-handler')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')




const login = asyncHandler(async (req, res) => {
    const { username, password } = req.body

    if (!username || !password) return res.status(402).json({ message: 'All fields are require' })
    const foundUser = await User.findOne({ username })
    if (!foundUser || !foundUser.active) return res.status(402).json({ message: 'User not found' })

    const match = await bcrypt.compare(password, foundUser.password)
    if (!match) return res.status(402).json({ message: 'Invalid credentials' })

    const accessToken = jwt.sign({
        "UserInfo": {
            "username": foundUser.username,
            "roles": foundUser.roles
        }
    },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '15m' }
    )

    const refereshToken = jwt.sign(
        { username: foundUser.username, },
        process.env.REFERESH_TOKEN_SECRET,
        { expiresIn: '7d' }
    )

    res.cookie('jwt', refereshToken,
        {
            httpOnly: true,
            sameSite: 'None',
            maxAge: 7 * 24 * 60 * 60 * 1000,
            secure: process.env.NODE_ENV === 'production'

        }
    )

    return res.status(200).json({ accessToken })


    // const refereshToken =

})

const refresh = asyncHandler(async (req, res) => {
    const cookies = req.cookies
    if (!cookies?.jwt) return res.status(401).json({ message: 'Unauthorized' })
        const refereshToken = cookies.jwt

    jwt.verify(
        refereshToken,
        process.env.REFERESH_TOKEN_SECRET,
        async (err, decoded) => {
            if (err) return res.status(401).json({ message: 'Forbidden - Invalid token' })
            const foundUser = await User.findOne({ username: decoded.username })
            if (!foundUser) return res.status(401).json({ message: 'Unauthorized' })

            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "username": foundUser.username,
                        "roles": foundUser.roles
                    }
                },

                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '15m' }
            )

            res.status(200).json({ accessToken })
        }



    )

})


const logout = asyncHandler(async (req, res) => {
    const cookies = req.cookies
    if(!cookies?.jwt) return res.status(204).json({ message: 'No content aviable' })
    
    res.clearCookie('jwt',{
        
            httpOnly: true,
            sameSite: 'None',
            maxAge: 7 * 24 * 60 * 60 * 1000,
            secure: process.env.NODE_ENV === 'production'

        
    })

    res.json({ message: 'Cookie cleared and user logged out' });
})



module.exports = {
    login,
    refresh,
    logout
}