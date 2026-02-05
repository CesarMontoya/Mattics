"use client"

import * as React from "react"

type MenuStateContextType = {
  openItems: Record<string, boolean>
  toggleItem: (title: string) => void
  setOpen: (title: string, open: boolean) => void
}

const MenuStateContext = React.createContext<MenuStateContextType | undefined>(undefined)

const STORAGE_KEY = "sidebar_menu_state"

function getInitialState(): Record<string, boolean> {
  if (typeof window === "undefined") return {}
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : {}
  } catch (e) {
    console.error("Failed to parse menu state", e)
    return {}
  }
}

export function MenuStateProvider({ children }: { children: React.ReactNode }) {
  const [openItems, setOpenItems] = React.useState<Record<string, boolean>>(getInitialState)

  const toggleItem = React.useCallback((title: string) => {
    setOpenItems((prev) => {
      const newState = { ...prev, [title]: !prev[title] }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newState))
      return newState
    })
  }, [])

  const setOpen = React.useCallback((title: string, open: boolean) => {
    setOpenItems((prev) => {
      const newState = { ...prev, [title]: open }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newState))
      return newState
    })
  }, [])

  return (
    <MenuStateContext.Provider value={{ openItems, toggleItem, setOpen }}>
      {children}
    </MenuStateContext.Provider>
  )
}

export function useMenuState() {
  const context = React.useContext(MenuStateContext)
  if (context === undefined) {
    throw new Error("useMenuState must be used within a MenuStateProvider")
  }
  return context
}
