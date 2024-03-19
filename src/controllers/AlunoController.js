import Aluno from '../models/Aluno';
import Foto from '../models/Foto';

class AlunoController {
  // Index
  async index(req, res) {
    const alunos = await Aluno.findAll({
      attributes: ['id', 'nome', 'email', 'idade', 'peso', 'altura'],
      order: [['id', 'DESC'], [Foto, 'id', 'DESC']],
      include: {
        model: Foto,
        attributes: ['filename', 'url'],
      },
    });
    return res.json(alunos);
  }

  // Show
  async show(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(401).json({
          errors: ['Aluno não cadastrado'],
        });
      }

      const aluno = await Aluno.findByPk(id, {
        attributes: ['id', 'nome', 'email', 'idade', 'peso', 'altura'],
        order: [['id', 'DESC'], [Foto, 'id', 'DESC']],
        include: {
          model: Foto,
          attributes: ['filename', 'url'],
        },
      });

      if (!aluno) {
        return res.status(401).json({
          errors: ['Aluno não existe'],
        });
      }
      return res.send(aluno);
    } catch (e) {
      return res.status(401).json({
        errors: ['Aluno não cadastrado'],
      });
    }
  }

  // Store
  async store(req, res) {
    try {
      const aluno = await Aluno.create(req.body);
      return res.send(aluno);
    } catch (e) {
      return res.status(401).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  // Update
  async update(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(401).json({
          errors: ['Falta ID'],
        });
      }

      const aluno = await Aluno.findByPk(id);
      console.log(aluno);

      if (!aluno) {
        return res.status(401).json({
          errors: ['Aluno não existe'],
        });
      }

      const alunoUpdate = await aluno.update(req.body);
      return res.json(alunoUpdate);
    } catch (e) {
      return res.status(401).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  // Delete
  async delete(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(401).json({
          errors: ['Aluno não cadastrado'],
        });
      }

      const aluno = await Aluno.findByPk(id);

      if (!aluno) {
        return res.status(401).json({
          errors: ['Aluno não existe'],
        });
      }

      await aluno.destroy();
      return res.send('Aluno apagado com sucesso');
    } catch (e) {
      return res.status(401).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

export default new AlunoController();
