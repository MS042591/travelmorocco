import Link from 'next/link';

interface BreadcrumbsProps {
  items: { label: string; href: string }[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="flex mb-4 overflow-x-auto no-scrollbar" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2 text-xs font-medium whitespace-nowrap">
        <li>
          <Link href="/" className="text-muted hover:text-ink transition-colors">Home</Link>
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center space-x-2">
            <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="w-2 h-2 fill-muted"><path d="m12 1 12 12-12 12-1.414-1.414L21.172 13 10.586 2.414z"></path></svg>
            <Link 
              href={item.href} 
              className={`${index === items.length - 1 ? 'text-ink font-bold pointer-events-none' : 'text-muted hover:text-ink transition-colors'}`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
