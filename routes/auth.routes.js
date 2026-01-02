import {Router } from 'express';

import { signUp, signIn, signOut } from '../controllers/auth.controller.js';


const authRouter = Router();

authRouter.post( path: '/sign-up', signUp);
authRouter.post( path: '/sign-in', signIn);
authRouter.post( path: '/sign-out', signIn);

export default authRouter;