"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"

const BRAND_BLUE = "#0f3a66"
const BRAND_GREEN = "#7ac142"

export function BidControls({
  starting,
  step = 5,
  title,
  inputFirst = false,
}: {
  starting: number
  step?: number
  title: string
  inputFirst?: boolean
}) {
  const [amount, setAmount] = useState(Math.max(step, Math.ceil(starting)))
  const { toast } = useToast()

  const inc = () => setAmount((v) => v + step)
  const dec = () => setAmount((v) => Math.max(step, v - step))

  const place = (type: "place" | "max") => {
    toast({
      title: type === "place" ? "Bid placed (mock)" : "Max bid set (mock)",
      description: `${title} • $${amount.toLocaleString()}`,
    })
  }

  return (
    <div className="grid gap-2">
      {inputFirst && (
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={dec} className="h-9 w-10 px-0 bg-transparent" aria-label="Decrease bid">
            −
          </Button>
          <div className="relative flex-1">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
            <Input
              type="number"
              inputMode="numeric"
              className="h-9 pl-6"
              value={amount}
              min={step}
              onChange={(e) => setAmount(Math.max(step, Number(e.target.value) || step))}
              aria-label="Bid amount in dollars"
            />
          </div>
          <Button variant="outline" onClick={inc} className="h-9 w-10 px-0 bg-transparent" aria-label="Increase bid">
            +
          </Button>
        </div>
      )}

      <div className="flex items-center gap-2">
        <Button
          onClick={() => place("max")}
          variant="outline"
          className="flex-1"
          style={{ borderColor: BRAND_BLUE, color: BRAND_BLUE }}
        >
          Set Max Bid
        </Button>
        <Button
          onClick={() => place("place")}
          className="flex-1"
          style={{ backgroundColor: BRAND_GREEN, color: "#0f1b2a" }}
        >
          Place Bid
        </Button>
      </div>

      {!inputFirst && (
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={dec} className="h-9 w-10 px-0 bg-transparent" aria-label="Decrease bid">
            −
          </Button>
          <div className="relative flex-1">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
            <Input
              type="number"
              inputMode="numeric"
              className="h-9 pl-6"
              value={amount}
              min={step}
              onChange={(e) => setAmount(Math.max(step, Number(e.target.value) || step))}
              aria-label="Bid amount in dollars"
            />
          </div>
          <Button variant="outline" onClick={inc} className="h-9 w-10 px-0 bg-transparent" aria-label="Increase bid">
            +
          </Button>
        </div>
      )}
    </div>
  )
}
