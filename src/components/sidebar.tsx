"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Package, FileText, HelpCircle, PlusCircle, Menu, X, ChevronRight } from "lucide-react"

export default function Sidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  const navItems = [
    { icon: Home, label: "Dashboard", href: "/" },
    { icon: Package, label: "Assets", href: "/assets" },
    { icon: FileText, label: "Redeem", href: "/redeem" },
    { icon: PlusCircle, label: "Create", href: "/create" },
    { icon: HelpCircle, label: "Help", href: "/help" },
  ]

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById("sidebar")
      const toggleButton = document.getElementById("sidebar-toggle")

      if (
        isMobile &&
        isOpen &&
        sidebar &&
        !sidebar.contains(event.target as Node) &&
        toggleButton &&
        !toggleButton.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isMobile, isOpen])

  // Close sidebar when route changes on mobile
  useEffect(() => {
    if (isMobile) {
      setIsOpen(false)
    }
  }, [pathname, isMobile])

  return (
    <>
      {/* Mobile menu button */}
      <button
        id="sidebar-toggle"
        className="fixed z-50 top-4 left-4 md:hidden text-white bg-sidebar rounded-full p-2"
        onClick={toggleSidebar}
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Overlay for mobile */}
      {isMobile && isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-30" onClick={() => setIsOpen(false)} />
      )}

      {/* Sidebar */}
      <div
        id="sidebar"
        className={`fixed md:static z-40 h-full w-16 bg-sidebar flex flex-col items-center py-6 transition-all duration-300 ${
          isOpen || !isMobile ? "left-0" : "-left-16"
        }`}
      >
        <div className="mb-8">
          <Link href="/" className="block">
            <div className="w-10 h-10 rounded-full bg-teal flex items-center justify-center">
              <img src="/placeholder.svg?height=40&width=40" alt="Logo" className="w-6 h-6" />
            </div>
          </Link>
        </div>

        <nav className="flex-1 flex flex-col items-center gap-6">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`p-2 rounded-md transition-colors relative group ${
                  isActive ? "bg-secondary text-teal" : "text-gray-400 hover:text-white"
                }`}
              >
                <item.icon size={20} />
                <span className="sr-only">{item.label}</span>

                {/* Mobile tooltip */}
                {isMobile && isOpen && (
                  <div className="absolute left-14 top-1/2 -translate-y-1/2 bg-secondary text-white px-3 py-1 rounded-md text-sm whitespace-nowrap">
                    {item.label}
                    <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 transform rotate-45 w-2 h-2 bg-secondary"></div>
                  </div>
                )}

                {/* Desktop tooltip */}
                {!isMobile && (
                  <div className="absolute left-14 top-1/2 -translate-y-1/2 bg-secondary text-white px-3 py-1 rounded-md text-sm whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity">
                    {item.label}
                    <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 transform rotate-45 w-2 h-2 bg-secondary"></div>
                  </div>
                )}
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Mobile slide-in menu (creative solution) */}
      {isMobile && isOpen && (
        <div className="fixed top-0 left-16 z-40 h-full w-48 bg-sidebar border-r border-border py-6 px-4 transition-all duration-300">
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-bold text-white mb-4">Menu</h3>
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 p-2 rounded-md transition-colors ${
                    isActive ? "bg-secondary text-teal" : "text-gray-400 hover:text-white hover:bg-secondary/30"
                  }`}
                >
                  <item.icon size={18} />
                  <span>{item.label}</span>
                  {isActive && <ChevronRight size={16} className="ml-auto" />}
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </>
  )
}

