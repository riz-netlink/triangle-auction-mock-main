"use client"

import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { BrandHeadline } from "./brand"
import { useI18n } from "./i18n"

const OUTLETS = Array.from({ length: 8 }).map((_, i) => ({
  name: `Outlet ${i + 1}`,
  slug: `outlet-${i + 1}`,
  address: `Warehouse ${i + 1}, Industrial Park, NC`,
}))

const OUTLET_IMAGES = Array.from({ length: 8 }).map((_, i) => `/images/outlets/outlet-${i + 1}.png`)

export function LocationsGrid() {
  const { t } = useI18n()
  return (
    <main className="mx-auto max-w-6xl px-4 py-6">
      <div className="mb-4">
        <BrandHeadline>{t("chooseLocation")}</BrandHeadline>
        <p className="mt-1 text-sm text-slate-600">{t("browseCopy")}</p>
      </div>
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {OUTLETS.map((o, idx) => (
          <Link key={o.slug} href={`/locations/${o.slug}`}>
            <Card className="overflow-hidden transition rounded-lg border-slate-200 hover:shadow-lg hover:border-primary/30">
              <div className="relative w-full h-36">
                <Image
                  src={OUTLET_IMAGES[idx % OUTLET_IMAGES.length] || "/placeholder.svg"}
                  alt={`${o.name} photo`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-slate-900">{o.name}</CardTitle>
                <p className="text-sm text-slate-600">{o.address}</p>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-slate-500">Overstock materials, returns, and surplus inventory</div>
              </CardContent>
              <CardFooter />
            </Card>
          </Link>
        ))}
      </section>
    </main>
  )
}
