"use client"
import { useI18n } from "./i18n"

interface LanguageSwitcherProps {
  compact?: boolean
}

export function LanguageSwitcher({ compact = false }: LanguageSwitcherProps) {
  const { locale, setLocale } = useI18n()
  return (
    <div className="flex items-center gap-2">
      {(["en", "es", "fr"] as const).map((l) => (
        <button
          key={l}
          aria-label={`Switch language to ${l.toUpperCase()}`}
          onClick={() => setLocale(l)}
          className={`px-2 cursor-pointer text-sm rounded border transition ${
            compact ? "py-0 h-6" : "py-1"
          } ${
            locale === l ? "bg-primary text-white border-primary" : "border-slate-600 text-slate-400 hover:bg-muted"
          }`}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  )
}
