"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { AuctionCard } from "@/components/auction-card"
import { SearchSortBar } from "@/components/search-sort-bar"
import { FiltersPanel } from "@/components/filters-panel"
import type { AuctionItem } from "@/data/mock"
import { getAllCategories } from "@/data/mock"
import { useI18n } from "@/components/i18n"

function seededRandom(seed: number) {
  let x = seed || 123456789
  return () => {
    x ^= x << 13
    x ^= x >>> 17
    x ^= x << 5
    return ((x < 0 ? ~x + 1 : x) >>> 0) / 4294967295
  }
}

function generateItems(slug: string, count = 5000): AuctionItem[] {
  const rand = seededRandom(slug.split("").reduce((a, c) => a + c.charCodeAt(0), 0))
  const categories = getAllCategories()
  const conditions: AuctionItem["condition"][] = ["New", "Open Box", "Used", "For Parts"]
  const items: AuctionItem[] = []
  for (let i = 1; i <= count; i++) {
    const created = Date.now() - Math.floor(rand() * 10) * 86400000
    const ends = Date.now() + Math.floor(rand() * 14 + 1) * 86400000 + Math.floor(rand() * 86400000)
    const bid = Math.floor(rand() * 3950) + 50
    const status: AuctionItem["status"] = rand() < 0.92 ? "open" : "closed"
    const category = categories[Math.floor(rand() * categories.length)]
    const condition = conditions[Math.floor(rand() * conditions.length)]
    items.push({
      id: `${slug}-${i}`,
      title: `${category} Lot #${i}`,
      description: "Overstock and returns from Triangle Liquidators. Review details and photos before bidding.",
      location: slug,
      category,
      condition,
      currentBid: bid,
      bids: Math.floor(rand() * 50),
      createdAt: new Date(created).toISOString(),
      endsAt: new Date(ends).toISOString(),
      status,
    })
  }
  return items
}

function useInfiniteScroll(callback: () => void) {
  const ref = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    if (!ref.current) return
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) callback()
      },
      { rootMargin: "600px 0px" },
    )
    obs.observe(ref.current)
    return () => obs.disconnect()
  }, [callback])
  return ref
}

export default function ItemsExplorer({ slug }: { slug: string }) {
  const [query, setQuery] = useState("")
  const [sort, setSort] = useState<"ending" | "recent" | "low" | "high" | "bids">("ending")
  const [activeCategories, setActiveCategories] = useState<string[]>([])
  const [onlyOpen, setOnlyOpen] = useState<boolean>(true)
  const [endingSoonHours, setEndingSoonHours] = useState<number | null>(null)
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000])
  const categories = getAllCategories()
  const { t } = useI18n()

  const [items] = useState(() => generateItems(slug, 5000))
  const [visible, setVisible] = useState(36)
  const loadMore = () => setVisible((v) => Math.min(v + 36, filtered.length))
  const sentinelRef = useInfiniteScroll(loadMore)

  const filtered = useMemo(() => {
    const now = Date.now()
    const endSoonCutoff = endingSoonHours ? now + endingSoonHours * 3600 * 1000 : null
    const q = query.trim().toLowerCase()

    return items
      .filter((it) => (!q ? true : (it.title + " " + it.description).toLowerCase().includes(q)))
      .filter((it) => (activeCategories.length ? activeCategories.includes(it.category) : true))
      .filter((it) => (onlyOpen ? it.status === "open" : true))
      .filter((it) => (endSoonCutoff ? new Date(it.endsAt).getTime() <= endSoonCutoff : true))
      .filter((it) => it.currentBid >= priceRange[0] && it.currentBid <= priceRange[1])
  }, [items, query, activeCategories, onlyOpen, endingSoonHours, priceRange])

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

  const page = sorted.slice(0, visible)

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 grid gap-6 md:grid-cols-[280px_1fr]">
      <aside aria-label={t("filtersAria")} className="md:sticky md:top-4 h-fit border rounded-lg p-4">
        <FiltersPanel
          locations={[]}
          categories={categories}
          activeLocations={[]}
          setActiveLocations={() => {}}
          activeCategories={activeCategories}
          setActiveCategories={setActiveCategories}
          onlyOpen={onlyOpen}
          setOnlyOpen={setOnlyOpen}
          endingSoonHours={endingSoonHours}
          setEndingSoonHours={setEndingSoonHours}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          hideLocation
          query={query}
          setQuery={setQuery}
        />
      </aside>

      <div className="grid gap-4">
        <SearchSortBar
          sort={sort}
          setSort={setSort}
          total={sorted.length}
          showing={page.length}
          totalSimulated={5000}
          query={query}
          setQuery={setQuery}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {page.map((item) => (
            <AuctionCard key={item.id} item={item} />
          ))}
        </div>

        {page.length < sorted.length && <div ref={sentinelRef} className="h-10 w-full" aria-hidden />}
        {sorted.length === 0 && <div className="py-10 text-center text-slate-600">{t("noMatches")}</div>}
      </div>
    </div>
  )
}
