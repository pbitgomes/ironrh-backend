import express from 'express'
import bcrypt from 'bcrypt'
import UserModel from '../models/user.model.js'
import generateToken from '../config/jwt.config.js'

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

// realizar o login
router.post("/login", async (request, response) => {
    try {
        const { email, password } = request.body

        // encontrar o usuário
        const user = await UserModel.findOne({ email: email })

        // checar se o usuário existe ou não
        if(!user) {
            return response.status(400).json({ msg: "senha e e-mail não está cadastrado"})
        }

        // comparar senhas
        if(await bcrypt.compare(password, user.password)) {
            delete user._doc.password
            const token = generateToken(user)

            return response.status(200).json({
                user: { ...user._doc },
                token: token
            })
        } else {
            return response.status(401).json({ msg: 'senha e e-mail não está correta'})
        }
    } catch (error) {
        console.log(error)
        return response.status(500).json({ msg: 'algo deu errado no login' })
    }
})

// get do usuário logado para recuperar no front-end
router.get("/profile", isAuth, attachCurrentUser, async (request, response) => {
    try {
        const loggedUser = request.currentUser

        // checar se realmente temos um usuário logado
        if(!loggedUser) {
            return response.status(404).json({msg: 'usuário não encontrado'})
        }

        const user = await UserModel.findById(loggedUser._id)

        // retirar informações sensíveis
        delete user._doc.password

        return response.status(200).json(user)
    } catch (error) {
        return response.status(500).json({ msg: 'algo deu errado'})
    }
})

export default router