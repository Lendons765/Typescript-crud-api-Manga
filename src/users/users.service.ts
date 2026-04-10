import bcrypt from 'bcryptjs';
import { db } from "../_helpers/db";
import { Role } from '../_helpers/role';
import { User , UserCreationAttributes} from './users.model';



export const userService = {
    getAll,
    getById,
    create,
    update,
    delete: _delete,
};

async function getAll(): Promise<User[]> {
    return await db.User.findAll();
}

async function getById(id: number): Promise<User> {
    return await getUser(id);
}

async function create(parms: UserCreationAttributes & {password: string}): Promise<void>{
    const existingUser = await db.User.findOne({ where: { email: parms.email } });
    if(existingUser){
        throw new Error('Email "' + parms.email + '" is already Register');
    }

    const passwordHash = await bcrypt.hash(parms.password, 10);

    await db.User.create({
        ...parms,
        passwordHash,
        role: parms.role || Role.User
    }as UserCreationAttributes);
} 

async function update(id: number, parms: Partial<UserCreationAttributes> & {password?: string}): Promise<void>{
    const user = await getUser(id);
    const updateData: Partial<UserCreationAttributes> = { ...parms };
    
    if(parms.password){
        updateData.passwordHash = await bcrypt.hash(parms.password, 10);
        delete (updateData as any).password;
    }

    await user.update(updateData);
}

async function _delete(id: number): Promise<void>{
    const user = await getUser(id);
    await user.destroy();
}


async function getUser(id: number): Promise<User> {
    const user = await db.User.scope('withHash').findByPk(id);
    if(!user){
        throw new Error('User not found');
    }
    return user;
}