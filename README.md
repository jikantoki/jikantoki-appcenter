# エノキ電気ホームページ（2026 版）

ENOKI Appcenter（アプリストア）内蔵型ホームページ

![アイコン](./public/img/icon.png)

## 目的･目標

ときえのき個人のアプリ・ツール・楽曲を一箇所で公開するためのポートフォリオ兼簡易アプリストア（Nuxt 3 + TypeScript 予定）

将来的には自分以外の人も投稿できるようにしたいポートフォリオ＋音楽配信プラットフォームを目指しています。

## アクセス

- エノキ電気公式ホームページ: <https://enoki.xyz>

## 使用環境

もともと WordPress → Nuxt にする

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
- 下記 TS 設定の項目に合わせる形で定義する（実際のデータは DB に保存）

Web アプリもアプリかのようにしれっと表示する

### /music/[musicId]

- アプリ詳細画面とまあ同じような動きをすればいい
- audio 要素は app.vue に記述して、ページを推移しても音が消えないようにする
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
- プロフィール情報 JSON（TS）の書き方、DB 連携方法は他リポジトリと共通テンプレートを使用
- その人が作ったアプリが表示されるようにする

### /login

ログインページ（解放するが、アプリ登録権限は自分だけにする）

### /register

アカウント登録ページ（解放するが、アプリ登録権限は自分だけにする）

#### 書くこと

プロフィールと経験（エノキ電気とときえのきの関係性にも触れる）

### トップページ（index.vue）

トップページはアプリストア自体少しスクロールするとスキルシートが出てくるプログラムスキルに偏りすぎず、音楽やってる感も出す（Spotify や SoundCloud ぽさのある場所をトップページにも付けて、アプリ一覧項目に音楽（1 曲ずつとアルバム）も入れる）

## 組織図

エノキ電気グループ

### エノテック（技術部門）

- エノキ電気ニュース

### エノサウンド（音楽部門）

- ときえのき（個人）エノキ電気ホームページのどこか 1 ページに、ときえのき（個人）のホームページ（ペライチでいい）を作る
- 制作楽曲に関しては、エノキ電気所属のときえのきが作りました

## TS ファイル、JSON ファイル仕様

紹介文・歌詞はマークダウン対応予定（Nuxt Content または markdown-it + shiki などで HTML 化）

### アプリ情報

- アプリ名　 string
- アプリ ID（URL に使う）　 string
- リリース日 unixtime number
- アプリアイコン URL 又は Base64 string
- サムネイル URL 又は Base64 string
- 紹介文（できればマークダウン対応したい） string
- 対応プラットフォーム string[]（複数選択）
- 使用言語 string[]（複数選択）
- アプリリンクス []
- - 配列の中身 ↓↓↓
- - - ボタンに表示するテキスト string
- - - ボタン表示用 MDI アイコン string
- - - 推移先 URL string
- Github URL string
- 紹介動画 Youtube URL string
- 紹介画像 URL 又は Base64 string[]
- アプリかゲームか（選択） string
- 製作者情報はアップロードしたユーザーの情報を DB から拾う

### 楽曲情報

- 楽曲名 string
- 楽曲 ID（URL に使う） string
- 楽曲アイコン URL 又は Base64 string
- オーディオファイル（mp3）URL string
- リリース日 unixtime number
- シングル？アルバム？（選択） string
- （アルバムの場合）楽曲リスト []
- - 配列の中身 ↓↓↓
- - - 楽曲名 string
- - - 楽曲シングルの URL string
- 作詞者（デフォルトでアカウント名が出てくる） string
- 作曲者（デフォルトでアカウント名が出てくる） string
- 紹介文（できればマークダウン対応したい） string
- 歌詞（できればマークダウン対応したい） string
- MV Youtube URL string
- その他 URL []
- - 配列の中身 ↓↓↓
- - - ボタンに表示するテキスト string
- - - ボタン表示用 MDI アイコン string
- - - 推移先 URL string
- 製作者情報はアップロードしたユーザーの情報を DB から拾う

### プロフィール情報

- 他リポジトリでも使っている共通テンプレートを使用
- 差分変更
- - アプリ登録権限 boolean
- - - デフォルトは false で、DB から自分だけ手動で true にする
- - プロフィール情報 string
- - - マークダウン対応
- - 学歴 []
- - - 配列の中身 ↓↓↓
- - - - 日時 unixtime number
- - - - 内容 string
- - 経歴（学歴以外） []
- - - 配列の中身 ↓↓↓
- - - - 日時 unixtime number
- - - - 内容 string
- - 各種 SNS 等リンク []
- - - 配列の中身 ↓↓↓
- - - - ボタンに表示するテキスト string
- - - - ボタン表示用 MDI アイコン string
- - - - 推移先 URL string

## Nuxt4 Template

Nuxt を簡単にインストールしてすぐ使うためのテンプレート

- NOLICENSED ご自由にお使いください

## 前提

Node.js と npm と yarn くらい入ってるよね！（投げやり）
デプロイ先は Vercel を想定してるけど多分どこでも動きます
あと PHP の composer も用意してね

## INCLUDED

- Nuxt
- Vuetify
- VSCode、Git、Eslint、Prettier 周りの設定ファイル
- Pug と SASS
- PWA Preset
- Google Fonts

## 独自実装

- Ajax API
- イイカンジにカスタマイズされた SCSS ファイル
- コピペで使える pug テンプレート
- 汎用性の高い関数群
- ダークテーマ切り替えボタン
- Push API（使いやすいように改良）
- Notification API（使いやすいように改良）
- アカウント登録時のメールアドレス認証、アクセストークンの発行
- MySQL 用 API

