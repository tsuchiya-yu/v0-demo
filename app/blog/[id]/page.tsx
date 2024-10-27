"use client";

import { useParams } from 'next/navigation';
import { BlogPostComponent } from "@/components/BlogPostComponent"

export default function Page() {
  const { id } = useParams();
  return <BlogPostComponent id={id} />;
}
