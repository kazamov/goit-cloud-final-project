'use server';

// Types matching the backend DTOs
export interface User {
    id: number;
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
}

export interface Post {
    id: number;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    author?: {
        id: number;
        name: string;
        email: string;
    };
}

export interface CreatePostDto {
    title: string;
    content: string;
    authorId: number;
}

export interface UpdatePostDto {
    title?: string;
    content?: string;
}

const API_URL = process.env.API_URL || 'http://localhost:8000/api';

// Posts API functions
export async function getAllPosts(): Promise<Post[]> {
    try {
        const response = await fetch(`${API_URL}/posts`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'no-store',
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch posts: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching posts:', error);
        throw error;
    }
}

export async function createPost(data: CreatePostDto): Promise<Post> {
    try {
        const response = await fetch(`${API_URL}/posts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to create post: ${errorText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error creating post:', error);
        throw error;
    }
}

export async function updatePost(id: number, data: UpdatePostDto): Promise<Post> {
    try {
        const response = await fetch(`${API_URL}/posts/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to update post: ${errorText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error updating post:', error);
        throw error;
    }
}

export async function deletePost(id: number): Promise<void> {
    try {
        const response = await fetch(`${API_URL}/posts/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to delete post: ${errorText}`);
        }
    } catch (error) {
        console.error('Error deleting post:', error);
        throw error;
    }
}

// Users API functions  
export async function getAllUsers(): Promise<User[]> {
    try {
        const response = await fetch(`${API_URL}/users`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'no-store',
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch users: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
}
