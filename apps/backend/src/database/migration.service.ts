import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { DatabaseService } from './database.service';

@Injectable()
export class MigrationService implements OnModuleInit {
    private readonly logger = new Logger(MigrationService.name);

    constructor(
        private readonly databaseService: DatabaseService,
        private readonly configService: ConfigService,
    ) { }

    async onModuleInit() {
        if (this.configService.get('NODE_ENV') === 'development') {
            await this.runMigrations();
        }
    }

    async runMigrations() {
        try {
            this.logger.log('Running database migrations...');

            await migrate(this.databaseService.db, {
                migrationsFolder: './apps/backend/src/database/migrations',
            });

            this.logger.log('Migrations completed successfully');
        } catch (error) {
            this.logger.error('Migration failed:', error);
            throw error;
        }
    }
}
