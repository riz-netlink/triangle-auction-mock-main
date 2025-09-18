'use client'

import Image from 'next/image'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"

export default function MainHeader() {
  return (
    <div className="sticky top-8 z-40 h-12 bg-white border-b border-gray-200 flex items-center px-6">
      <div className="flex items-center space-x-6">
        <Image
          src="/images/triangle-logo.png"
          alt="Triangle Liquidators"
          width={0}
          height={32}
          className="h-8 w-auto"
        />
        
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink
                href="/"
                className="group inline-flex h-8 w-max items-center justify-center rounded-[6px] bg-background px-4 py-2 text-sm font-medium text-slate-800 transition-colors hover:bg-emerald-100 hover:text-slate-800 focus:bg-emerald-100 focus:text-slate-800 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
              >
                Home
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                href="/faq"
                className="group inline-flex h-8 w-max items-center justify-center rounded-[6px] bg-background px-4 py-2 text-sm font-medium text-slate-800 transition-colors hover:bg-emerald-100 hover:text-slate-800 focus:bg-emerald-100 focus:text-slate-800 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
              >
                FAQ
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  )
}