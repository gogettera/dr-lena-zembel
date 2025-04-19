
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from "@/hooks/use-toast";
import { Plus, Save, Trash } from 'lucide-react';

export type SocialPost = {
  id: number;
  content: string;
  image: string;
  likes: number;
  comments: number;
  shares: number;
  date: string;
};

const defaultPost: SocialPost = {
  id: Date.now(),
  content: "",
  image: "",
  likes: 0,
  comments: 0,
  shares: 0,
  date: "עכשיו"
};

const SocialPostEditor = () => {
  const { toast } = useToast();
  const [posts, setPosts] = useState<SocialPost[]>(() => {
    const saved = localStorage.getItem('socialPosts');
    return saved ? JSON.parse(saved) : [];
  });
  const [newPost, setNewPost] = useState<SocialPost>(defaultPost);

  const handleSave = () => {
    if (!newPost.content || !newPost.image) {
      toast({
        title: "שגיאה",
        description: "יש למלא את כל השדות החובה",
        variant: "destructive",
      });
      return;
    }

    const updatedPosts = [...posts, { ...newPost, id: Date.now() }];
    setPosts(updatedPosts);
    localStorage.setItem('socialPosts', JSON.stringify(updatedPosts));
    setNewPost(defaultPost);
    
    toast({
      title: "נשמר בהצלחה",
      description: "הפוסט נוסף בהצלחה",
    });
  };

  const handleDelete = (id: number) => {
    const updatedPosts = posts.filter(post => post.id !== id);
    setPosts(updatedPosts);
    localStorage.setItem('socialPosts', JSON.stringify(updatedPosts));
    
    toast({
      title: "נמחק בהצלחה",
      description: "הפוסט הוסר בהצלחה",
    });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      <Card className="bg-white">
        <CardContent className="p-6 space-y-4">
          <h3 className="text-xl font-bold text-dental-navy">הוספת פוסט חדש</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">תוכן הפוסט</label>
              <Textarea
                value={newPost.content}
                onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                placeholder="הכנס את תוכן הפוסט כאן..."
                className="min-h-[100px]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">קישור לתמונה</label>
              <Input
                value={newPost.image}
                onChange={(e) => setNewPost({ ...newPost, image: e.target.value })}
                placeholder="הכנס קישור לתמונה..."
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">לייקים</label>
                <Input
                  type="number"
                  value={newPost.likes}
                  onChange={(e) => setNewPost({ ...newPost, likes: Number(e.target.value) })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">תגובות</label>
                <Input
                  type="number"
                  value={newPost.comments}
                  onChange={(e) => setNewPost({ ...newPost, comments: Number(e.target.value) })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">שיתופים</label>
                <Input
                  type="number"
                  value={newPost.shares}
                  onChange={(e) => setNewPost({ ...newPost, shares: Number(e.target.value) })}
                />
              </div>
            </div>
            <Button 
              onClick={handleSave}
              className="w-full"
            >
              <Plus className="w-4 h-4 mr-2" />
              הוסף פוסט
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h3 className="text-xl font-bold text-dental-navy">פוסטים קיימים</h3>
        {posts.map((post) => (
          <Card key={post.id} className="bg-white">
            <CardContent className="p-6 space-y-4">
              <div className="flex justify-between items-start">
                <div className="space-y-2 flex-1">
                  <p className="text-sm text-gray-600">{post.content}</p>
                  <img src={post.image} alt="תמונת פוסט" className="w-32 h-32 object-cover rounded" />
                  <div className="flex gap-4 text-sm text-gray-500">
                    <span>לייקים: {post.likes}</span>
                    <span>תגובות: {post.comments}</span>
                    <span>שיתופים: {post.shares}</span>
                  </div>
                </div>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => handleDelete(post.id)}
                >
                  <Trash className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SocialPostEditor;
