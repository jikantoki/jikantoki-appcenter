# Dark Mode Flash Fix - Technical Documentation

## Problem Statement

When a user opens the application with their browser set to dark mode, the initial page load displays a white background flash before the dark theme is applied. This creates a poor user experience, especially in low-light environments.

## Root Cause

The dark mode theme was being applied in the `mounted()` lifecycle hook of `app.vue`, which executes **after** the initial render of the page. This timing issue caused the following sequence:

1. Page loads with default (light) theme
2. User sees white background
3. `mounted()` hook executes
4. Theme changes to dark
5. User sees the flash from light to dark

Additionally, the application was using an old localStorage format (`themeOptions`) that was incompatible with the current settings store structure.

## Solution

### 1. Created Early-Running Plugin (`app/plugins/vuetify-theme.client.ts`)

A new Nuxt plugin with `enforce: 'pre'` that runs before the app mounts. This plugin:
- Initializes the settings store to load persisted theme preferences
- Reads the theme setting from the store
- Applies the theme immediately using Vuetify's `useTheme()` composable
- Handles three theme modes: 'light', 'dark', and 'system' (auto-detect from OS)

```typescript
import { useSettingsStore } from '@/stores/settings'
import { useTheme } from 'vuetify'

export default defineNuxtPlugin({
  name: 'vuetify-theme',
  enforce: 'pre',
  setup() {
    const settings = useSettingsStore()
    const theme = useTheme()
    
    const applyTheme = () => {
      const themeSetting = settings.display.theme
      
      if (themeSetting === 'light') {
        theme.global.name.value = 'light'
      } else if (themeSetting === 'dark') {
        theme.global.name.value = 'dark'
      } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        theme.global.name.value = prefersDark ? 'dark' : 'light'
      }
    }
    
    applyTheme()
  },
})
```

### 2. Updated `app.vue`

- Removed the old `themeOptions` localStorage reading
- Migrated to use the settings store (`settings.display.theme`)
- Updated Vuetify API calls to use Vuetify 3's correct syntax: `theme.global.name.value`
- Added a watcher to sync theme changes with the Capacitor StatusBar (for mobile apps)

### 3. Updated `app/pages/settings/display.vue`

- Updated the theme change handler to use the correct Vuetify 3 API
- Simplified the system theme detection logic
- Maintained compatibility with Capacitor's StatusBar API for mobile

## Benefits

1. **Eliminates White Flash**: Theme is applied before the first render
2. **Better User Experience**: Smooth, flicker-free dark mode on initial load
3. **Maintains State**: Uses the persisted settings store for theme preferences
4. **OS Integration**: Properly detects and respects system dark mode preferences
5. **Mobile Support**: Syncs with Capacitor StatusBar for native mobile apps

## Testing Recommendations

To verify the fix works correctly:

1. Set your browser/OS to dark mode
2. Clear local storage
3. Open the application for the first time
4. Verify no white flash occurs on initial load
5. Navigate to Settings > Display
6. Change between light, dark, and system themes
7. Verify changes are immediate and persist after page refresh
8. On mobile devices, verify the status bar color matches the theme

## Technical Notes

- The plugin is named with `.client.ts` suffix, ensuring it runs only on the client side
- The `enforce: 'pre'` directive ensures it runs before other plugins
- The solution is compatible with Nuxt 3's SSR (Server-Side Rendering)
- Vuetify 3's theme system uses reactive values, so changes propagate automatically
