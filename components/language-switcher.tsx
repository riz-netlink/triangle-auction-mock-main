"use client"
import { useI18n } from "./i18n"

export function LanguageSwitcher() {
  const { locale, setLocale } = useI18n()
  return (
    <div className="flex items-center gap-2">
      {(["en", "es", "fr"] as const).map((l) => (
        <button
          key={l}
          aria-label={`Switch language to ${l.toUpperCase()}`}
          onClick={() => setLocale(l)}
          className={`px-2 py-1 text-sm rounded border transition ${
            locale === l ? "bg-primary text-white border-primary" : "border-border hover:bg-muted"
          }`}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  )
}
