import { join } from 'path';
import { createConnection, ConnectionOptions, useContainer } from 'typeorm';
import { Container } from 'typeorm-typedi-extensions';
import { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_HOST, POSTGRES_PORT, POSTGRES_DATABASE } from '@/config';

export const dbConnection = async () => {
  useContainer(Container);

  const dbConfig: ConnectionOptions = {
    type: 'postgres',
    username: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    host: POSTGRES_HOST,
    port: +POSTGRES_PORT,
    database: POSTGRES_DATABASE,
    synchronize: true,
    logging: false,
    entities: [join(__dirname, '../**/*.entity{.ts,.js}')],
    migrations: [join(__dirname, '../**/*.migration{.ts,.js}')],
    subscribers: [join(__dirname, '../**/*.subscriber{.ts,.js}')],
    cli: {
      entitiesDir: 'src/entities',
      migrationsDir: 'src/migration',
      subscribersDir: 'src/subscriber',
    },
  };

  const connection = await createConnection(dbConfig);
  await connection.runMigrations();

  return connection;
};
