'use client';

import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

export function BlogPostComponent({ id }) {
  const [post, setPost] = useState(null);

  const fetchPost = useCallback(async () => {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('id', id)
      .single();
  
    if (error) {
      console.error('ブログ記事の取得に失敗しました:', error);
    } else {
      setPost(data);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchPost();
    }
  }, [id, fetchPost]);

  if (!post) {
    return (
        <div className="container mx-auto px-4 py-8">読み込み中...</div>
    );
  }

  return (
      <div className="container mx-auto px-4 py-8">
        <article className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
          <p className="text-sm text-gray-500 mb-4">
            {new Date(post.created_at).toLocaleDateString('ja-JP')}
          </p>
          <Image
            src={post.image_url}
            alt={post.title}
            width={800}
            height={400}
            className="w-full h-64 object-cover rounded-lg mb-6"
          />
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </div>
  );
}
