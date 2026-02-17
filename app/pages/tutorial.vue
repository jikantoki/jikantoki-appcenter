<template lang="pug">
  h1 準備中！
</template>

<script lang="ts">
import mixins from '@/mixins/mixins'
import Setup from '@/js/setup'
export default {
  mixins: [mixins],
  setup() {
    //サーバーサイドで仮のタイトルを設定、mountedで言語ごとに再設定する
    Setup.setTitle('チュートリアル')
    Setup.setDescription('チュートリアルを見て、サービスの使い方を学びましょう')
  },
  mounted() {
    this.setTitle('チュートリアル')
  },
}
</script>
