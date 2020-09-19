import Card from '../models/Card';
import User from '../models/User';

class CardController {
  async index(req, res) {
    try {
      const cards = await Card.findAll({
        attributes: ['uid', 'title', 'content', 'date', 'time'],
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['uid', 'name', 'email'],
          },
        ],
      });
      return res.json({ cards });
    } catch (error) {
      return res.json({ error });
    }
  }

  async show(req, res) {
    try {
      const { uid } = req.params;

      const card = await Card.findOne({
        where: { uid },
        attributes: ['uid', 'title', 'content', 'date', 'time'],
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['uid', 'name', 'email'],
          },
        ],
      });

      return res.json({ card });
    } catch (error) {
      return res.json({ error });
    }
  }

  async store(req, res) {
    try {
      const card = await Card.create(req.body);
      return res.json({ card });
    } catch (error) {
      const response = {
        message: 'Dados incorretos',
        error,
      };
      return res.json(response);
    }
  }

  async update(req, res) {
    try {
      const { uid } = req.params;

      const [card] = await Card.update(req.body, { where: { uid } });

      if (card) {
        throw Error('Este card não foi encontrado.');
      }
      return res.json({ card });
    } catch (error) {
      return res.json(error);
    }
  }

  async delete(req, res) {
    try {
      const { uid } = req.params;

      const deleted = await Card.destroy({ where: { uid } });

      if (!deleted) {
        throw Error('Este card não foi encontrado.');
      }

      return res.json({ result: 'Card deletado com sucesso!' });
    } catch (error) {
      const response = {
        message: 'Não foi possível excluir este card.',
        error,
      };
      return res.json(response);
    }
  }
}

export default new CardController();
