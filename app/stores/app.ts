import { defineStore } from 'pinia'

/**
 * アプリリンク情報
 */
export interface AppLink {
  /** ボタンに表示するテキスト */
  text: string
  /** ボタン表示用MDIアイコン */
  icon: string
  /** 推移先URL */
  url: string
}

/**
 * アプリ情報
 */
export interface AppInfo {
  /** アプリ名 */
  name: string
  /** アプリID（URLに使う） */
  id: string
  /** リリース日 (unixtime) */
  releaseDate: number
  /** アプリアイコンURL又はBase64 */
  icon: string
  /** サムネイルURL又はBase64 */
  thumbnail: string
  /** 紹介文（マークダウン対応） */
  description: string
  /** 価格 */
  price: number
  /** 対応プラットフォーム（複数選択） */
  platforms: string[]
  /** 使用言語（複数選択） */
  languages: string[]
  /** アプリリンクス */
  links: AppLink[]
  /** Github URL */
  githubUrl?: string
  /** 紹介動画 Youtube URL */
  videoUrl?: string
  /** 紹介画像URL又はBase64 */
  images: string[]
  /** アプリかゲームか */
  type: string
}

/**
 * 楽曲リスト情報（アルバム用）
 */
export interface TrackInfo {
  /** 楽曲名 */
  name: string
  /** 楽曲シングルのURL */
  url: string
}

/**
 * その他URLリンク情報
 */
export interface OtherLink {
  /** ボタンに表示するテキスト */
  text: string
  /** ボタン表示用MDIアイコン */
  icon: string
  /** 推移先URL */
  url: string
}

/**
 * 楽曲情報
 */
export interface MusicInfo {
  /** 楽曲名 */
  name: string
  /** 楽曲ID（URLに使う） */
  id: string
  /** 楽曲アイコンURL又はBase64 */
  icon: string
  /** オーディオファイル（mp3）URL */
  audioUrl: string
  /** リリース日 (unixtime) */
  releaseDate: number
  /** シングル？アルバム？ */
  albumType: string
  /** （アルバムの場合）楽曲リスト */
  tracks?: TrackInfo[]
  /** 作詞者（デフォルトでアカウント名が出てくる） */
  lyricist: string
  /** 作曲者（デフォルトでアカウント名が出てくる） */
  composer: string
  /** 紹介文（マークダウン対応） */
  description: string
  /** 価格 */
  price: number
  /** 歌詞（マークダウン対応） */
  lyrics?: string
  /** MV Youtube URL */
  mvUrl?: string
  /** その他URL */
  otherLinks: OtherLink[]
}

/**
 * アプリと楽曲の共通項目を持つ統合型
 * アプリとしても楽曲としても使えるフレキシブルな型
 */
export type AppOrMusicItem = Partial<AppInfo> & Partial<MusicInfo> & {
  /** アプリ名 or 楽曲名 */
  name: string
  /** アプリID or 楽曲ID（URLに使う） */
  id: string
  /** リリース日 (unixtime) */
  releaseDate: number
  /** アイコンURL又はBase64 */
  icon: string
  /** 紹介文（マークダウン対応） */
  description: string
  /** 価格 */
  price: number
}

export const useAppStore = defineStore('app', {
  state: () => ({
    /**
     * アプリと楽曲が混在するリスト
     * アプリ情報と楽曲情報は半分くらい一緒の仕様のため、
     * 入力値次第でどちらとしても使えるオブジェクト形式
     */
    list: [] as AppOrMusicItem[],
  }),
  actions: {
    /**
     * リストにアイテムを追加
     * @param item - 追加するアプリまたは楽曲情報
     */
    addItem(item: AppOrMusicItem) {
      this.list.push(item)
    },
    /**
     * IDでアイテムを検索
     * @param id - 検索するアイテムのID
     * @returns 見つかったアイテム、見つからない場合はundefined
     */
    findById(id: string): AppOrMusicItem | undefined {
      return this.list.find(item => item.id === id)
    },
    /**
     * IDでアイテムを削除
     * @param id - 削除するアイテムのID
     */
    removeById(id: string) {
      const index = this.list.findIndex(item => item.id === id)
      if (index !== -1) {
        this.list.splice(index, 1)
      }
    },
    /**
     * リストをクリア
     */
    clearList() {
      this.list = []
    },
    /**
     * リスト全体を更新
     * @param newList - 新しいリスト
     */
    setList(newList: AppOrMusicItem[]) {
      this.list = newList
    },
  },
  persist: true,
})
