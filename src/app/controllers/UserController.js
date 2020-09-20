import Card from '../models/Card';
import User from '../models/User';

class UserController {
  async index(req, res) {
    try {
      const users = await User.findAll({
        attributes: ['uid', 'name', 'email'],
        include: [
          {
            model: Card,
            as: 'cards',
            attributes: ['uid', 'title', 'content', 'date', 'time'],
          },
        ],
      });
      return res.json({ users });
    } catch (error) {
      return res.json({ error });
    }
  }

  async show(req, res) {
    try {
      const { uid } = req.params;

      const user = await User.findOne({
        where: { uid },
        attributes: ['uid', 'name', 'email'],
        include: [
          {
            model: Card,
            as: 'cards',
            attributes: ['uid', 'title', 'content', 'date', 'time'],
          },
        ],
      });

      return res.json({ user });
    } catch (error) {
      return res.json({ error });
    }
  }

  async store(req, res) {
    try {
      const { email } = req.body;
      const userExist = await User.findOne({ where: { email } });
      if (userExist) {
        throw Error('Usuário já cadastrado.');
      }
      const user = await User.create(req.body);
      return res.json({ response: 'Usuário cadastrado com sucesso!', user });
    } catch (error) {
      return res.json({
        error,
      });
    }
  }

  async update(req, res) {
    try {
      const { uid } = req.params;
      const { email, oldPassword } = req.body;

      const user = await User.findByPk(uid);

      if (email !== user.email) {
        return res.json({ error: 'Usuário não encontrado.' });
      }

      if (oldPassword && !(await user.checkPassword(oldPassword))) {
        return res.status(401).json({ error: 'Senha inválida' });
      }

      const { name } = await user.update(req.body);
      return res.json({
        message: 'Dados atualizados com sucesso!',
        user: { uid, name, email },
      });
    } catch (error) {
      return res.json({
        error:
          'Não foi possível atualizar a sua senha. Tente novamente mais tarde.',
      });
    }
  }
}

export default new UserController();
