import jwt from 'jsonwebtoken';
import User from '../models/User';

class TokenController {
  async store(req, res) {
    const { email = '', password = '' } = req.body;

    if (!email || !password) {
      return res.status(401).json({
        errors: ['credenciais inválidas'],
      });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({
        errors: ['usuário não existe'],
      });
    }
    console.log();
    if (!(await user.passwordIsValid(password))) {
      return res.status(401).json({
        errors: ['A senha está incorreta'],
      });
    }

    const { id } = user;
    const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_TEMPO,
    });

    return res.json({
      token,
      user: { nome: user.nome, id, email },
    });
  }
}

export default new TokenController();
