import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DatabaseService } from '../database/database.service';
import { users } from '../database/schema';

export interface CreateUserDto {
    email: string;
    name: string;
}

export interface UpdateUserDto {
    name?: string;
}

@Injectable()
export class UsersService {
    constructor(private readonly databaseService: DatabaseService) { }

    async createUser(createUserDto: CreateUserDto) {
        const [user] = await this.databaseService.db
            .insert(users)
            .values({
                email: createUserDto.email,
                name: createUserDto.name,
            })
            .returning();

        return user;
    }

    async getAllUsers() {
        return await this.databaseService.db.select().from(users);
    }

    async getUserById(id: number) {
        const [user] = await this.databaseService.db
            .select()
            .from(users)
            .where(eq(users.id, id));

        return user;
    }

    async getUserByEmail(email: string) {
        const [user] = await this.databaseService.db
            .select()
            .from(users)
            .where(eq(users.email, email));

        return user;
    }

    async updateUser(id: number, updateUserDto: UpdateUserDto) {
        const [user] = await this.databaseService.db
            .update(users)
            .set({
                ...updateUserDto,
                updatedAt: new Date(),
            })
            .where(eq(users.id, id))
            .returning();

        return user;
    }

    async deleteUser(id: number) {
        const [user] = await this.databaseService.db
            .delete(users)
            .where(eq(users.id, id))
            .returning();

        return user;
    }
}
