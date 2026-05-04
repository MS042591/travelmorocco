import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Travel Morocco FAQ | Essential Information & Trip Planning',
  description: 'Find answers to common questions about visiting Morocco. Logistics, safety, culture, and planning tips for your private journey.',
  alternates: {
    canonical: '/faq',
  },
};

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
