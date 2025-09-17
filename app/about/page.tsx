import { SiteHeader } from "@/components/site-header"

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 py-8 grid gap-6">
        <h1 className="text-2xl font-semibold text-slate-900">About Triangle Liquidators</h1>
        <p className="text-slate-700">
          We specialize in auctioning overstock and surplus inventory with a focus on value, transparency, and speed.
          Our locations (“Outlets”) host thousands of items spanning appliances, tools, furniture, and more.
        </p>
      </main>
    </>
  )
}
