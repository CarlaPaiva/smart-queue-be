import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { join } from 'path';
config();

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT as unknown as number,
  username: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
  synchronize: false,
  entities: [join(__dirname, '**/*modules/*/**', '*.entity.{ts,js}')],
  migrations: ['src/database/migrations/*-migration.ts'],
  logging: true,
  migrationsTableName: "custom_migration_table"
});

export default AppDataSource;