"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const db_1 = require("../_helpers/db");
const role_1 = require("../_helpers/role");
exports.userService = {
    getAll,
    getById,
    create,
    update,
    delete: _delete,
};
async function getAll() {
    return await db_1.db.User.findAll();
}
async function getById(id) {
    return await getUser(id);
}
async function create(parms) {
    const existingUser = await db_1.db.User.findOne({ where: { email: parms.email } });
    if (existingUser) {
        throw new Error('Email "' + parms.email + '" is already Register');
    }
    const passwordHash = await bcryptjs_1.default.hash(parms.password, 10);
    await db_1.db.User.create({
        ...parms,
        passwordHash,
        role: parms.role || role_1.Role.User
    });
}
async function update(id, parms) {
    const user = await getUser(id);
    if (parms.password) {
        parms.passwordHash = await bcryptjs_1.default.hash(parms.password, 10);
        delete parms.password;
    }
    await user.update(parms);
}
async function _delete(id) {
    const user = await getUser(id);
    await user.destroy();
}
async function getUser(id) {
    const user = await db_1.db.User.scope('withHash').findByPk(id);
    if (!user) {
        throw new Error('User not found');
    }
    return user;
}
