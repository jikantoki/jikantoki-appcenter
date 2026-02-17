# エノキ電気ホームページ（2026版）

ENOKI Appcenter（アプリストア）内蔵型ホームページ

## 目的･目標

ときえのき個人のアプリ・ツール・楽曲を一箇所で公開するためのポートフォリオ兼簡易アプリストア（Nuxt 3 + TypeScript予定）

将来的には自分以外の人も投稿できるようにしたいポートフォリオ＋音楽配信プラットフォームを目指しています。

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
- - Java（Spring）
- - シェルスクリプト
- - PHP
- プラットフォーム（どれか一つ）
- - Windows
- - Web
- - Mobile (Android/iOS)
- - Linux
- アプリかゲームか
- 音楽かプログラムか
- - ロックとかテクノポップとか詳細カテゴリ付ける？かも

## 動的ルーティング

### /apps/[appId]

- 動的にアプリを表示する
- 下記TS設定の項目に合わせる形で定義する（実際のデータはDBに保存）

Webアプリもアプリかのようにしれっと表示する

### /music/[musicId]

- アプリ詳細画面とまあ同じような動きをすればいい
- audio要素はapp.vueに記述して、ページを推移しても音が消えないようにする
- - ページ下部に再生バーを付ける

### /privacy

プライバシーポリシー

### /info

- 運営情報
- 企業情報（DUNS）
- 特定商取引法

### /profile

/user/jikantoki へのリダイレクト

### /user/[userId]

- 開発者プロフィールページ
- プロフィール情報JSON（TS）の書き方、DB連携方法は他リポジトリと共通テンプレートを使用
- その人が作ったアプリが表示されるようにする

### /login

ログインページ（解放するが、アプリ登録権限は自分だけにする）

### /register

アカウント登録ページ（解放するが、アプリ登録権限は自分だけにする）

#### 書くこと

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

## TSファイル、JSONファイル仕様

紹介文・歌詞はマークダウン対応予定（Nuxt Content または markdown-it + shiki などでHTML化）

### アプリ情報

- アプリ名　string
- アプリID（URLに使う）　string
- リリース日unixtime number
- アプリアイコンURL又はBase64 string
- サムネイルURL又はBase64 string
- 紹介文（できればマークダウン対応したい） string
- 対応プラットフォーム string[]（複数選択）
- 使用言語 string[]（複数選択）
- アプリリンクス []
- - 配列の中身↓↓↓
- - - ボタンに表示するテキスト string
- - - ボタン表示用MDIアイコン string
- - - 推移先URL string
- Github URL string
- 紹介動画Youtube URL string
- 紹介画像URL又はBase64 string[]
- アプリかゲームか（選択） string
- 製作者情報はアップロードしたユーザーの情報をDBから拾う

### 楽曲情報

- 楽曲名 string
- 楽曲ID（URLに使う） string
- 楽曲アイコンURL又はBase64 string
- オーディオファイル（mp3）URL string
- リリース日unixtime number
- シングル？アルバム？（選択） string
- （アルバムの場合）楽曲リスト []
- - 配列の中身↓↓↓
- - - 楽曲名 string
- - - 楽曲シングルのURL string
- 作詞者（デフォルトでアカウント名が出てくる） string
- 作曲者（デフォルトでアカウント名が出てくる） string
- 紹介文（できればマークダウン対応したい） string
- 歌詞（できればマークダウン対応したい） string
- MV Youtube URL string
- その他URL []
- - 配列の中身↓↓↓
- - - ボタンに表示するテキスト string
- - - ボタン表示用MDIアイコン string
- - - 推移先URL string
- 製作者情報はアップロードしたユーザーの情報をDBから拾う

### プロフィール情報

- 他リポジトリでも使っている共通テンプレートを使用
- 差分変更
- - アプリ登録権限 boolean
- - - デフォルトはfalseで、DBから自分だけ手動でtrueにする
- - プロフィール情報 string
- - - マークダウン対応
- - 学歴 []
- - - 配列の中身↓↓↓
- - - - 日時 unixtime number
- - - - 内容 string
- - 経歴（学歴以外） []
- - - 配列の中身↓↓↓
- - - - 日時 unixtime number
- - - - 内容 string
- - 各種SNS等リンク []
- - - 配列の中身↓↓↓
- - - - ボタンに表示するテキスト string
- - - - ボタン表示用MDIアイコン string
- - - - 推移先URL string

## Nuxt Content Starter

Look at the [Nuxt Content documentation](https://content.nuxt.com) to learn more.

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
