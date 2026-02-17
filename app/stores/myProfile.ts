import { defineStore } from 'pinia'

/**
 * 学歴情報
 */
export interface EducationHistory {
  /** 日時 (unixtime) */
  date: number
  /** 内容 */
  content: string
}

/**
 * 経歴情報（学歴以外）
 */
export interface CareerHistory {
  /** 日時 (unixtime) */
  date: number
  /** 内容 */
  content: string
}

/**
 * SNS等のリンク情報
 */
export interface SocialLink {
  /** ボタンに表示するテキスト */
  text: string
  /** ボタン表示用MDIアイコン */
  icon: string
  /** 推移先URL */
  url: string
}

export const useMyProfileStore = defineStore('myProfile', {
  state: () => ({
    /** カバー画像URL又はBase64 */
    coverImg: null as string | null,
    /** アカウント作成日時 (unixtime) */
    createdAt: null as number | null,
    /** アイコンURL又はBase64 */
    icon: null as string | null,
    /** ステータスメッセージ */
    message: null as string | null,
    /** 表示名 */
    name: 'ゲスト' as string | null,
    /** ステータス */
    status: null as string | null,
    /** ユーザーID（nullを許可していないため、空文字列などで初期化する） */
    userId: 'guest',
    /** ユーザートークン */
    userToken: undefined as string | null | undefined,
    /** ゲストユーザーかどうか */
    guest: true,
    /** アプリ登録権限（デフォルトはfalseで、DBから自分だけ手動でtrueにする） */
    canRegisterApp: false,
    /** プロフィール情報（マークダウン対応） */
    profileInfo: null as string | null,
    /** 学歴 */
    educationHistory: [] as EducationHistory[],
    /** 経歴（学歴以外） */
    careerHistory: [] as CareerHistory[],
    /** 各種SNS等リンク */
    socialLinks: [] as SocialLink[],
  }),
  actions: {
    /**
     * プロフィール情報をリセット
     */
    reset() {
      this.coverImg = null
      this.createdAt = null
      this.icon = null
      this.message = null
      this.name = 'ゲスト'
      this.status = null
      this.userId = 'guest'
      this.userToken = null
      this.guest = true
      this.canRegisterApp = false
      this.profileInfo = null
      this.educationHistory = []
      this.careerHistory = []
      this.socialLinks = []
    },
  },
  persist: true,
})
