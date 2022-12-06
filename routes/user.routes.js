import express from 'express'
import bcrypt from 'bcrypt'
import UserModel from '../models/user.model.js'

const router = express.Router()
const rounds = 10

// cadastro do usuário
router.post("/register", async (request, response) => {
    try {
        const { password } = request.body

        if(!password) {
            return response.status(400).json({msg: "senha não foi inserida"})
        }

        // pedindo pro bcrypt fazer a string da senha
        const saltString = await bcrypt.genSalt(rounds)
        // criar o hash da nossa senha
        const hashPassword = await bcrypt.hash(password, saltString)

        const user = await UserModel.create({
            ...request.body,
            password: hashPassword
        })

        // deleta a senha na hora da visualização do return
        delete user._doc.password

        return response.status(201).json(user)
    } catch (error) {
        console.log(error)
        return response.status(500).json({msg: "algo deu errado com o cadastro"})
    }
})

export default router