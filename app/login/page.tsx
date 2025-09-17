"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import Image from "next/image"
import { LanguageSwitcher } from "@/components/language-switcher"
import { I18nProvider } from "@/components/i18n"
import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <I18nProvider>
      <div className="w-full lg:grid lg:h-screen lg:grid-cols-[3fr_2fr]">
        {/* Language Switcher in top-right corner */}
        <div className="absolute right-4 top-4 z-10">
          <LanguageSwitcher />
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="absolute left-4 top-4">
            <Image
              src="/images/triangle-logo.png"
              alt="Triangle Logo"
              height="56"
              width="0"
              style={{ width: 'auto', maxHeight: '56px' }}
            />
          </div>
          <div className="mx-auto grid w-[350px] gap-6">
            <div className="grid gap-2 text-left">
              <h1 className="text-3xl font-bold">Welcome</h1>
              <p className="text-balance text-muted-foreground">
                Log in to your <b>Triangle Liquidators</b> account.
              </p>
            </div>
            <div>
              <form>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="m@example.com" required className="rounded-[6px] border-zinc-300" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
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
                  <Button type="submit" className="w-full rounded-[6px]">
                    Login
                  </Button>
                  <Button variant="outline" className="w-full rounded-[6px] border-none bg-white text-zinc-900 shadow-none hover:bg-white hover:underline" asChild>
                    <Link href="/">Cancel</Link>
                  </Button>
                </div>
              </form>
              <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/register" className="underline">
                  Register
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden bg-muted lg:block relative">
          <Image
            src="/overstock-materials-auction-pallets.png"
            alt="Image"
            width="1920"
            height="1080"
            className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black to-transparent opacity-50"></div>
        </div>
      </div>
    </I18nProvider>
  )
}