"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import { useParams } from "next/navigation"
import { demoItems, getAllCategories, slugToLocation } from "@/data/mock"
import { SiteHeader } from "@/components/site-header"
import ItemsExplorer from "@/components/items-explorer"

export default function LocationListingPage() {
  const params = useParams<{ slug: string }>()
  const slug = params.slug
  const location = slugToLocation(slug)
  const [query, setQuery] = useState("")
  const [sort, setSort] = useState<"ending" | "recent" | "low" | "high" | "bids">("ending")
  const [activeCategories, setActiveCategories] = useState<string[]>([])
  const [onlyOpen, setOnlyOpen] = useState<boolean>(true)
  const [endingSoonHours, setEndingSoonHours] = useState<number | null>(null)
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000])

  const categories = getAllCategories()

  const filtered = useMemo(() => {
    const now = Date.now()
    const cutoff = endingSoonHours ? now + endingSoonHours * 3600 * 1000 : null
    return demoItems
      .filter((it) => it.location === location)
      .filter((it) => (query ? (it.title + " " + it.description).toLowerCase().includes(query.toLowerCase()) : true))
      .filter((it) => (activeCategories.length ? activeCategories.includes(it.category) : true))
      .filter((it) => (onlyOpen ? it.status === "open" : true))
      .filter((it) => (cutoff ? new Date(it.endsAt).getTime() <= cutoff : true))
      .filter((it) => it.currentBid >= priceRange[0] && it.currentBid <= priceRange[1])
  }, [location, query, activeCategories, onlyOpen, endingSoonHours, priceRange])

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

  return (
    <main className="min-h-screen">
      <SiteHeader />
      <section className="border-b bg-white">
        <div className="mx-auto max-w-6xl px-4 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900 capitalize">{slug.replaceAll("-", " ")}</h1>
            <p className="text-slate-600 text-sm">Browse items at this outlet</p>
          </div>
          <Link href="/" className="text-sm text-emerald-700 hover:underline">
            All Locations
          </Link>
        </div>
      </section>

      <ItemsExplorer slug={slug} />
    </main>
  )
}
