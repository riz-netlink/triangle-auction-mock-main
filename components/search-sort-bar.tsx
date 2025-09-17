// Utility controls shared across pages
"use client"

import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function SearchSortBar({
  sort,
  setSort,
  total,
  showing,
  totalSimulated,
  query,
  setQuery,
}: {
  sort: "ending" | "recent" | "low" | "high" | "bids"
  setSort: (s: "ending" | "recent" | "low" | "high" | "bids") => void
  total: number
  showing: number
  totalSimulated?: number
  query?: string
  setQuery?: (v: string) => void
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
      <div className="text-sm text-slate-600">
        {showing} of {total} results{typeof totalSimulated === "number" ? ` (5000+ available)` : ""}
      </div>
      <div className="flex items-center gap-2">
        {typeof query === "string" && setQuery && (
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search in results"
            className="w-56"
            aria-label="Search within results"
          />
        )}
        <Select value={sort} onValueChange={(v) => setSort(v as any)}>
          <SelectTrigger className="w-48" aria-label="Sort results">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ending">Ending Soon</SelectItem>
            <SelectItem value="recent">Recently Added</SelectItem>
            <SelectItem value="low">Lowest Price</SelectItem>
            <SelectItem value="high">Highest Price</SelectItem>
            <SelectItem value="bids">Most Bids</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
