import { useSettingsStore } from '@/stores/settings'
import { useTheme } from 'vuetify'

export default defineNuxtPlugin({
  name: 'vuetify-theme',
  enforce: 'pre',
  setup() {
    // Initialize the settings store to load persisted settings
    const settings = useSettingsStore()
    const theme = useTheme()
    
    // Apply theme based on current settings
    const applyTheme = () => {
      const themeSetting = settings.display.theme
      
      if (themeSetting === 'light') {
        theme.global.name.value = 'light'
      } else if (themeSetting === 'dark') {
        theme.global.name.value = 'dark'
      } else {
        // system theme
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        theme.global.name.value = prefersDark ? 'dark' : 'light'
      }
    }
    
    // Apply theme immediately
    applyTheme()
    
    // Listen for system theme changes when in 'system' mode
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleSystemThemeChange = () => {
      if (settings.display.theme === 'system') {
        theme.global.name.value = mediaQuery.matches ? 'dark' : 'light'
      }
    }
    mediaQuery.addEventListener('change', handleSystemThemeChange)
  },
})
