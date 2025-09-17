export function SiteFooter() {
  return (
    <footer className="border-t bg-white">
      <div className="mx-auto max-w-6xl px-4 py-8 grid gap-4 md:grid-cols-3">
        {/* Company */}
        <div>
          <h3 className="text-slate-900 font-semibold">Triangle Liquidators</h3>
          <p className="text-sm text-slate-600">Quality surplus and overstock auctions with transparent bidding.</p>
        </div>
        {/* Details */}
        <div className="text-sm text-slate-600">
          <div>Email: info@triangleliquidators.com</div>
          <div>Phone: (000) 000-0000</div>
          <div>Hours: Mon–Fri, 9am–5pm</div>
        </div>
        {/* Links */}
        <div className="text-sm text-slate-600">
          <a href="/" className="block hover:text-slate-900">
            Home
          </a>
          <a href="/about" className="block hover:text-slate-900">
            About
          </a>
          <a href="/contact" className="block hover:text-slate-900">
            Contact
          </a>
          <a href="/#terms" className="block hover:text-slate-900">
            Terms &amp; Conditions
          </a>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-4 pb-6 text-xs text-slate-500">
        © {new Date().getFullYear()} Triangle Liquidators. All rights reserved.
      </div>
    </footer>
  )
}
