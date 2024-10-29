"use client";

import { useRouter } from 'next/router';
import { BlogPostComponent } from "@/components/BlogPostComponent"

export default function BlogPostPage() {
  const router = useRouter();
  const { id } = router.query;

  if (typeof id !== 'string') {
    return <div>無効なIDです</div>;
  }

  return <BlogPostComponent id={id} />;
}