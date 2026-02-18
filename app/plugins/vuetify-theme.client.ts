// import { useSettingsStore } from '@/stores/settings'
// import { useTheme } from 'vuetify'

// setupにwindowやdocumentを直接触るコードを書くと、SSRの段階でエラーになるため、ここには記述しない
export default defineNuxtPlugin({
  // name: 'vuetify-theme',
  // enforce: 'pre',
  // setup() {
  //   // Initialize the settings store to load persisted settings
  //   const settings = useSettingsStore()
  //   const theme = useTheme()
  //   // Apply theme based on current settings
  //   const applyTheme = () => {
  //     const themeSetting = settings.display.theme
  //     if (themeSetting === 'light') {
  //       theme.change('light')
  //     } else if (themeSetting === 'dark') {
  //       theme.change('dark')
  //     } else {
  //       // system theme
  //       // const prefersDark = window.matchMedia(
  //       //   '(prefers-color-scheme: dark)',
  //       // ).matches
  //       // theme.change(prefersDark ? 'dark' : 'light')
  //     }
  //   }
  //   // Apply theme immediately
  //   applyTheme()
  //   // Listen for system theme changes when in 'system' mode
  //   // const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  //   // const handleSystemThemeChange = () => {
  //   //   if (settings.display.theme === 'system') {
  //   //     theme.change(mediaQuery.matches ? 'dark' : 'light')
  //   //   }
  //   // }
  //   // mediaQuery.addEventListener('change', handleSystemThemeChange)
  // },
})
