<template lang="pug">
  h1 このページは準備中です
  v-btn(
    @click="$router.back()"
  ) 戻る
  v-btn(
    @click="$router.push('/')"
  ) トップページ
</template>

<script lang="ts">
import mixins from '@/mixins/mixins'
import Setup from '@/js/setup'

export default {
  mixins: [mixins],
  setup() {
    //サーバーサイドで仮のタイトルを設定、mountedで言語ごとに再設定する
    Setup.setTitle('準備中')
    Setup.setDescription('このページは現在準備中です。しばらくお待ちください。')
  },
  mounted() {
    this.setTitle('準備中')
  },
}
</script>
