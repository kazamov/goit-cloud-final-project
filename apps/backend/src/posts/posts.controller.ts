import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe, HttpException, HttpStatus } from '@nestjs/common';
import { PostsService, type CreatePostDto, type UpdatePostDto } from './posts.service';

@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) { }

    @Post()
    async createPost(@Body() createPostDto: CreatePostDto) {
        try {
            return await this.postsService.createPost(createPostDto);
        } catch (error: unknown) {
            const dbError = error as { code?: string };
            if (dbError.code === '23503') { // Foreign key constraint violation
                throw new HttpException('Author not found', HttpStatus.BAD_REQUEST);
            }
            throw new HttpException('Failed to create post', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get()
    async getAllPosts() {
        return await this.postsService.getAllPosts();
    }

    @Get(':id')
    async getPostById(@Param('id', ParseIntPipe) id: number) {
        const post = await this.postsService.getPostById(id);
        if (!post) {
            throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
        }
        return post;
    }

    @Get('user/:userId')
    async getPostsByUserId(@Param('userId', ParseIntPipe) userId: number) {
        return await this.postsService.getPostsByUserId(userId);
    }

    @Put(':id')
    async updatePost(
        @Param('id', ParseIntPipe) id: number,
        @Body() updatePostDto: UpdatePostDto,
    ) {
        const post = await this.postsService.updatePost(id, updatePostDto);
        if (!post) {
            throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
        }
        return post;
    }

    @Delete(':id')
    async deletePost(@Param('id', ParseIntPipe) id: number) {
        const post = await this.postsService.deletePost(id);
        if (!post) {
            throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
        }
        return { message: 'Post deleted successfully', post };
    }
}
