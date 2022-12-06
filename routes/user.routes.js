import express from "express";
import bcrypt from "bcrypt";
import UserModel from "../models/user.model.js";

const router = express.Router()
const rounds = 10 // o bcryp precisa disso para saber qual é a configuração dos saltos/voltas necessários para criar o código

// cadastro do usuário
router.post("/register", async (request, response) => {
    try {
        const { password } = request.body

        if(!password) {
            return response.status(400).json({msg: "A senha não foi inserida"})
        }

        // pedido para o bcrypt fazer a string da senha (responsável por criar a criptografia)
        const saltString = await bcrypt.genSalt(rounds)
        // criar o hash da nossa senha
        const hashPassword = await bcrypt.hash(password, saltString)

        const user = await UserModel.create({
            ...request.body,
            password: hashPassword // a gente não passa as informações enviadas, mas sim a senha criptografada
        })

        // deleta a senha na hora da visualização do return (não deleta do BD)
        delete user._doc.password

        return response.status(201).json(user)
    } catch (error) {
        console.log(error)
        return response.status(500).json({msg: "algo deu errado com o cadastro"})
    }
})

export default router;
