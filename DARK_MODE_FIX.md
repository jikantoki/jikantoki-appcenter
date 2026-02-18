# Dark Mode Flash Fix - Technical Documentation

## 問題の説明

OSのダークモードが有効な状態でアプリを開くと、初回ページレンダリング時に白背景が表示され、その後ダークテーマに切り替わる問題（FOUC - Flash of Unstyled Content）が発生していました。

## 根本原因

テーマの適用が`app.vue`の`mounted()`ライフサイクルフック内で行われており、これは初回レンダリング**後**に実行されるため、以下のような流れになっていました：

1. ページがデフォルト（ライト）テーマでロード
2. ユーザーに白背景が表示される
3. `mounted()`フックが実行される
4. テーマがダークに変更される
5. ユーザーはライトからダークへの切り替えフラッシュを見る

## 解決策

### 1. Nuxtプラグインでの早期テーマ適用

`app/plugins/vuetify-theme.client.ts`を作成し、`app:beforeMount`フックを使用：

```typescript
export default defineNuxtPlugin({
  name: 'vuetify-theme',
  enforce: 'pre',
  hooks: {
    'app:beforeMount'() {
      const settings = useSettingsStore()
      const theme = useTheme()
      
      const themeSetting = settings.display.theme
      
      if (themeSetting === 'light') {
        theme.global.name.value = 'light'
      } else if (themeSetting === 'dark') {
        theme.global.name.value = 'dark'
      } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        theme.global.name.value = prefersDark ? 'dark' : 'light'
      }
      
      // システムテーマ変更のリスナー
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
```

### 2. SSR互換性の確保

- `.client.ts`サフィックス：クライアントサイドでのみ実行
- `app:beforeMount`フック：アプリマウント直前に実行、この時点で`window`オブジェクトが利用可能
- `enforce: 'pre'`：他のプラグインより先に実行

### 3. Vuetify 3 APIの使用

`app.vue`と`display.vue`で正しいVuetify 3 APIを使用：
- 旧: `theme.change('dark')` ❌
- 新: `theme.global.name.value = 'dark'` ✅

## 利点

1. **FOUCの解消**: 初回レンダリング前にテーマが適用される
2. **SSR互換**: サーバーサイドレンダリングでエラーが発生しない
3. **状態の永続化**: Pinia設定ストアからテーマ設定を読み込み
4. **OSとの統合**: システムダークモード設定を正しく検出
5. **ランタイム更新**: OSのテーマ変更にリアルタイムで対応
6. **モバイル対応**: Capacitor StatusBarと同期

## テストの推奨事項

修正が正しく機能することを確認するには：

1. ブラウザ/OSをダークモードに設定
2. ローカルストレージをクリア
3. アプリを初めて開く
4. 白背景フラッシュが発生しないことを確認
5. 設定 > 外観に移動
6. ライト、ダーク、システムテーマを切り替え
7. 変更が即座に反映され、ページ更新後も保持されることを確認
8. モバイルデバイスで、ステータスバーの色がテーマと一致することを確認

## 技術的な注意事項

- プラグインは`.client.ts`サフィックスによりクライアントサイドでのみ実行
- `enforce: 'pre'`により他のプラグインより先に実行
- Nuxt 3のSSR（サーバーサイドレンダリング）と互換性あり
- Vuetify 3のテーマシステムはリアクティブ値を使用するため、変更は自動的に伝播
- イベントリスナーはアプリのライフタイム中保持され、メモリリークの問題なし

