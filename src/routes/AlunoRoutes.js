import { Router } from 'express';
import alunoController from '../controllers/AlunoController';

import loginRequired from '../middlewares/loginRequired';

const router = new Router();

// Acesso aberto de criar usuários
router.post('/', loginRequired, alunoController.store);
// Não deveria existir
router.get('/', alunoController.index);
router.get('/:id', alunoController.show);
// Fechado para edição somente dos dados do aluno logado
router.put('/:id', loginRequired, alunoController.update);
router.delete('/:id', loginRequired, alunoController.delete);

export default router;
