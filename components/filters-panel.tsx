// Filters inspired by Nellis-style category/location, simplified and accessible
"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"

export function FiltersPanel({
  locations,
  categories,
  activeLocations,
  setActiveLocations,
  activeCategories,
  setActiveCategories,
  onlyOpen,
  setOnlyOpen,
  endingSoonHours,
  setEndingSoonHours,
  priceRange,
  setPriceRange,
  hideLocation,
  query,
  setQuery,
}: {
  locations: string[]
  categories: string[]
  activeLocations: string[]
  setActiveLocations: (v: string[]) => void
  activeCategories: string[]
  setActiveCategories: (v: string[]) => void
  onlyOpen: boolean
  setOnlyOpen: (v: boolean) => void
  endingSoonHours: number | null
  setEndingSoonHours: (v: number | null) => void
  priceRange: [number, number]
  setPriceRange: (v: [number, number]) => void
  hideLocation?: boolean
  query?: string
  setQuery?: (v: string) => void
}) {
  const toggle = (arr: string[], val: string, setter: (v: string[]) => void) => {
    if (arr.includes(val)) setter(arr.filter((x) => x !== val))
    else setter([...arr, val])
  }

  return (
    <div className="grid gap-6">
      {typeof query === "string" && setQuery && (
        <div className="grid gap-2">
          <Label htmlFor="search-in-filters">Search</Label>
          <Input
            id="search-in-filters"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search..."
          />
        </div>
      )}

      {!hideLocation && (
        <fieldset className="grid gap-2">
          <legend className="text-sm font-medium text-slate-900">Location</legend>
          <div className="grid gap-2">
            {locations.map((loc) => (
              <label key={loc} className="flex items-center gap-2 text-sm">
                <Checkbox
                  checked={activeLocations.includes(loc)}
                  onCheckedChange={() => toggle(activeLocations, loc, setActiveLocations)}
                  aria-label={`Filter by ${loc}`}
                />
                <span className="text-slate-700">{loc}</span>
              </label>
            ))}
          </div>
        </fieldset>
      )}

      <fieldset className="grid gap-2">
        <legend className="text-sm font-medium text-slate-900">Category</legend>
        <div className="grid gap-2">
          {categories.map((cat) => (
            <label key={cat} className="flex items-center gap-2 text-sm">
              <Checkbox
                checked={activeCategories.includes(cat)}
                onCheckedChange={() => toggle(activeCategories, cat, setActiveCategories)}
                aria-label={`Filter by ${cat}`}
              />
              <span className="text-slate-700">{cat}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-2">
        <Label>
          Price Range (${priceRange[0]} - ${priceRange[1]})
        </Label>
        <Slider
          min={0}
          max={10000}
          step={50}
          value={[priceRange[0], priceRange[1]]}
          onValueChange={(v) => setPriceRange([v[0], v[1]] as [number, number])}
          aria-label="Price range"
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="ending-soon">Ending within (hours)</Label>
        <Input
          id="ending-soon"
          type="number"
          min={0}
          placeholder="e.g., 24"
          value={endingSoonHours ?? ""}
          onChange={(e) => {
            const v = e.target.value === "" ? null : Number(e.target.value)
            setEndingSoonHours(v)
          }}
        />
      </div>

      <div className="flex items-center justify-between">
        <Label htmlFor="only-open" className="text-sm">
          Open auctions only
        </Label>
        <Switch id="only-open" checked={onlyOpen} onCheckedChange={(v) => setOnlyOpen(Boolean(v))} />
      </div>
    </div>
  )
}
