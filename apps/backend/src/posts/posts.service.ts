import { Injectable } from '@nestjs/common';
import { eq, desc } from 'drizzle-orm';
import { DatabaseService } from '../database/database.service';
import { posts, users } from '../database/schema';

export interface CreatePostDto {
    title: string;
    content: string;
    authorId: number;
}

export interface UpdatePostDto {
    title?: string;
    content?: string;
}

@Injectable()
export class PostsService {
    constructor(
        private readonly databaseService: DatabaseService,
    ) { }

    async createPost(createPostDto: CreatePostDto) {
        const [post] = await this.databaseService.db
            .insert(posts)
            .values({
                title: createPostDto.title,
                content: createPostDto.content,
                authorId: createPostDto.authorId,
            })
            .returning();

        return post;
    }

    async getAllPosts() {
        return await this.databaseService.db
            .select({
                id: posts.id,
                title: posts.title,
                content: posts.content,
                createdAt: posts.createdAt,
                updatedAt: posts.updatedAt,
                author: {
                    id: users.id,
                    name: users.name,
                    email: users.email,
                },
            })
            .from(posts)
            .leftJoin(users, eq(posts.authorId, users.id))
            .orderBy(desc(posts.createdAt));
    }

    async getPostById(id: number) {
        const [post] = await this.databaseService.db
            .select({
                id: posts.id,
                title: posts.title,
                content: posts.content,
                createdAt: posts.createdAt,
                updatedAt: posts.updatedAt,
                author: {
                    id: users.id,
                    name: users.name,
                    email: users.email,
                },
            })
            .from(posts)
            .leftJoin(users, eq(posts.authorId, users.id))
            .where(eq(posts.id, id));

        return post;
    }

    async getPostsByUserId(userId: number) {
        return await this.databaseService.db
            .select()
            .from(posts)
            .where(eq(posts.authorId, userId))
            .orderBy(desc(posts.createdAt));
    }

    async updatePost(id: number, updatePostDto: UpdatePostDto) {
        const [post] = await this.databaseService.db
            .update(posts)
            .set({
                ...updatePostDto,
                updatedAt: new Date(),
            })
            .where(eq(posts.id, id))
            .returning();

        return post;
    }

    async deletePost(id: number) {
        const [post] = await this.databaseService.db
            .delete(posts)
            .where(eq(posts.id, id))
            .returning();

        return post;
    }
}
