import type { Request,Response, NextFunction } from "express";
import {Router} from "express";
import { Role } from "../_helpers/role";
import { userService } from "./users.service";
import { validateRequest } from "../_middleware/validateRequest";
import Joi from "joi";


const router = Router();

// Validation schemas
function createSchema(req: Request, res: Response, next: NextFunction) : void{
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        title: Joi.string().valid('Mr', 'Mrs', 'Ms', 'Dr').required(),
        firstname: Joi.string().required(),
        lastname: Joi.string().required(),
        role: Joi.string().valid(Role.Admin, Role.User)
    });
    validateRequest(schema)(req, res, next);
}

function updateSchema(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object({
        email: Joi.string().email(),
        password: Joi.string().min(6),
        title: Joi.string().valid('Mr', 'Mrs', 'Ms', 'Dr'),
        firstname: Joi.string(),
        lastname: Joi.string(),
        role: Joi.string().valid(Role.Admin, Role.User)
    });
    validateRequest(schema)(req, res, next);
}


router.get('/', getAll);
router.get('/:id', getById);
router.post('/', createSchema, create);
router.put('/:id',updateSchema, update);
router.delete('/:id', _delete);



export default router;

function getAll(req: Request, res: Response, next: NextFunction): void{
    userService.getAll()
    .then(users => res.json(users))
    .catch(next);
}

function getById(req: Request, res: Response, next: NextFunction): void{
    userService.getById(parseInt(req.params.id as string))
    .then((user) => res.json(user))
    .catch(next);
}

function create(req: Request, res: Response, next: NextFunction): void{
    userService.create(req.body)
    .then(() => res.json({ message: 'User created successfully' }))
    .catch(next);
}

function update(req: Request, res: Response, next: NextFunction): void{
    userService.update(Number(req.params.id as string), req.body)
    .then(() => res.json({ message: 'User updated successfully' }))
    .catch(next);
}

function _delete(req: Request, res: Response, next: NextFunction): void{
    userService.delete(Number(req.params.id as string))
    .then(() => res.json({ message: 'User deleted successfully' }))
    .catch(next);
}




