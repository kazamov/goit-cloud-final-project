import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class AppService {
  constructor(private readonly databaseService: DatabaseService) { }

  async getData(): Promise<{ message: string; dbStatus: string }> {
    const isConnected = await this.databaseService.testConnection();
    return {
      message: 'Hello API',
      dbStatus: isConnected ? 'Connected' : 'Disconnected',
    };
  }
}
