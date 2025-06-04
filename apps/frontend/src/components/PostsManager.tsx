'use client';

import { useState, useEffect, useTransition } from 'react';
import { getAllPosts, getAllUsers, createPost, updatePost, deletePost, type Post, type User, type CreatePostDto, type UpdatePostDto } from '../lib/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Plus, Edit, Trash2, FileText, User as UserIcon, Calendar, Loader2 } from 'lucide-react';

interface PostFormData {
    title: string;
    content: string;
    authorId: number;
}

export default function PostsManager() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingPost, setEditingPost] = useState<Post | null>(null);
    const [isPending, startTransition] = useTransition();

    const [formData, setFormData] = useState<PostFormData>({
        title: '',
        content: '',
        authorId: 0,
    });

    // Load initial data
    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const [postsData, usersData] = await Promise.all([
                getAllPosts(),
                getAllUsers(),
            ]);
            setPosts(postsData);
            setUsers(usersData);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load data');
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreatePost = () => {
        setFormData({ title: '', content: '', authorId: users[0]?.id || 0 });
        setIsCreateModalOpen(true);
    };

    const handleEditPost = (post: Post) => {
        setEditingPost(post);
        setFormData({
            title: post.title,
            content: post.content,
            authorId: post.author?.id || 0,
        });
        setIsEditModalOpen(true);
    };

    const handleDeletePost = async (id: number) => {
        startTransition(async () => {
            try {
                await deletePost(id);
                setPosts(posts.filter(post => post.id !== id));
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to delete post');
            }
        });
    };

    const handleSubmitCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.title.trim() || !formData.content.trim() || !formData.authorId) {
            setError('Please fill in all fields');
            return;
        }

        startTransition(async () => {
            try {
                const createData: CreatePostDto = {
                    title: formData.title.trim(),
                    content: formData.content.trim(),
                    authorId: formData.authorId,
                };
                const newPost = await createPost(createData);
                setPosts([newPost, ...posts]);
                setIsCreateModalOpen(false);
                setFormData({ title: '', content: '', authorId: 0 });
                setError(null);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to create post');
            }
        });
    };

    const handleSubmitEdit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingPost || !formData.title.trim() || !formData.content.trim()) {
            setError('Please fill in all fields');
            return;
        }

        startTransition(async () => {
            try {
                const updateData: UpdatePostDto = {
                    title: formData.title.trim(),
                    content: formData.content.trim(),
                };
                const updatedPost = await updatePost(editingPost.id, updateData);
                setPosts(posts.map(post => post.id === editingPost.id ? updatedPost : post));
                setIsEditModalOpen(false);
                setEditingPost(null);
                setFormData({ title: '', content: '', authorId: 0 });
                setError(null);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to update post');
            }
        });
    };

    const closeModals = () => {
        setIsCreateModalOpen(false);
        setIsEditModalOpen(false);
        setEditingPost(null);
        setFormData({ title: '', content: '', authorId: 0 });
        setError(null);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center space-y-4">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
                    <p className="text-muted-foreground">Loading posts...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8 space-y-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="space-y-1">
                        <h1 className="text-4xl font-bold tracking-tight">Posts Manager</h1>
                        <p className="text-muted-foreground">
                            Create, edit, and manage your blog posts
                        </p>
                    </div>
                    <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
                        <DialogTrigger asChild>
                            <Button
                                onClick={handleCreatePost}
                                disabled={isPending}
                                size="lg"
                                className="gap-2"
                            >
                                <Plus className="h-4 w-4" />
                                Create Post
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[600px]">
                            <DialogHeader>
                                <DialogTitle>Create New Post</DialogTitle>
                                <DialogDescription>
                                    Fill out the form below to create a new blog post.
                                </DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleSubmitCreate} className="space-y-4">
                                <div className="space-y-2">
                                    <label htmlFor="title" className="text-sm font-medium">
                                        Title
                                    </label>
                                    <Input
                                        id="title"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        placeholder="Enter post title..."
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="author" className="text-sm font-medium">
                                        Author
                                    </label>
                                    <Select
                                        value={formData.authorId.toString()}
                                        onValueChange={(value) => setFormData({ ...formData, authorId: parseInt(value) })}
                                        required
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select an author..." />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {users.map((user) => (
                                                <SelectItem key={user.id} value={user.id.toString()}>
                                                    <div className="flex items-center gap-2">
                                                        <UserIcon className="h-4 w-4" />
                                                        {user.name} ({user.email})
                                                    </div>
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="content" className="text-sm font-medium">
                                        Content
                                    </label>
                                    <Textarea
                                        id="content"
                                        value={formData.content}
                                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                        rows={8}
                                        placeholder="Write your post content..."
                                        required
                                    />
                                </div>
                                <div className="flex justify-end gap-3 pt-4">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={closeModals}
                                        disabled={isPending}
                                    >
                                        Cancel
                                    </Button>
                                    <Button type="submit" disabled={isPending} className="gap-2">
                                        {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
                                        Create Post
                                    </Button>
                                </div>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Error Display */}
                {error && (
                    <Card className="border-destructive bg-destructive/10">
                        <CardContent className="pt-6">
                            <div className="flex items-center gap-2 text-destructive">
                                <FileText className="h-4 w-4" />
                                <span className="font-medium">{error}</span>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Posts Grid */}
                {posts.length === 0 ? (
                    <Card className="text-center py-12">
                        <CardContent className="space-y-4">
                            <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                                <FileText className="h-8 w-8 text-muted-foreground" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-xl font-semibold">No posts yet</h3>
                                <p className="text-muted-foreground">
                                    Get started by creating your first blog post
                                </p>
                            </div>
                            <Button onClick={handleCreatePost} className="gap-2">
                                <Plus className="h-4 w-4" />
                                Create Your First Post
                            </Button>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {posts.map((post) => (
                            <Card key={post.id} className="group hover:shadow-lg transition-all duration-200 hover:scale-[1.02]">
                                <CardHeader className="space-y-3">
                                    <div className="flex justify-between items-start">
                                        <CardTitle className="text-xl line-clamp-2 group-hover:text-primary transition-colors">
                                            {post.title}
                                        </CardTitle>
                                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleEditPost(post)}
                                                disabled={isPending}
                                                className="h-8 w-8 p-0"
                                            >
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        disabled={isPending}
                                                        className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Delete Post</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            Are you sure you want to delete &ldquo;{post.title}&rdquo;? This action cannot be undone.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                        <AlertDialogAction
                                                            onClick={() => handleDeletePost(post.id)}
                                                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                                        >
                                                            Delete
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <UserIcon className="h-4 w-4" />
                                        <span className="font-medium">{post.author?.name || 'Unknown'}</span>
                                        <Badge variant="secondary" className="text-xs px-2 py-0.5">
                                            {post.author?.email || 'No email'}
                                        </Badge>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <CardDescription className="line-clamp-3 text-base leading-relaxed">
                                        {post.content}
                                    </CardDescription>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground pt-2 border-t">
                                        <Calendar className="h-4 w-4" />
                                        <span>{formatDate(post.createdAt)}</span>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}

                {/* Edit Modal */}
                <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
                    <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                            <DialogTitle>Edit Post</DialogTitle>
                            <DialogDescription>
                                Make changes to your post below.
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleSubmitEdit} className="space-y-4">
                            <div className="space-y-2">
                                <label htmlFor="edit-title" className="text-sm font-medium">
                                    Title
                                </label>
                                <Input
                                    id="edit-title"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    placeholder="Enter post title..."
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Author</label>
                                <div className="flex items-center gap-2 p-3 bg-muted rounded-md">
                                    <UserIcon className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm">
                                        {editingPost?.author?.name || 'Unknown'} ({editingPost?.author?.email || 'No email'})
                                    </span>
                                    <Badge variant="outline" className="text-xs">
                                        Cannot be changed
                                    </Badge>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="edit-content" className="text-sm font-medium">
                                    Content
                                </label>
                                <Textarea
                                    id="edit-content"
                                    value={formData.content}
                                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                    rows={8}
                                    placeholder="Write your post content..."
                                    required
                                />
                            </div>
                            <div className="flex justify-end gap-3 pt-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={closeModals}
                                    disabled={isPending}
                                >
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={isPending} className="gap-2">
                                    {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
                                    Update Post
                                </Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}
