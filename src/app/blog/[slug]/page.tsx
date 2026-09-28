import { notFound } from 'next/navigation';
import { blogPosts } from '@/data/blogs';
import { BlogArticleClient } from './BlogArticleClient';

export const dynamic = 'force-static';
export const revalidate = false;

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}) {
  const { slug } = await Promise.resolve(params);
  const post = blogPosts.find((b) => b.slug === slug);
  if (!post) return { title: 'Article Not Found | HD Flooring' };

  return {
    title: `${post.title} | HD Flooring Blog`,
    description: post.summary,
  };
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}) {
  const { slug } = await Promise.resolve(params);
  const post = blogPosts.find((b) => b.slug === slug);

  if (!post) {
    notFound();
  }

  return <BlogArticleClient post={post} />;
}
