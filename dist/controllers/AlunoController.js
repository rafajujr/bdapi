"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Aluno = require('../models/Aluno'); var _Aluno2 = _interopRequireDefault(_Aluno);
var _Foto = require('../models/Foto'); var _Foto2 = _interopRequireDefault(_Foto);

class AlunoController {
  // Index
  async index(req, res) {
    const alunos = await _Aluno2.default.findAll({
      attributes: ['id', 'nome', 'idade', 'peso', 'altura'],
      order: [['id', 'DESC'], [_Foto2.default, 'id', 'DESC']],
      include: {
        model: _Foto2.default,
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

      const aluno = await _Aluno2.default.findByPk(id, {
        attributes: ['id', 'nome', 'idade', 'peso', 'altura'],
        order: [['id', 'DESC'], [_Foto2.default, 'id', 'DESC']],
        include: {
          model: _Foto2.default,
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
      const aluno = await _Aluno2.default.create(req.body);
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

      const aluno = await _Aluno2.default.findByPk(id);
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

      const aluno = await _Aluno2.default.findByPk(id);

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

exports. default = new AlunoController();
