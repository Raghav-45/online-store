'use client'

import React, { FC } from 'react'
import Link from 'next/link'
import { Home, LineChart, Package, ShoppingCart, Users2 } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { usePathname } from 'next/navigation'

interface DashboardNavProps {}

const navLinks = [
  { href: '/dashboard', label: 'Dashboard', icon: Home },
  { href: '/dashboard/orders', label: 'Orders', icon: ShoppingCart },
  { href: '/dashboard/products', label: 'Products', icon: Package },
  { href: '#', label: 'Customers', icon: Users2 },
  { href: '#', label: 'Analytics', icon: LineChart },
]

const DashboardNav: FC<DashboardNavProps> = ({}) => {
  const pathname = usePathname()
  return (
    <React.Fragment>
      {navLinks.map((link) => {
        const Icon = link.icon
        const isActive = pathname === link.href

        return (
          <Tooltip key={link.href}>
            <TooltipTrigger asChild>
              <Link
                href={link.href}
                className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8 ${
                  isActive
                    ? 'bg-accent text-accent-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="sr-only">{link.label}</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">{link.label}</TooltipContent>
          </Tooltip>
        )
      })}
    </React.Fragment>
  )
}

export default DashboardNav
