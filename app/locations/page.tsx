"use client"

import Link from "next/link"
import { getAllLocations, getLocationStats } from "@/data/mock"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function LocationsPage() {
  const locations = getAllLocations()
  return (
    <main className="mx-auto max-w-6xl px-4 py-8 grid gap-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-slate-900 text-balance">Auction Locations</h1>
        <Link href="/" className="text-sm text-emerald-700 hover:underline">
          Back to Home
        </Link>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {locations.map((loc) => {
          const stats = getLocationStats(loc)
          return (
            <Link
              key={loc}
              href={`/locations/${encodeURIComponent(loc.toLowerCase().replaceAll(" ", "-"))}`}
              className="block"
            >
              <Card className="hover:shadow-sm transition">
                <CardHeader className="pb-2">
                  <CardTitle className="text-slate-900">{loc}</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-between text-sm text-slate-600">
                  <div>{stats.open} open auctions</div>
                  <Badge variant="secondary" className="bg-slate-100 text-slate-800">
                    {stats.total} items
                  </Badge>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>
    </main>
  )
}
