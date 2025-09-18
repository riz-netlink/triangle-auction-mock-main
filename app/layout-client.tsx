'use client'

import type React from "react"
import { usePathname } from 'next/navigation';
import { SiteFooter } from "@/components/site-footer"

export function LayoutClient({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname();
  return (
    <>
      {children}
      {pathname !== '/login' && pathname !== '/register' && pathname !== '/dashboard' && <SiteFooter />}
    </>
  )
}