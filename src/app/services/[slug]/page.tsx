import { ServiceDetailClient } from './ServiceDetailClient';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}) {
  const { slug } = await Promise.resolve(params);
  const formattedTitle = slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return {
    title: `${formattedTitle} Installation & Services | HD Flooring Saskatoon`,
    description: `Professional ${formattedTitle} installation, supply, and repair services in Saskatoon & Saskatchewan. Request a free estimate today.`,
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}) {
  const { slug } = await Promise.resolve(params);
  return <ServiceDetailClient slug={slug} />;
}
