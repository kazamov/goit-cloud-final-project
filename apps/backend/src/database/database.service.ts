import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';

export class DatabaseService {
    private pool: Pool;
    public db: ReturnType<typeof drizzle>;

    constructor() {
        this.pool = new Pool({
            connectionString: process.env.DATABASE_URL,
        });

        this.db = drizzle(this.pool, { schema });
    }

    async testConnection(): Promise<boolean> {
        try {
            const client = await this.pool.connect();
            await client.query('SELECT 1');
            client.release();
            return true;
        } catch (error) {
            console.error('Database connection failed:', error);
            return false;
        }
    }

    async closeConnection(): Promise<void> {
        await this.pool.end();
    }
}

// Export a singleton instance
export const databaseService = new DatabaseService();
