import {Router} from 'express';
import { signupPostController } from '../controllers/authenticationControllers/authControllers.js';

const authRouter = Router();

// authRouter.get('/signup' , );
authRouter.post('/signup' , signupPostController);
// authRouter.get('/login' , );
// authRouter.post('/login' , );
// authRouter.get('/logout' , );


export default authRouter;


