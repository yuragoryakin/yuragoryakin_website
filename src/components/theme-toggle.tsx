"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="h-6 w-6" />
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-6 w-6 p-0 hover:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      <motion.div
        className="flex items-center justify-center"
        initial={false}
        animate={{ rotate: resolvedTheme === 'dark' ? 180 : 0 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        <svg
          className="h-6 w-6"
          fill="currentColor"
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M16 4C9.37 4 4 9.37 4 16s5.37 12 12 12a12.035 12.035 0 0 0 12-12c0-6.63-5.37-12-12-12Zm0 22V6a10 10 0 0 1 0 20Z" />
        </svg>
      </motion.div>
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
