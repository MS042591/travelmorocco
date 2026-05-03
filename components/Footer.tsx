import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-canvas border-t border-hairline py-12 pb-24">
      <div className="container mx-auto px-4 md:px-8 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 border-b border-hairline pb-12">
          <div className="col-span-1 md:col-span-1">
            <div className="relative h-10 w-40 mb-6">
              <Image 
                src="/logo.webp" 
                alt="Travel Morocco" 
                fill
                className="object-contain"
              />
            </div>
            <p className="text-sm text-ink/70 max-w-xs">
              Curating authentic, premium travel experiences across the Kingdom of Morocco. From the Atlas to the Sahara.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-bold text-ink mb-4">Explore</h4>
            <ul className="space-y-3 text-sm text-ink">
              <li><Link href="/tours" className="hover:underline">Desert Tours</Link></li>
              <li><Link href="/tours" className="hover:underline">Imperial Cities</Link></li>
              <li><Link href="/tours" className="hover:underline">Atlas Treks</Link></li>
              <li><Link href="/tours" className="hover:underline">Coastal Getaways</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-bold text-ink mb-4">Resources</h4>
            <ul className="space-y-3 text-sm text-ink">
              <li><Link href="/blog" className="hover:underline">Travel Journal</Link></li>
              <li><Link href="#" className="hover:underline">Travel Tips</Link></li>
              <li><Link href="#" className="hover:underline">Safety information</Link></li>
              <li><Link href="#" className="hover:underline">FAQ</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-bold text-ink mb-4">Company</h4>
            <ul className="space-y-3 text-sm text-ink">
              <li><Link href="/about" className="hover:underline">About Us</Link></li>
              <li><Link href="/why-choose-us" className="hover:underline">Why Choose Us</Link></li>
              <li><Link href="#" className="hover:underline">Sustainability</Link></li>
              <li><Link href="/contact" className="hover:underline">Contact</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0 text-sm text-ink font-normal">
          <div className="flex flex-wrap justify-center lg:justify-start items-center space-x-2">
            <span>© 2026 Travel Morocco</span>
            <span className="hidden sm:inline">·</span>
            <Link href="#" className="hover:underline">Privacy</Link>
            <span className="hidden sm:inline">·</span>
            <Link href="#" className="hover:underline">Terms</Link>
            <span className="hidden sm:inline">·</span>
            <Link href="#" className="hover:underline">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
