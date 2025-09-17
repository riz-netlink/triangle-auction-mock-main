// Mock Place Bid / Max Bid modal
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import type { AuctionItem } from "@/data/mock"

export function BidDialog({
  item,
  mode,
  variant,
}: {
  item: AuctionItem
  mode: "place" | "max"
  variant?: "default" | "outline"
}) {
  const [open, setOpen] = useState(false)
  const [amount, setAmount] = useState<string>("")
  const minBid = Math.max(item.currentBid + 5, item.currentBid * 1.02)

  const label = mode === "place" ? "Place Bid" : "Set Max Bid"
  const desc =
    mode === "place"
      ? `Enter a bid equal or higher than $${minBid.toFixed(2)}`
      : "Set a maximum bid. The system will automatically bid up to your max."

  const onConfirm = () => {
    // Mock validation
    const v = Number(amount)
    if (!isFinite(v) || v <= 0) {
      alert("Enter a valid amount.")
      return
    }
    if (mode === "place" && v < minBid) {
      alert(`Bid must be at least $${minBid.toFixed(2)}.`)
      return
    }
    setOpen(false)
    alert(`${label} of $${v.toFixed(2)} recorded (mock).`)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={variant === "outline" ? "outline" : "default"}
          className={variant === "outline" ? "" : "bg-orange-500 hover:bg-orange-600"}
        >
          {label}
        </Button>
      </DialogTrigger>
      <DialogContent aria-describedby="bid-desc">
        <DialogHeader>
          <DialogTitle>{label}</DialogTitle>
          <DialogDescription id="bid-desc">{desc}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-2">
          <label htmlFor={`bid-${item.id}`} className="text-sm text-slate-700">
            Amount (USD)
          </label>
          <Input
            id={`bid-${item.id}`}
            type="number"
            min={0}
            step="1"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
          />
          <p className="text-xs text-slate-600">
            Current: ${item.currentBid.toFixed(2)} • Min next bid: ${minBid.toFixed(2)}
          </p>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={onConfirm} className="bg-emerald-700 hover:bg-emerald-800">
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
