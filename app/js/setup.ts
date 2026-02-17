//主にサーバーサイドでSEO対策する用

export default {
  /**
   * いい感じのタイトルを付ける
   * @param {string} newTitle 新しく付けたいタイトル
   * @returns 引数に合わせて設定したら0、デフォルトのまま設定したら1
   */
  setTitle: (newTitle: string) => {
    const siteName = 'エノキ電気公式ホームページ'
    let pageTitle
    let returnCode
    if (newTitle) {
      pageTitle = `${newTitle} | ${siteName}`
      returnCode = 0
    } else {
      pageTitle = siteName
      returnCode = 1
    }
    useServerHead({
      title: pageTitle,
    })
    useServerSeoMeta({
      ogTitle: pageTitle,
    })
    return returnCode
  },
  /** 新しいWebサイトの説明文をつける */
  setDescription: (newDescription: string) => {
    if (!newDescription) {
      useServerSeoMeta({
        description: '',
        ogDescription: '',
      })
      return null
    } else {
      useServerSeoMeta({
        description: newDescription,
        ogDescription: newDescription,
      })
      return newDescription
    }
  },
  /** 新しいWebサイトのOGP画像をつける */
  setImage: (fullURL: string) => {
    let isURL
    try {
      const url = new URL(fullURL)
    } catch (e) {
      isURL = false
    }
    if (!fullURL || !isURL) {
      useServerSeoMeta({
        ogImage: '',
      })
      return null
    } else {
      useServerSeoMeta({
        ogImage: fullURL,
      })
      return fullURL
    }
  },
}
