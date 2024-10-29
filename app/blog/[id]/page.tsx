"use client";

import { useParams } from 'next/navigation';
import { BlogPostComponent } from "@/components/BlogPostComponent"

export default function BlogPostPage() {
  const params = useParams();
  let { id } = params;

  console.log('id', id);
  console.log('params', params);

  if (Array.isArray(id)) {
    id = id[0];
  }

  if (!id) {
    return <div>無効なIDです</div>;
  }

  return <BlogPostComponent id={id} />;
}