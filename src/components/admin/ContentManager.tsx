
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ContentManager = () => {
  const [postType, setPostType] = useState<'blog' | 'facebook'>('blog');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Creating new post:', { type: postType, title, content });
    // Reset form
    setTitle('');
    setContent('');
  };

  return (
    <div className="space-y-6">
      <Tabs value={postType} onValueChange={(value) => setPostType(value as 'blog' | 'facebook')}>
        <TabsList>
          <TabsTrigger value="blog">Blog Post</TabsTrigger>
          <TabsTrigger value="facebook">Facebook Post</TabsTrigger>
        </TabsList>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={`${postType === 'blog' ? 'Blog' : 'Facebook'} post title`}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={`Write your ${postType} post content here...`}
              className="min-h-[200px]"
            />
          </div>

          <Button type="submit" className="w-full">
            Create {postType === 'blog' ? 'Blog Post' : 'Facebook Post'}
          </Button>
        </form>
      </Tabs>
    </div>
  );
};

export default ContentManager;
