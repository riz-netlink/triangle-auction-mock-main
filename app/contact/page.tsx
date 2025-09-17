import { SiteHeader } from "@/components/site-header"

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 py-8 grid gap-6">
        <h1 className="text-2xl font-semibold text-slate-900">Contact Us</h1>
        <p className="text-slate-700">Have questions about bidding, pickup, or consigning? Reach out and we’ll help.</p>
        <div className="grid gap-2 text-sm text-slate-700">
          <div>Email: info@triangleliquidators.com</div>
          <div>Phone: (000) 000-0000</div>
        </div>
      </main>
    </>
  )
}
