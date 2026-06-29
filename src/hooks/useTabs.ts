import { useState, useCallback } from 'react'

export function useTabs<T extends string>(initialTab: T) {
  const [activeTab, setActiveTab] = useState<T>(initialTab)

  const switchTab = useCallback((tab: T) => {
    setActiveTab(tab)
  }, [])

  return { activeTab, switchTab }
}
