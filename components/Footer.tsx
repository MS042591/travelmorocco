import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-canvas border-t border-hairline py-12 pb-24">
      <div className="container mx-auto px-4 md:px-8 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16 border-b border-hairline pb-12">
          <div>
            <h4 className="text-sm font-bold text-ink mb-4">Support</h4>
            <ul className="space-y-3 text-sm text-ink">
              <li><Link href="#" className="hover:underline">Help Center</Link></li>
              <li><Link href="#" className="hover:underline">Safety information</Link></li>
              <li><Link href="#" className="hover:underline">Cancellation options</Link></li>
              <li><Link href="#" className="hover:underline">Our COVID-19 Response</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-bold text-ink mb-4">Community</h4>
            <ul className="space-y-3 text-sm text-ink">
              <li><Link href="#" className="hover:underline">Airbnb.org: disaster relief housing</Link></li>
              <li><Link href="#" className="hover:underline">Support Afghan refugees</Link></li>
              <li><Link href="#" className="hover:underline">Celebrating diversity & belonging</Link></li>
              <li><Link href="#" className="hover:underline">Combating discrimination</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-bold text-ink mb-4">Hosting</h4>
            <ul className="space-y-3 text-sm text-ink">
              <li><Link href="#" className="hover:underline">Try hosting</Link></li>
              <li><Link href="#" className="hover:underline">AirCover: protection for Hosts</Link></li>
              <li><Link href="#" className="hover:underline">Explore hosting resources</Link></li>
              <li><Link href="#" className="hover:underline">Visit our community forum</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0 text-sm text-ink font-normal">
          <div className="flex flex-wrap justify-center lg:justify-start items-center space-x-2">
            <span>© 2026 travelmorocco, Inc.</span>
            <span className="hidden sm:inline">·</span>
            <Link href="#" className="hover:underline">Privacy</Link>
            <span className="hidden sm:inline">·</span>
            <Link href="#" className="hover:underline">Terms</Link>
            <span className="hidden sm:inline">·</span>
            <Link href="#" className="hover:underline">Sitemap</Link>
          </div>
          
          <div className="flex items-center space-x-6 font-bold">
            <button className="flex items-center space-x-2 hover:underline">
              <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 fill-ink"><path d="m8 0c-4.418278 0-8 3.581722-8 8s3.581722 8 8 8 8-3.581722 8-8-3.581722-8-8-8zm0 14.75c-3.7223348 0-6.75-3.0276652-6.75-6.75s3.0276652-6.75 6.75-6.75 6.75 3.0276652 6.75 6.75-3.0276652 6.75-6.75 6.75zm1.5-9.75h-3v1h3zm-3 2h3v1h-3zm3 2h-3v1h3zm-3 2h3v1h-3z"></path></svg>
              <span>English (US)</span>
            </button>
            <button className="hover:underline">
              <span>$ USD</span>
            </button>
            <div className="flex items-center space-x-4">
              <Link href="#" className="hover:text-muted transition-colors"><svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 fill-ink"><path d="M23.25 24c0 .69-.31 1.25-.75 1.25h-13c-.44 0-.75-.56-.75-1.25s.31-1.25.75-1.25h13c.44 0 .75.56.75 1.25zm0-4c0 .69-.31 1.25-.75 1.25h-13c-.44 0-.75-.56-.75-1.25s.31-1.25.75-1.25h13c.44 0 .75.56.75 1.25zm0-4c0 .69-.31 1.25-.75 1.25h-13c-.44 0-.75-.56-.75-1.25s.31-1.25.75-1.25h13c.44 0 .75.56.75 1.25zm0-4c0 .69-.31 1.25-.75 1.25h-13c-.44 0-.75-.56-.75-1.25s.31-1.25.75-1.25h13c.44 0 .75.56.75 1.25z"></path></svg></Link>
              <Link href="#" className="hover:text-muted transition-colors"><svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 fill-ink"><path d="M23.25 24c0 .69-.31 1.25-.75 1.25h-13c-.44 0-.75-.56-.75-1.25s.31-1.25.75-1.25h13c.44 0 .75.56.75 1.25zm0-4c0 .69-.31 1.25-.75 1.25h-13c-.44 0-.75-.56-.75-1.25s.31-1.25.75-1.25h13c.44 0 .75.56.75 1.25zm0-4c0 .69-.31 1.25-.75 1.25h-13c-.44 0-.75-.56-.75-1.25s.31-1.25.75-1.25h13c.44 0 .75.56.75 1.25zm0-4c0 .69-.31 1.25-.75 1.25h-13c-.44 0-.75-.56-.75-1.25s.31-1.25.75-1.25h13c.44 0 .75.56.75 1.25z"></path></svg></Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
