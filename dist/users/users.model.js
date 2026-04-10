"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
exports.default = default_1;
// src/users/user.model.ts
// src/users/user.model.ts
const sequelize_1 = require("sequelize");
// Define the Sequelize model class
class User extends sequelize_1.Model {
}
exports.User = User;
// Export the model initializer function
function default_1(sequelize) {
    User.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        email: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        passwordHash: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        title: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        firstname: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        lastname: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        createdAt: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize_1.DataTypes.NOW,
        },
        updatedAt: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize_1.DataTypes.NOW,
        },
    }, {
        sequelize,
        modelName: 'User',
        tableName: 'users',
        timestamps: true, // ✅ Ensure this is true (default)
        defaultScope: {
            attributes: { exclude: ['passwordHash'] },
        },
        scopes: {
            withHash: {
                attributes: { include: ['passwordHash'] },
            },
        },
    });
    return User;
}
