import { Router } from 'express';
import validate from '#middlewares/validate';
import { AuthValidation } from '#validations';
import { AuthController } from '#controllers';
import auth from '#middlewares/auth';

const router = Router();

router.post('/register', validate(AuthValidation.register), AuthController.register);
router.post('/login', validate(AuthValidation.login), AuthController.login);
router.post('/logout', validate(AuthValidation.logout), AuthController.logout);

export default router;
