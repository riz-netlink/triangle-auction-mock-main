"use client"

import Link from "next/link"
import Image from "next/image"
import { LanguageSwitcher } from "./language-switcher"
import { useI18n } from "./i18n"

export function SiteHeader() {
  const { t } = useI18n()
  return (
    <header className="w-full border-b bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-3" aria-label="Triangle Liquidators Home">
          <Image src="/images/tl-logo.png" alt="Triangle Liquidators" width={160} height={57} priority />
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          <Link href="/" className="text-sm font-medium text-slate-700 hover:text-slate-900">
            Home
          </Link>
          <Link href="/" className="text-sm font-medium text-slate-700 hover:text-slate-900">
            {t("locations")}
          </Link>
          <Link href="/about" className="text-sm font-medium text-slate-700 hover:text-slate-900">
            About
          </Link>
          <Link href="/contact" className="text-sm font-medium text-slate-700 hover:text-slate-900">
            Contact
          </Link>
          <Link href="/login" className="text-sm font-medium text-slate-700 hover:text-slate-900">
            Login
          </Link>
          <LanguageSwitcher />
        </nav>
        {/* mobile language switcher */}
        <div className="flex items-center gap-4 md:hidden">
          <Link href="/login" className="text-sm font-medium text-slate-700 hover:text-slate-900">
            Login
          </Link>
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  )
}
