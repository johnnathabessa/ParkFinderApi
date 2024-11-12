import UserRepository from "../repositories/userRepository.js";
import { hashPassword, comparePassword } from "../utils/hash.js";


const AuthController = {
  login: async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send("Missing fields");
    }

    const user = await UserRepository.findByEmail(email);

    if (!user) {
      return res.status(404).send("User not found");
    }
    
    const inValidPassword = await comparePassword(password, user.password);

    if (!inValidPassword) {
      return res.status(401).send("Invalid password");
    }

    res.send({
      email: user.email,
      name: user.name
  });
  },
  register: async (req, res) => {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).send("Missing fields");
    }
    const hashedPassword = await hashPassword(password);

    UserRepository.create({
      email,
      password: hashedPassword,
      name,
    });

    res.send({
      email,
      name,
    });
  },
};

export default AuthController;
