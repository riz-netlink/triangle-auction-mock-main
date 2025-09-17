import Link from "next/link"
import { getItemByAny } from "@/data/mock"
import { Badge } from "@/components/ui/badge"
import { BidControls } from "@/components/bid-controls"
import { SiteHeader } from "@/components/site-header"

const SAMPLE_ITEM_IMAGES = ["/images/sample-item-1.png", "/images/sample-item-2.png", "/images/sample-item-3.png"]
function pickImage(id: string) {
  const n = id.split("").reduce((a, c) => a + c.charCodeAt(0), 0)
  return SAMPLE_ITEM_IMAGES[n % SAMPLE_ITEM_IMAGES.length]
}

export default function ItemDetailPage({ params }: { params: { id: string } }) {
  const item = getItemByAny(params.id)
  const imgSrc = pickImage(item.id)

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 py-8 grid gap-6">
        <nav className="text-sm text-slate-600">
          <Link href="/" className="hover:underline">
            Home
          </Link>{" "}
          {" / "}
          <Link href="/" className="hover:underline">
            Locations
          </Link>{" "}
          {" / "}
          <Link
            href={`/locations/${encodeURIComponent(item.location.toLowerCase().replaceAll(" ", "-"))}`}
            className="hover:underline"
          >
            {item.location}
          </Link>{" "}
          {" / "}
          <span className="text-slate-900">{item.title}</span>
        </nav>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="border rounded-lg overflow-hidden">
            <img src={imgSrc || "/placeholder.svg"} alt={item.title} className="w-full h-auto" />
          </div>

          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <h1 className="text-pretty text-2xl font-semibold text-slate-900">{item.title}</h1>
              <Badge
                variant="secondary"
                className={item.status === "open" ? "bg-emerald-100 text-emerald-800" : "bg-slate-200 text-slate-700"}
              >
                {item.status === "open" ? "Open" : "Closed"}
              </Badge>
            </div>

            <div className="text-slate-600">{item.description}</div>

            <div className="flex items-center gap-4">
              <div className="text-sm text-slate-600">
                Category: <span className="text-slate-900">{item.category}</span>
              </div>
              <div className="text-sm text-slate-600">
                Location: <span className="text-slate-900">{item.location}</span>
              </div>
            </div>

            <div className="grid gap-2 border rounded-lg p-4">
              <div className="text-sm text-slate-600">Current Bid</div>
              <div className="text-3xl font-mono font-semibold text-slate-900">${item.currentBid.toFixed(2)}</div>
              <div className="text-sm text-slate-600">
                Bids: <span className="text-slate-900">{item.bids}</span>
              </div>
              <div className="text-sm text-slate-600">
                Ends: <span className="text-slate-900">{new Date(item.endsAt).toLocaleString()}</span>
              </div>

              <div className="pt-2">
                <BidControls starting={item.currentBid} title={item.title} inputFirst />
              </div>
            </div>

            <div className="grid gap-2">
              <h2 className="text-lg font-semibold text-slate-900">Item Details</h2>
              <ul className="list-disc ml-5 text-slate-700">
                <li>Condition: {item.condition}</li>
                <li>Lot ID: {item.id}</li>
                <li>Added: {new Date(item.createdAt).toLocaleDateString()}</li>
              </ul>
            </div>

            <div className="grid gap-2">
              <h2 className="text-lg font-semibold text-slate-900">Map</h2>
              <div className="overflow-hidden rounded-lg border">
                <iframe
                  title={`Map for ${item.location}`}
                  src={`https://www.google.com/maps?q=${encodeURIComponent(item.location)}&output=embed`}
                  className="h-64 w-full"
                  loading="lazy"
                />
              </div>
              <p className="text-sm text-slate-600">
                Not seeing a map?{" "}
                <a
                  href={`https://www.google.com/maps?q=${encodeURIComponent(item.location)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 underline"
                >
                  Open in Google Maps
                </a>
                .
              </p>
            </div>

            <div className="grid gap-2">
              <h2 className="text-lg font-semibold text-slate-900">Terms &amp; Conditions</h2>
              <ul className="list-disc ml-5 text-sm text-slate-700">
                <li>All bids are binding and include buyer&apos;s premium where applicable.</li>
                <li>Items are sold as-is, where-is. No warranties expressed or implied.</li>
                <li>Payment due within 24 hours of auction close; pickup within posted window.</li>
                <li>Winning bidder is responsible for removal, shipping, and associated costs.</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
