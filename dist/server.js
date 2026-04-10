"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_1 = require("./_helpers/db");
const errorHandler_1 = require("./_middleware/errorHandler");
const users_controller_1 = __importDefault(require("./users/users.controller"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.use('/users', users_controller_1.default);
app.use(errorHandler_1.errorHandler);
(0, db_1.initialize)()
    .then(() => {
    app.listen(4000, () => {
        console.log('✅ Server running on http://localhost:4000');
    });
})
    .catch(err => {
    console.error('❌ Database initialization failed:', err);
    process.exit(1);
});
