import express from "express";
import bcrypt from "bcrypt";
import UserModel from "../models/user.model.js";
import generateToken from "../config/jwt.config.js";

const router = express.Router();
const rounds = 10;

router.get("/", async (request, response) => {
  try {
    const users = await UserModel.find().populate("todos");

    return response.status(200).json(users);
  } catch (error) {
    console.log(error);
    return response.status(500).json({ msg: "Algo está errado." });
  }
});

router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const employee = await UserModel.findById(id).populate("todos");

    if (!employee) {
      return response.status(404).json("Funcionário não foi encontrado");
    }

    return response.status(200).json(employee);
  } catch (error) {
    console.log(error);
    return response.status(500).json({ msg: "Algo está errado." });
  }
});

router.post("/register", async (request, response) => {
  try {
    const { password } = request.body;

    if (!password) {
      return response.status(400).json({ msg: "senha não foi inserida" });
    }

    const saltString = await bcrypt.genSalt(rounds);
    const hashPassword = await bcrypt.hash(password, saltString);

    const user = await UserModel.create({
      ...request.body,
      password: hashPassword,
    });

    delete user._doc.password;

    return response.status(201).json(user);
  } catch (error) {
    console.log(error);
    return response.status(500).json({ msg: "algo deu errado com o cadastro" });
  }
});

router.post("/login", async (request, response) => {
  try {
    const { email, password } = request.body;

    const user = await UserModel.findOne({ email: email });

    if (!user) {
      return response
        .status(400)
        .json({ msg: "senha e e-mail não está cadastrado" });
    }

    if (await bcrypt.compare(password, user.password)) {
      delete user._doc.password;
      const token = generateToken(user);

      return response.status(200).json({
        user: { ...user._doc },
        token: token,
      });
    } else {
      return response
        .status(401)
        .json({ msg: "senha e e-mail não está correta" });
    }
  } catch (error) {
    console.log(error);
    return response.status(500).json({ msg: "algo deu errado no login" });
  }
});

router.put("/edit", async (request, response) => {
  try {
  } catch (error) {
    console.log(error);
    return response.status(500).json({ msg: "algo deu errado" });
  }
});

router.delete("", async (request, response) => {
  try {
  } catch (error) {
    console.log(error);
    return response.status(500).json({ msg: "algo deu errado" });
  }
});

export default router;
