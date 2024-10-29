'use client'

import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@supabase/supabase-js'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

export function BlogListComponent() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const fetchPosts = useCallback(async () => {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false });
  
    if (error) {
      console.error('ブログ記事の取得に失敗しました:', error);
    } else {
      setPosts(data);
    }
  }, [supabase]);

  return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">ブログ記事一覧</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link href={`/blog/${post.id}`} key={post.id}>
              <Card className="h-full hover:shadow-lg transition-shadow duration-200">
                <CardHeader>
                  <Image
                    src={post.image_url}
                    alt={post.title}
                    width={400}
                    height={200}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                </CardHeader>
                <CardContent>
                  <CardTitle className="mb-2">{post.title}</CardTitle>
                  <p className="text-sm text-gray-600">{post.excerpt}</p>
                  <p className="text-xs text-gray-400 mt-2">
                    {new Date(post.created_at).toLocaleDateString('ja-JP')}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
  )
}