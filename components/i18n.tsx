"use client"
import type React from "react"
import { createContext, useContext, useEffect, useMemo, useState } from "react"

export type Locale = "en" | "es" | "fr"
type Dict = Record<string, string>

const dictionaries: Record<Locale, Dict> = {
  en: {
    locations: "Locations",
    viewItem: "View Item",
    chooseLocation: "Choose an Auction Location",
    browseCopy:
      "Browse live auctions by outlet. No pagination—fast infinite browsing with exhaustive search, sort, and filters.",
    current: "Current",
    ends: "Ends",
    bids: "Bids",
    noMatches: "No items match your filters. Try adjusting them.",
    filtersAria: "Filters",
  },
  es: {
    locations: "Ubicaciones",
    viewItem: "Ver Artículo",
    chooseLocation: "Elige una ubicación de subasta",
    browseCopy:
      "Explora subastas por sucursal. Sin paginación: desplazamiento infinito y potentes búsqueda, orden y filtros.",
    current: "Actual",
    ends: "Termina",
    bids: "Pujas",
    noMatches: "No hay artículos que coincidan con tus filtros. Intenta ajustarlos.",
    filtersAria: "Filtros",
  },
  fr: {
    locations: "Emplacements",
    viewItem: "Voir l'article",
    chooseLocation: "Choisissez un lieu d'enchères",
    browseCopy:
      "Parcourez les enchères par dépôt. Pas de pagination — défilement infini avec recherche, tri et filtres puissants.",
    current: "Actuel",
    ends: "Se termine",
    bids: "Offres",
    noMatches: "Aucun article ne correspond à vos filtres. Essayez de les ajuster.",
    filtersAria: "Filtres",
  },
}

type I18nContextType = {
  locale: Locale
  t: (key: string) => string
  setLocale: (l: Locale) => void
}

const I18nContext = createContext<I18nContextType | null>(null)

function getInitialLocale(): Locale {
  if (typeof window === "undefined") return "en"
  const urlLang = new URLSearchParams(window.location.search).get("lang")
  if (urlLang && (["en", "es", "fr"] as const).includes(urlLang as Locale)) return urlLang as Locale
  const stored = window.localStorage.getItem("lang")
  if (stored && (["en", "es", "fr"] as const).includes(stored as Locale)) return stored as Locale
  return "en"
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>(getInitialLocale)

  // persist lang and keep URL in sync for shareable links
  useEffect(() => {
    try {
      window.localStorage.setItem("lang", locale)
    } catch {}
    try {
      const url = new URL(window.location.href)
      if (url.searchParams.get("lang") !== locale) {
        url.searchParams.set("lang", locale)
        window.history.replaceState({}, "", url.toString())
      }
    } catch {}
    try {
      document.documentElement.lang = locale
    } catch {}
  }, [locale])

  const value = useMemo<I18nContextType>(
    () => ({
      locale,
      setLocale,
      t: (key) => dictionaries[locale][key] ?? key,
    }),
    [locale],
  )
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error("useI18n must be used within I18nProvider")
  return ctx
}
