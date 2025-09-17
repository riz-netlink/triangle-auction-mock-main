"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import Image from "next/image"
import { LanguageSwitcher } from "@/components/language-switcher"
import { I18nProvider } from "@/components/i18n"
import { useState, ReactNode } from "react"
import { Eye, EyeOff, SquareArrowOutUpRight } from "lucide-react"

interface I18nProviderProps {
  children: ReactNode;
}

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <I18nProvider>
      <div className="grid h-screen grid-cols-1 lg:grid-cols-[3fr_2fr] gap-0">
        {/* Left Column */}
        <div className="flex flex-col">
          {/* Header */}
          <header className="sticky top-0 z-10 flex items-center justify-between bg-white px-4 py-4">
            <Image
              src="/images/triangle-logo.png"
              alt="Triangle Logo"
              height="40"
              width="0"
              style={{ width: 'auto', maxHeight: '56px' }}
            />
            <LanguageSwitcher />
          </header>

          {/* Login Form */}
          <main className="flex flex-1 items-center justify-center px-4">
            <div className="w-full max-w-md space-y-6">
              <div className="text-left">
                <h1 className="text-3xl font-bold">Welcome</h1>
                <p className="text-muted-foreground">
                  Log in to your <b>Triangle Liquidators</b> account.
                </p>
              </div>
              <form>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="email" className="mb-1 block">Email</Label>
                    <Input id="email" type="email" placeholder="m@example.com" required className="rounded-[6px] border-zinc-300" />
                  </div>
                  <div>
                    <Label htmlFor="password" className="mb-1 block">Password</Label>
                    <div className="relative mb-4">
                      <Input 
                        id="password" 
                        type={showPassword ? "text" : "password"} 
                        required 
                        className="rounded-[6px] border-zinc-300 pr-10" 
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                    <Link href="#" className="text-sm underline">
                      Forgot your password?
                    </Link>
                  </div>
                  <Button type="submit" className="w-full h-10 rounded-[6px]">
                    Login
                  </Button>
                  <Button variant="link" className="w-full h-10 text-zinc-900 hover:underline" asChild>
                    <Link href="/">Cancel</Link>
                  </Button>
                </div>
              </form>
              <div className="text-center text-sm">
                Don&apos;t have an account? <Link href="/register" className="underline">Register</Link>
              </div>
            </div>
          </main>

          {/* Footer */}
          <footer className="sticky bottom-0 bg-white px-4 py-6 text-sm text-center lg:text-left">
            <Link href="#" className="mr-4 underline inline-flex items-center gap-1">
              Privacy Policy
              <SquareArrowOutUpRight size={16} />
            </Link>
            <Link href="#" className="mr-4 underline inline-flex items-center gap-1">Terms & Conditions <SquareArrowOutUpRight size={16} /></Link>
          </footer>
        </div>

        {/* Right Column */}
        <div className="relative hidden lg:block">           
          <Image
            src="/overstock-materials-auction-pallets.png"
            alt="Background Image"
            layout="fill"
            objectFit="cover"
            className="brightness-50"
          />
          <div className="absolute inset-0 bg-black opacity-30"></div>
        </div>
      </div>
    </I18nProvider>
  )
}