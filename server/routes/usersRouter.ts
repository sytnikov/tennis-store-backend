import express from 'express';

import usersController from '../controllers/users';
import { validate } from '../middlewares/validate';
import { updateUserSchema, userSchema } from '../schemas/userSchema';
import { emailChecker } from '../middlewares/emailChecker';

const usersRouter = express.Router();

usersRouter.get('/', usersController.getAllUsers);
usersRouter.get('/:userId', usersController.getSingleUser);
usersRouter.post('/', validate(userSchema), emailChecker, usersController.createUser);
usersRouter.put('/:userId',validate(updateUserSchema), emailChecker,usersController.updateUser);
usersRouter.delete('/:userId', usersController.deleteUser);

export default usersRouter;