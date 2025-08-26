"use client"

import { useState } from "react"
import Link from "next/link"
import { useSession, signIn, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/ui/logo"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu"
import { Skeleton } from "@/components/ui/skeleton"
import { User, Menu, LogOut, Plus } from "lucide-react"

export function Header() {
  const { data: session, status } = useSession()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const closeMobileMenu = () => setMobileMenuOpen(false)

  return (
    <header className="bg-white border-b border-black sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Logo variant="black" size="md" />
          </div>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList className="space-x-1">
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/venues" className="text-sm font-medium text-gray-600 hover:text-black transition-colors px-3 py-2 rounded-md">
                    Venues
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/requests" className="text-sm font-medium text-gray-600 hover:text-black transition-colors px-3 py-2 rounded-md">
                    Public Requests
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/quick-request" className="text-sm font-medium text-gray-600 hover:text-black transition-colors px-3 py-2 rounded-md">
                    Quick Request
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/blog" className="text-sm font-medium text-gray-600 hover:text-black transition-colors px-3 py-2 rounded-md">
                    Blog
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/contact" className="text-sm font-medium text-gray-600 hover:text-black transition-colors px-3 py-2 rounded-md">
                    Contact
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/add-venue" className="text-sm font-medium text-white hover:text-blue-50 transition-colors px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700">
                    Add Venue
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Desktop Auth & CTA */}
          <div className="hidden md:flex items-center space-x-2">
            {status === "loading" ? (
              <Skeleton className="w-8 h-8 rounded-full" />
            ) : session ? (
              <div className="flex items-center space-x-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="rounded-full p-2">
                      <User className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48 rounded-xl border-gray-100">
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard" className="flex items-center rounded-lg">
                        <User className="mr-2 h-4 w-4" />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => signOut()} className="text-red-600 rounded-lg">
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/login">
                  <Button variant="ghost" size="sm" className="rounded-full">Sign In</Button>
                </Link>
                <Link href="/register">
                  <Button size="sm" className="bg-black text-white hover:bg-gray-800 rounded-full">Register</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu */}
          <div className="flex items-center space-x-2 md:hidden">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="rounded-full p-2">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 rounded-l-2xl">
                <nav className="flex flex-col space-y-1 mt-8">
                  <Link 
                    href="/venues" 
                    className="text-base font-medium text-gray-700 hover:text-black hover:bg-gray-50 transition-colors px-4 py-3 rounded-xl"
                    onClick={closeMobileMenu}
                  >
                    Venues
                  </Link>
                  <Link 
                    href="/requests" 
                    className="text-base font-medium text-gray-700 hover:text-black hover:bg-gray-50 transition-colors px-4 py-3 rounded-xl"
                    onClick={closeMobileMenu}
                  >
                    Public Requests
                  </Link>
                  <Link 
                    href="/quick-request" 
                    className="text-base font-medium text-gray-700 hover:text-black hover:bg-gray-50 transition-colors px-4 py-3 rounded-xl"
                    onClick={closeMobileMenu}
                  >
                    Quick Request
                  </Link>
                  <Link 
                    href="/blog" 
                    className="text-base font-medium text-gray-700 hover:text-black hover:bg-gray-50 transition-colors px-4 py-3 rounded-xl"
                    onClick={closeMobileMenu}
                  >
                    Blog
                  </Link>
                  <Link 
                    href="/pricing" 
                    className="text-base font-medium text-gray-700 hover:text-black hover:bg-gray-50 transition-colors px-4 py-3 rounded-xl"
                    onClick={closeMobileMenu}
                  >
                    Pricing
                  </Link>
                  <Link 
                    href="/contact" 
                    className="text-base font-medium text-gray-700 hover:text-black hover:bg-gray-50 transition-colors px-4 py-3 rounded-xl"
                    onClick={closeMobileMenu}
                  >
                    Contact
                  </Link>
                  <Link 
                    href="/add-venue" 
                    className="text-base font-medium text-white hover:text-blue-50 bg-blue-600 hover:bg-blue-700 transition-colors px-4 py-3 rounded-xl"
                    onClick={closeMobileMenu}
                  >
                    Add Venue
                  </Link>
                  
                  {/* Mobile Auth */}
                  <div className="pt-6 mt-6 border-t border-gray-100 space-y-3">
                    {status === "loading" ? (
                      <Skeleton className="w-full h-12 rounded-xl" />
                    ) : session ? (
                      <>
                        <Link href="/dashboard" onClick={closeMobileMenu}>
                          <Button variant="ghost" size="lg" className="w-full justify-start rounded-xl hover:bg-gray-50">
                            <User className="h-5 w-5 mr-3" />
                            {session.user?.name || session.user?.email}
                          </Button>
                        </Link>
                        <Button 
                          variant="ghost" 
                          size="lg" 
                          className="w-full justify-start text-red-600 hover:bg-red-50 rounded-xl" 
                          onClick={() => {
                            signOut()
                            closeMobileMenu()
                          }}
                        >
                          <LogOut className="h-5 w-5 mr-3" />
                          Sign Out
                        </Button>
                      </>
                    ) : (
                      <>
                        <Link href="/login" onClick={closeMobileMenu}>
                          <Button variant="outline" size="lg" className="w-full rounded-xl border-gray-200">
                            Sign In
                          </Button>
                        </Link>
                        <Link href="/register" onClick={closeMobileMenu}>
                          <Button size="lg" className="w-full bg-black text-white hover:bg-gray-800 rounded-xl">
                            Register
                          </Button>
                        </Link>
                      </>
                    )}
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}