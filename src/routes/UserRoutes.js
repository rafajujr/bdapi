import { Router } from 'express';
import userController from '../controllers/UserController';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();
// Acesso aberto de criar usuários
router.post('/', userController.store);
// Não deveria existir
router.get('/', userController.index);
router.get('/:id', loginRequired, userController.show);
// Fechado para edição somente dos dados do user logado
router.put('/', loginRequired, userController.update);
router.delete('/', loginRequired, userController.delete);

export default router;
