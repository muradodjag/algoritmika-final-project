const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const config = require('../config')

class Auth {
    constructor(admin) {
        this.admin = admin
    }

    genToken(admin) {
        const token = jwt.sign({ name: admin.login }, config.JWT_SECRET, { expiresIn: '1h' })
        return token
    }
    approveUser(token) {
        let data = null
        jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
            if (err) {
                throw new Error('Fail to Authentication. Error -> JsonWebTokenError: invalid signature')
            }
            else {
                data = { auth: true, name: decoded.name }
            }
        })
        return data
    }

    async signin(login, password) {
        const user = await this.admin.findOne({
            where: {
                login: login
            }
        })

        if (user === null) {
            throw new Error('Invalid Email or Password!')
        }

        const passwordIsValid = bcrypt.compareSync(password, user.password)
        if (!passwordIsValid) {
            throw new Error('Invalid Email or Password!')
        }
        const token = this.genToken(user)
        return { token, userData: { login } }
    }
    async signup(userDTO) {
        try {
            userDTO.password = bcrypt.hashSync(userDTO.password, 8)
            await this.admin.create(userDTO)
        } catch (err) {
            throw new Error(err.message)
        }
    }



}



module.exports = Auth