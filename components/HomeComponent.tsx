'use client'

import { useEffect, useState, useCallback } from 'react'
import Image from 'next/image'
import { createClient } from '@supabase/supabase-js'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

export function HomeComponent() {
  const [catInfo, setCatInfo] = useState(null)
  const [posts, setPosts] = useState([])

  const fetchCatInfo = useCallback(async () => {
    const { data, error } = await supabase
      .from('cat_info')
      .select('*')
      .single();
  
    if (error) {
      console.error('猫の情報の取得に失敗しました:', error);
    } else {
      setCatInfo(data);
    }
  }, []);
  
  const fetchLatestPosts = useCallback(async () => {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(3);
  
    if (error) {
      console.error('最新の投稿の取得に失敗しました:', error);
    } else {
      setPosts(data);
    }
  }, []);
  
  useEffect(() => {
    fetchCatInfo();
    fetchLatestPosts();
  }, [fetchCatInfo, fetchLatestPosts]);

  if (!catInfo) {
    return <div>読み込み中...</div>
  }

  return (
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  {catInfo.name}の世界へようこそ
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  {catInfo.short_description}
                </p>
              </div>
              <div className="space-x-4">
                <Button asChild>
                  <a href="/gallery">ギャラリーを見る</a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="/blog/list">ブログを読む</a>
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <Image
                alt={`${catInfo.name}の写真`}
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
                height="310"
                src={catInfo.image_url}
                width="550"
              />
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">{catInfo.name}について</h2>
                  <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                    {catInfo.long_description}
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button className="inline-flex items-center justify-center">
                    <a href={catInfo.instagram_url} target="_blank" rel="noopener noreferrer">Instagram</a>
                  </Button>
                  <Button variant="outline">
                    <a href={catInfo.twitter_url} target="_blank" rel="noopener noreferrer">Twitter</a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">最新の投稿</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  {catInfo.name}の日常や可愛い瞬間をお届けします。
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              {posts.map((post) => (
                <Card key={post.id}>
                  <CardContent className="flex flex-col items-center space-y-4 text-center">
                    <Image
                      alt={post.title}
                      className="aspect-video overflow-hidden rounded-xl object-cover object-center"
                      height="200"
                      src={post.image_url}
                      width="300"
                    />
                    <h3 className="text-xl font-bold">{post.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{post.excerpt}</p>
                    <Button variant="outline" asChild>
                      <a href={`/blog/${post.id}`}>続きを読む</a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
  )
}