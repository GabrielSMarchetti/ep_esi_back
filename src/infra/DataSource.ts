import { DataSource } from 'typeorm';
import { User } from '../entities/User';

export class SqliteDataSource extends DataSource {
    private static instance: SqliteDataSource;

    private constructor() {
        super({
            type: 'sqlite',
            database: 'database/your_database.sqlite',
            entities: [
                User
            ],
            synchronize: true,
        });
    }

    public initialize(): Promise<this> {
        return super.initialize();
    }

    public static getInstance(): SqliteDataSource {
        if (!SqliteDataSource.instance) {
            SqliteDataSource.instance = new SqliteDataSource();
        }
        return SqliteDataSource.instance;
    }
}