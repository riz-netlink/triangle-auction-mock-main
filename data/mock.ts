// Mock data with locations, categories, and items
export type AuctionItem = {
  id: string
  title: string
  description: string
  location: string
  category: string
  condition: "New" | "Open Box" | "Used" | "For Parts"
  currentBid: number
  bids: number
  createdAt: string
  endsAt: string
  status: "open" | "closed"
}

const LOCATIONS = ["Phoenix, AZ", "Tucson, AZ", "Raleigh, NC", "Durham, NC", "Greensboro, NC"]
const CATEGORIES = ["Tools", "Industrial", "Electronics", "Home & Garden", "Vehicles", "Office"]

function rand<T>(arr: T[]) {
  return arr[Math.floor(Math.random() * arr.length)]
}
function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function makeItem(i: number): AuctionItem {
  const created = new Date(Date.now() - randInt(0, 10) * 86400000)
  const ends = new Date(Date.now() + randInt(1, 14) * 86400000 + randInt(0, 86400000))
  const bid = randInt(20, 4000)
  const conditions: AuctionItem["condition"][] = ["New", "Open Box", "Used", "For Parts"]
  const status: AuctionItem["status"] = Math.random() < 0.9 ? "open" : "closed"
  return {
    id: String(100000 + i),
    title: `${rand(CATEGORIES)} Lot #${i}`,
    description:
      "Quality surplus auction item from Triangle Liquidators. Review all photos and details before bidding.",
    location: rand(LOCATIONS),
    category: rand(CATEGORIES),
    condition: rand(conditions),
    currentBid: bid,
    bids: randInt(0, 42),
    createdAt: created.toISOString(),
    endsAt: ends.toISOString(),
    status,
  }
}

export const demoItems: AuctionItem[] = Array.from({ length: 120 }, (_, i) => makeItem(i + 1))

export function getAllLocations() {
  return LOCATIONS
}

export function getAllCategories() {
  return CATEGORIES
}

export function getLocationStats(loc: string) {
  const items = demoItems.filter((d) => d.location === loc)
  return { total: items.length, open: items.filter((i) => i.status === "open").length }
}

export function getItemById(id: string) {
  return demoItems.find((d) => d.id === id)
}

export function getItemByAny(id: string): AuctionItem {
  // Try exact id first
  const direct = getItemById(id)
  if (direct) return direct

  // Derive a stable item from the trailing number in the slug (e.g., "outlet-2-1927" -> 1927)
  const numMatch = id.match(/(\d+)$/)
  const lotNum = numMatch ? Number.parseInt(numMatch[1], 10) : 0
  const base = demoItems[lotNum % demoItems.length]

  // Map "outlet-N" to a real location, otherwise keep base location
  let mappedLocation = base.location
  const outletMatch = id.match(/outlet-(\d+)/i)
  if (outletMatch) {
    const outlets = getAllLocations()
    const outletIdx = (Number.parseInt(outletMatch[1], 10) - 1 + outlets.length) % outlets.length
    mappedLocation = outlets[outletIdx]
  }

  // Return a cloned item that keeps realistic fields but uses the slug as id
  return {
    ...base,
    id,
    title: `${base.category} Lot #${lotNum || base.id}`,
    location: mappedLocation,
  }
}

export function slugToLocation(slug: string) {
  const normalized = slug.replaceAll("-", " ")
  const found = LOCATIONS.find((l) => l.toLowerCase() === normalized)
  return found || LOCATIONS[0]
}
