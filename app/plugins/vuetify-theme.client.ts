import { useSettingsStore } from '@/stores/settings'
import { useTheme } from 'vuetify'

// .client.tsファイルなので、このコードはクライアントサイドでのみ実行されます
export default defineNuxtPlugin({
  name: 'vuetify-theme',
  enforce: 'pre',
  hooks: {
    'app:beforeMount'() {
      // app:beforeMountはクライアントサイドでアプリがマウントされる直前に実行されます
      // この時点ではwindowオブジェクトが利用可能です
      const settings = useSettingsStore()
      const theme = useTheme()
      
      // 設定に基づいてテーマを適用
      const themeSetting = settings.display.theme
      
      if (themeSetting === 'light') {
        theme.global.name.value = 'light'
      } else if (themeSetting === 'dark') {
        theme.global.name.value = 'dark'
      } else {
        // 'system'モード - OSのテーマ設定を検出
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        theme.global.name.value = prefersDark ? 'dark' : 'light'
      }
      
      // システムテーマ変更のリスナーを追加
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      const handleSystemThemeChange = () => {
        if (settings.display.theme === 'system') {
          theme.global.name.value = mediaQuery.matches ? 'dark' : 'light'
        }
      }
      mediaQuery.addEventListener('change', handleSystemThemeChange)
    },
  },
})
