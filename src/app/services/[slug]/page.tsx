import { notFound } from 'next/navigation';
import { servicesData } from '@/data/services';
import { ServiceDetailClient } from './ServiceDetailClient';

export const dynamic = 'force-static';
export const revalidate = false;

export function generateStaticParams() {
  return servicesData.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}) {
  const { slug } = await Promise.resolve(params);
  const service = servicesData.find((s) => s.slug === slug);
  if (!service) return { title: 'Service Not Found | HD Flooring' };

  return {
    title: `${service.title} | HD Flooring Saskatoon`,
    description: service.shortDesc || service.fullDesc.slice(0, 160),
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}) {
  const { slug } = await Promise.resolve(params);
  const service = servicesData.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  return <ServiceDetailClient service={service} />;
}
