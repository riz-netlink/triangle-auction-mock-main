import type React from "react"
import { cn } from "@/lib/utils"

export const brand = {
  // Triangle Liquidators vibe: deep blue + lime green + neutrals (white/slate)
  blue: "#0f3a66",
  green: "#7ac142",
}

export function BrandTag({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <span
      className={cn("rounded px-2 py-0.5 text-xs font-semibold", className)}
      style={{ backgroundColor: brand.green, color: "#0f1b2a" }}
    >
      {children}
    </span>
  )
}

export function BrandHeadline({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <h1 className={cn("text-2xl font-semibold tracking-tight text-balance", className)} style={{ color: brand.blue }}>
      {children}
    </h1>
  )
}
