# エノキ電気ホームページ（2026版）

ENOKI Appcenter（アプリストア）内蔵型ホームページ

## アクセス

- エノキ電気公式ホームページ: <https://enoki.xyz>

## 使用環境

もともとWordPress → Nuxtにする

【重要】アプリ審査中はホームページ見られるため、今上げているものの審査が完了次第デプロイ

ソフトウェア、音楽はアプリストアのような感じで表示させる

- 参考: <https://zakoducthunt.jp/>

## カテゴリ機能

以下の項目でカテゴリ分けられるようにして表示

- 使用言語（複数選択可）
- - C
- - HSP
- - Vue (TypeScript)
- - Java
- - PHP
- プラットフォーム（どれか一つ）
- - Windows
- - Web
- - Mobile (Android/iOS)
- アプリかゲームか
- 音楽かプログラムか

## 動的ルーティング

### /[categoryId]/[appId]

動的にアプリを表示するように、先に中身はJSON（厳密にはTSオブジェクト）で定義できるように

Webアプリもアプリかのようにしれっと表示する

### /privacy

プライバシーポリシー

### /info

情報運営、企業情報（DUNS）、特定商取引法

### /profile

プロフィールと経験（エノキ電気とときえのきの関係性にも触れる）

### トップページ（index.vue）

トップページはアプリストア自体少しスクロールするとスキルシートが出てくるプログラムスキルに偏りすぎず、音楽やってる感も出す（SpotifyやSoundCloudぽさのある場所をトップページにも付けて、アプリ一覧項目に音楽（1曲ずつとアルバム）も入れる）

## 組織図

エノキ電気グループ

### エノテック（技術部門）

- エノキ電気ニュース

### エノサウンド（音楽部門）

- ときえのき（個人）エノキ電気ホームページのどこか1ページに、ときえのき（個人）のホームページ（ペライチでいい）を作る
- 制作楽曲に関しては、エノキ電気所属のときえのきが作りました

## Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
