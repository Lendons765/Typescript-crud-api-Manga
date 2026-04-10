// src/_helpers/db.ts
import 'rootpath';
import { Sequelize } from 'sequelize';
import * as config from '../../config.json';

export interface Database {
    User: any; // We'll type this properly after creating the model
}

export const db: Database = {} as Database;

export async function initialize(): Promise<void> {
    // Use SQLite for easier development setup
    const sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: './database.sqlite',
        logging: false // Disable SQL logging
    });

    // Initialize models
    const { default: userModel } = await import('../users/users.model');
    db.User = userModel(sequelize);

    // Sync models with database
    await sequelize.sync({ alter: true });

    console.log('✅ Database initialized and models synced');
}