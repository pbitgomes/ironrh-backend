import UserModel from "../models/user.model.js";

async function attachCurrentUser(request, response, next) {
  try {
    const loggedUser = request.auth;

    // encontrar o usuário através do loggedUser (token)
    const user = await UserModel.findOne({ _id: loggedUser._id });

    // se o usuário existe ou não
    if (!user) {
      return response.status(400).json({ msg: "este usuário não existe" });
    }

    request.currentUser = user;

    // seguir com o próximo passo da nossa requisição
    next();
  } catch (error) {
    console.log(error);
    return response.status(500).json("algo deu errado:", error);
  }
}

export default attachCurrentUser;
