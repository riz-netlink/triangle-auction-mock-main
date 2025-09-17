// Item card with quick bidding actions
"use client"

import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BidControls } from "@/components/bid-controls"
import type { AuctionItem } from "@/data/mock"
import { useI18n } from "./i18n"

const SAMPLE_ITEM_IMAGES = ["/images/sample-item-1.png", "/images/sample-item-2.png", "/images/sample-item-3.png"]

function pickImage(id: string) {
  const n = id.split("").reduce((a, c) => a + c.charCodeAt(0), 0)
  return SAMPLE_ITEM_IMAGES[n % SAMPLE_ITEM_IMAGES.length]
}

export function AuctionCard({ item }: { item: AuctionItem }) {
  const ends = new Date(item.endsAt)
  const { t } = useI18n()
  const imgSrc = pickImage(item.id)
  return (
    <Card className="flex flex-col h-full rounded-lg overflow-hidden border-slate-200 hover:shadow-lg hover:border-primary/30 transition">
      <Link href={`/items/${item.id}`} className="block">
        <img
          src={imgSrc || "/placeholder.svg?height=200&width=320&query=overstock%20materials%20auction%20pallets"}
          alt={item.title}
          className="w-full h-auto"
        />
      </Link>
      <CardHeader className="pb-2">
        <CardTitle className="text-base text-slate-900 line-clamp-2">{item.title}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-2 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-slate-600">{t("current")}</span>
          <span className="font-mono font-semibold text-slate-900">${item.currentBid.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-600">{t("ends")}</span>
          <span className="text-slate-900">
            {ends.toLocaleDateString()} {ends.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-600">{t("bids")}</span>
          <span className="text-slate-900">{item.bids}</span>
        </div>
        <div className="flex items-center justify-between">
          <Badge variant="secondary" className="bg-slate-100 text-slate-800">
            {item.location}
          </Badge>
          <Badge variant="secondary" className="bg-emerald-100 text-emerald-800">
            {item.category}
          </Badge>
        </div>

        <BidControls starting={item.currentBid} title={item.title} inputFirst />
      </CardContent>
      <CardFooter className="mt-auto flex items-center gap-2">
        <Button asChild variant="outline" className="ml-auto bg-transparent">
          <Link href={`/items/${item.id}`}>{t("viewItem")}</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
