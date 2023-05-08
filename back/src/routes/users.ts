import express from 'express';
import UserController from '../control/UserController';

const router = express.Router();

const userController: UserController = new UserController();

router.post('/create', userController.create);
router.post('/login', userController.login);
router.post('/forgot', userController.resetPassword);
router.post('/change-password', userController.changePassword);
router.post('/email', userController.findByEmail);
router.post('/authentication', userController.authentication);
router.get('/read', userController.read);
router.put('/update', userController.update);
router.delete('/delete', userController.remove);

export default router;