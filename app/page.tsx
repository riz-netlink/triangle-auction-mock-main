"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import { demoItems, getAllLocations, getAllCategories } from "@/data/mock"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SiteHeader } from "@/components/site-header"
import Image from "next/image"
import { useI18n } from "@/components/i18n"

export default function HomePage() {
  const [query, setQuery] = useState("")
  const [sort, setSort] = useState<"ending" | "recent" | "low" | "high" | "bids">("ending")
  const [activeLocations, setActiveLocations] = useState<string[]>([])
  const [activeCategories, setActiveCategories] = useState<string[]>([])
  const [onlyOpen, setOnlyOpen] = useState<boolean>(true)
  const [endingSoonHours, setEndingSoonHours] = useState<number | null>(null)
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000])
  const [page, setPage] = useState(1)
  const pageSize = 24

  const locations = getAllLocations()
  const categories = getAllCategories()

  const filtered = useMemo(() => {
    const now = Date.now()
    const endSoonCutoff = endingSoonHours ? now + endingSoonHours * 3600 * 1000 : null
    return demoItems
      .filter((it) => (query ? (it.title + " " + it.description).toLowerCase().includes(query.toLowerCase()) : true))
      .filter((it) => (activeLocations.length ? activeLocations.includes(it.location) : true))
      .filter((it) => (activeCategories.length ? activeCategories.includes(it.category) : true))
      .filter((it) => (onlyOpen ? it.status === "open" : true))
      .filter((it) => (endSoonCutoff ? new Date(it.endsAt).getTime() <= endSoonCutoff : true))
      .filter((it) => it.currentBid >= priceRange[0] && it.currentBid <= priceRange[1])
  }, [query, activeLocations, activeCategories, onlyOpen, endingSoonHours, priceRange])

  const sorted = useMemo(() => {
    const arr = [...filtered]
    switch (sort) {
      case "ending":
        arr.sort((a, b) => new Date(a.endsAt).getTime() - new Date(b.endsAt).getTime())
        break
      case "recent":
        arr.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
      case "low":
        arr.sort((a, b) => a.currentBid - b.currentBid)
        break
      case "high":
        arr.sort((a, b) => b.currentBid - a.currentBid)
        break
      case "bids":
        arr.sort((a, b) => b.bids - a.bids)
        break
    }
    return arr
  }, [filtered, sort])

  const total = sorted.length
  const totalSimulated = 5000 // show we're ready to scale
  const start = (page - 1) * pageSize
  const pageItems = sorted.slice(start, start + pageSize)
  const totalPages = Math.max(1, Math.ceil(total / pageSize))

  const { t } = useI18n()

  const OUTLETS = Array.from({ length: 8 }).map((_, i) => ({
    name: `Outlet ${i + 1}`,
    slug: `outlet-${i + 1}`,
    address: `Warehouse ${i + 1}, North Carolina`,
  }))
  const OUTLET_IMAGES = Array.from({ length: 8 }).map((_, i) => `/images/outlets/outlet-${i + 1}.png`)

  return (
    <main className="min-h-screen">
      <SiteHeader />

      <section className="border-b bg-white">
        <div className="mx-auto max-w-6xl px-4 py-8 grid gap-4">
          <h1 className="text-pretty text-3xl md:text-4xl font-semibold text-slate-900">{t("chooseLocation")}</h1>
          <p className="text-slate-600 max-w-2xl">{t("browseCopy")}</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {OUTLETS.map((o, idx) => (
            <Link key={o.slug} href={`/locations/${o.slug}`}>
              <Card className="transition hover:shadow-lg rounded-lg overflow-hidden hover:border-primary/30">
                <div className="relative w-full h-36">
                  <Image
                    src={OUTLET_IMAGES[idx % OUTLET_IMAGES.length] || "/placeholder.svg"}
                    alt={`${o.name} photo`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <CardHeader>
                  <CardTitle>{o.name}</CardTitle>
                  <p className="text-sm text-slate-600">{o.address}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-600">Overstock materials, returns, and surplus inventory</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