## 制作予定

- リッチエディタ

## 注意

ポート 12345 で動くようにしてあります

VSCode での利用を推奨

~~Vue3 慣れてなくて Options API 使ってるけど許して~~

## 参考資料

WebPush <https://tech.excite.co.jp/entry/2021/06/30/104213>

## Setup

このプログラムは、表示用サーバーと処理用サーバーの 2 つが必要です

### 表示用サーバー

```shell
git clone git@github.com:jikantoki/jikantoki-appcenter.git
echo 'これだけでセットアップ完了！'
echo 'Vercelとかでデプロイしたらそのまま動く'
```

### WebPush 用の鍵を作成

ここで作れます <https://web-push-codelab.glitch.me/>

#### ストレージを操作できる環境の場合

ルートに.env ファイルを作成し、以下のように記述（クォーテーション不要）

```env
NUXT_WEBPUSH_PUBLICKEY=パブリックキーをコピー
NUXT_WEBPUSH_PRIVATEKEY=プライベートキーをコピー

NUXT_API_ID=default
NUXT_API_TOKEN=後のPHPで作成するアクセストークン
NUXT_API_ACCESSKEY=後のPHPで作成するアクセスキー

NUXT_API_HOST=APIサーバーのホスト
```

#### それ以外（Vercel デプロイ等）

Project Settings → Enviroment Variables を開く  
上記.env ファイルと同じ感じで設定

### PHP サーバー（内部処理用）

サーバーサイドは PHP で開発しているため、一部処理を実行するには PHP サーバーの用意が必要です  
とりあえずレンタルサーバーでも借りれば実行できます

1. API 用のドメインをクライアント側（Vercel 等）とは別で用意する
2. このリポジトリの php フォルダをドメインのルートにする（.htaccess 等で）
3. （準備中！！！）に API 用のドメインを記述
4. リポジトリルート直下に/env.php を用意し、以下の記述をする

```php
<?php
define('DIRECTORY_NAME', '/プロジェクトルートのディレクトリ名');

define('NUXT_WebPush_PublicKey', 'パブリックキー');
define('NUXT_WebPush_PrivateKey', 'プライベートキー');
define('WebPush_URL', 'プッシュ通知を使うドメイン');
define('WebPush_URL_dev', 'プッシュ通知を使うドメイン（開発用）');//この行は無くても良い
define('WebPush_icon', 'プッシュ通知がスマホに届いたときに表示するアイコンURL');
define('Default_user_icon', 'アイコン未設定アカウント用の初期アイコンURL');

define('MySQL_Host', 'MySQLサーバー');
define('MySQL_DBName', 'DB名');
define('MySQL_User', 'DB操作ユーザー名');
define('MySQL_Password', 'DBパスワード');

define('SMTP_Name', '自動メール送信時の差出名');
define('SMTP_Username', 'SMTPユーザー名');
define('SMTP_Mailaddress', '送信に使うメールアドレス');
define('SMTP_Password', 'SMTPパスワード');
define('SMTP_Server', 'SMTPサーバー');
define('SMTP_Port', 587); //基本は587を使えば大丈夫

$mailHeader = "<p>
いつも Wallet Wallet をご利用いただきありがとうございます。
<hr>
</p>";
$mailFooter = "<p>
<hr>
このメールに返信することはできません。
<br>
また、このメールに身に覚えのない場合は、エノキ電気までお問い合わせください。
<br>
<a href=\"https://enoki.xyz\">Wallet Wallet</a> by <a href=\"https://enoki.xyz\">エノキ電気</a>
</p>";

```

#### PHP サーバー用の.htaccess の用意

大体こんな感じで設定する

```htaccess
#トップページを/wallet/php にする
<IfModule mod_rewrite.c>
RewriteEngine on
RewriteBase /
RewriteRule ^$ wallet/php/ [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.+)$ wallet/php/$1 [L]
</IfModule>
# 外部からのAPIへのアクセスを許可
Header append Access-Control-Allow-Origin: "*"

```

### MySQL の用意

#### /database.sql ファイルをインポートする

PHPMyAdmin が使える環境なら DB 直下にインポートして終わり、コマンドラインでやる方法は知らん

#### ※インポートでエラーが出たら

/database_VIEW.sql の中身をコピーして phpmyadmin で直接実行

### デフォルト API のトークンを用意する

このプログラムは独自のアクセストークンを利用して API にアクセスします。  
そのため、初回 API を登録する作業が必要です。

1. セットアップした API 用サーバーの/makeApiForAdmin.php にアクセス
2. 初回アクセス時のみ MySQL で登録作業が行われるので、出てきた画面の内容をコピー
3. .env にｲｲｶﾝｼﾞに内容を記述（書き方はさっき説明した）
4. 以後、その値を使って API を操作できます

**忘れたらリセット**するしかないので注意！（一部データは暗号化されており、管理者でも確認できません）

#### デフォルト API トークンのリセット方法

1. MySQL の api_list テーブルの secretId='default'を削除
2. api_listForView の secretId='default'も同様に削除
3. 初回登録と同じ感じでやる
4. データベースに再度 default が追加されていることを確認

## コンソール側で初期化

```shell
yarn install
composer install #PHP用
```

### 実行

```shell
yarn run dev
```

### 設定方法

| 項目           | 設定箇所                     |
| -------------- | ---------------------------- |
| アプリ名       | /package.json                |
| フォント       | /layout/default.vue          |
| ナビゲーション | /items/itemNavigationList.js |
| 404 ページ     | /error.vue                   |

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
